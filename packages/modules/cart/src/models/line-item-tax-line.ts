import { model } from "@medusajs/framework/utils"
import LineItem from "./line-item"

const LineItemTaxLine = model
  .define(
    {
      name: "LineItemTaxLine",
      tableName: "cart_line_item_tax_line",
    },
    {
      id: model.id({ prefix: "calitxl" }).primaryKey(),
      description: model.text().nullable(),
      code: model.text(),
      rate: model.number(),
      provider_id: model.text().nullable(),
      tax_rate_id: model.text().nullable(),
      item: model.belongsTo(() => LineItem, {
        mappedBy: "tax_lines",
      }),
    }
  )
  .indexes([
    {
      name: "IDX_line_item_tax_line_tax_rate_id",
      on: ["tax_rate_id"],
      where: "deleted_at IS NULL AND tax_rate_id IS NOT NULL",
    },
    {
      name: "IDX_tax_line_item_id",
      on: ["item_id"],
      where: "deleted_at IS NULL",
    },
  ])

// @Entity({ tableName: "cart_line_item_tax_line" })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class LineItemTaxLine extends TaxLine {
//   @ManyToOne({ entity: () => LineItem, persist: false })
//   item: Rel<LineItem>

//   @LineItemIdIndex()
//   @ManyToOne({
//     entity: () => LineItem,
//     columnType: "text",
//     fieldName: "item_id",
//     mapToPk: true,
//   })
//   item_id: string

// @TaxRateIdIndex()
// @Property({ columnType: "text", nullable: true })
// tax_rate_id: string | null = null

// @DeletedAtIndex()
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null

// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, "calitxl")
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "calitxl")
// }
// }
export default LineItemTaxLine
