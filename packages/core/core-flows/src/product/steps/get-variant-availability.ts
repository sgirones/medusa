import { LINKS } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

export type GetVariantAvailabilityStepInput = {
  variant_ids: string[]
  sales_channel_id: string
}

interface VariantItems {
  variant_id: string
  required_quantity: number
  variant: {
    manage_inventory: boolean
    allow_backorder: boolean
  }
  inventory: {
    location_levels: {
      location_id: string
      available_quantity: number
    }[]
  }
}

const computeVariantAvailability = (
  variantInventoryItems: VariantItems[],
  channelLocationsSet: Set<string>
) => {
  const inventoryQuantities: number[] = []

  for (const link of variantInventoryItems) {
    const requiredQuantity = link.required_quantity
    const availableQuantity = (link.inventory?.location_levels || []).reduce(
      (sum, level) => {
        if (!channelLocationsSet.has(level.location_id)) {
          return sum
        }

        return sum + (level?.available_quantity || 0)
      },
      0
    )

    // This will give us the maximum deliverable quantities for each inventory item
    const maxInventoryQuantity = Math.floor(
      availableQuantity / requiredQuantity
    )

    inventoryQuantities.push(maxInventoryQuantity)
  }

  return inventoryQuantities.length ? Math.min(...inventoryQuantities) : 0
}

export const getVariantAvailabilityId = "get-variant-availability"

/**
 * Computes the varaint availability for a list of variants in a given sales channel
 */
export const getVariantAvailabilityStep = createStep(
  getVariantAvailabilityId,
  async (data: GetVariantAvailabilityStepInput, { container }) => {
    const query = container.resolve("query")
    const { data: variantInventoryItems } = await query.graph({
      entity: LINKS.ProductVariantInventoryItem,
      fields: [
        "variant_id",
        "required_quantity",
        "variant.manage_inventory",
        "variant.allow_backorder",
        "inventory.*",
        "inventory.location_levels.*",
      ],
      filters: { variant_id: data.variant_ids },
    })

    const variantInventoriesMap = new Map()
    variantInventoryItems.forEach((link) => {
      const array = variantInventoriesMap.get(link.variant_id) || []
      array.push(link)
      variantInventoriesMap.set(link.variant_id, array)
    })

    const { data: channelLocations } = await query.graph({
      entity: "sales_channel_locations",
      fields: ["stock_location_id"],
      filters: { sales_channel_id: data.sales_channel_id },
    })

    // Create set of location ids for the sales channel
    const locationIds = new Set(
      channelLocations.map((l) => l.stock_location_id)
    )

    const availability = data.variant_ids.map((variantId) => {
      const variantInventoryItems = variantInventoriesMap.get(variantId) || []

      return {
        variant_id: variantId,
        availability: computeVariantAvailability(
          variantInventoryItems,
          locationIds
        ),
      }
    })

    return new StepResponse(availability)
  }
)
