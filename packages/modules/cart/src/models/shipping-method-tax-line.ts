import { model } from "@medusajs/framework/utils"
import ShippingMethod from "./shipping-method"

const ShippingMethodTaxLine = model
  .define(
    {
      name: "ShippingMethodTaxLine",
      tableName: "cart_shipping_method_tax_line",
    },
    {
      id: model.id({ prefix: "casmtxl" }).primaryKey(),
      description: model.text().nullable(),
      code: model.text(),
      rate: model.number(),
      provider_id: model.text().nullable(),
      tax_rate_id: model.text().nullable(),
      metadata: model.json().nullable(),
      shipping_method: model.belongsTo(() => ShippingMethod, {
        mappedBy: "tax_lines",
      }),
    }
  )
  .indexes([
    {
      name: "IDX_tax_line_shipping_method_id",
      on: ["shipping_method_id"],
      where: "deleted_at IS NULL",
    },
    {
      name: "IDX_shipping_method_tax_line_tax_rate_id",
      on: ["tax_rate_id"],
      where: "deleted_at IS NULL AND tax_rate_id IS NOT NULL",
    },
  ])

// @Entity({ tableName: "cart_shipping_method_tax_line" })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class ShippingMethodTaxLine extends TaxLine {
//   @ManyToOne({ entity: () => ShippingMethod, persist: false })
//   shipping_method: Rel<ShippingMethod>

//   @ShippingMethodIdIndex()
//   @ManyToOne({
//     entity: () => ShippingMethod,
//     columnType: "text",
//     fieldName: "shipping_method_id",
//     mapToPk: true,
//   })
//   shipping_method_id: string

// @TaxRateIdIndex()
// @Property({ columnType: "text", nullable: true })
// tax_rate_id: string | null = null

// @DeletedAtIndex()
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null

// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, "casmtxl")
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "casmtxl")
// }
// }
export default ShippingMethodTaxLine
