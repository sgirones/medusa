import { model } from "@medusajs/framework/utils"
import LineItem from "./line-item"

const LineItemAdjustment = model
  .define(
    { name: "LineItemAdjustment", tableName: "cart_line_item_adjustment" },
    {
      id: model.id({ prefix: "caliadj" }).primaryKey(),
      description: model.text().nullable(),
      code: model.text().nullable(),
      amount: model.bigNumber(),
      provider_id: model.text().nullable(),
      promotion_id: model.text().nullable(),
      metadata: model.json().nullable(),
      item: model.belongsTo(() => LineItem, {
        mappedBy: "adjustments",
      }),
    }
  )
  .indexes([
    {
      name: "IDX_line_item_adjustment_promotion_id",
      on: ["promotion_id"],
      where: "deleted_at IS NULL AND promotion_id IS NOT NULL",
    },
    {
      name: "IDX_adjustment_item_id",
      on: ["item_id"],
      where: "deleted_at IS NULL",
    },
  ])

// @Entity({ tableName: "cart_line_item_adjustment" })
// @Check<LineItemAdjustment>({
//   expression: (columns) => `${columns.amount} >= 0`,
// })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class LineItemAdjustment extends AdjustmentLine {
// @ManyToOne({ entity: () => LineItem, persist: false })
// item: Rel<LineItem>
// @LineItemIdIndex()
// @ManyToOne({
//   entity: () => LineItem,
//   columnType: "text",
//   fieldName: "item_id",
//   mapToPk: true,
// })
// item_id: string
// @PromotionIdIndex()
// @Property({ columnType: "text", nullable: true })
// promotion_id: string | null = null
// @DeletedAtIndex()
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null
// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, "caliadj")
// }
// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "caliadj")
// }
// }
export default LineItemAdjustment
