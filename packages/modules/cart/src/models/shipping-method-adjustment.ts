import { model } from "@medusajs/framework/utils"
import ShippingMethod from "./shipping-method"

const ShippingMethodAdjustment = model
  .define(
    {
      name: "ShippingMethodAdjustment",
      tableName: "cart_shipping_method_adjustment",
    },
    {
      id: model.id({ prefix: "casmadj" }).primaryKey(),
      description: model.text().nullable(),
      code: model.text().nullable(),
      amount: model.bigNumber(),
      provider_id: model.text().nullable(),
      metadata: model.json().nullable(),
      promotion_id: model.text().nullable(),
      shipping_method: model.belongsTo(() => ShippingMethod, {
        mappedBy: "adjustments",
      }),
    }
  )
  .indexes([
    {
      name: "IDX_shipping_method_adjustment_promotion_id",
      on: ["promotion_id"],
      where: "deleted_at IS NULL AND promotion_id IS NOT NULL",
    },
    {
      name: "IDX_adjustment_shipping_method_id",
      on: ["shipping_method_id"],
      where: "deleted_at IS NULL",
    },
  ])

// @Entity({ tableName: "cart_shipping_method_adjustment" })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class ShippingMethodAdjustment extends AdjustmentLine {
// @ManyToOne({ entity: () => ShippingMethod, persist: false })
// shipping_method: Rel<ShippingMethod>

// @ShippingMethodIdIndex()
// @ManyToOne({
//   entity: () => ShippingMethod,
//   columnType: "text",
//   fieldName: "shipping_method_id",
//   mapToPk: true,
// })
// shipping_method_id: string

// @PromotionIdIndex()
// @Property({ columnType: "text", nullable: true })
// promotion_id: string | null = null

// @DeletedAtIndex()
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null

// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, "casmadj")
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "casmadj")
// }
// }
export default ShippingMethodAdjustment
