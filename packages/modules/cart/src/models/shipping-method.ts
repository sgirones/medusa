import { model } from "@medusajs/framework/utils"
import Cart from "./cart"
import ShippingMethodAdjustment from "./shipping-method-adjustment"
import ShippingMethodTaxLine from "./shipping-method-tax-line"

const ShippingMethod = model
  .define(
    {
      name: "ShippingMethod",
      tableName: "cart_shipping_method",
    },
    {
      id: model.id({ prefix: "casm" }).primaryKey(),
      name: model.text(),
      description: model.json().nullable(),
      amount: model.bigNumber(),
      is_tax_inclusive: model.boolean().default(false),
      shipping_option_id: model.text().nullable(),
      data: model.json().nullable(),
      metadata: model.json().nullable(),
      cart: model.belongsTo(() => Cart, {
        mappedBy: "shipping_methods",
      }),
      tax_lines: model.hasMany(() => ShippingMethodTaxLine, {
        mappedBy: "shipping_method",
      }),
      adjustments: model.hasMany(() => ShippingMethodAdjustment, {
        mappedBy: "shipping_method",
      }),
    }
  )
  .indexes([
    {
      name: "IDX_shipping_method_cart_id",
      on: ["cart_id"],
      where: "deleted_at IS NULL",
    },
    {
      name: "IDX_shipping_method_option_id",
      on: ["shipping_option_id"],
      where: "deleted_at IS NULL AND shipping_option_id IS NOT NULL",
    },
  ])

// @Entity({ tableName: "cart_shipping_method" })
// @Check<ShippingMethod>({ expression: (columns) => `${columns.amount} >= 0` })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class ShippingMethod {
//   [OptionalProps]?: OptionalShippingMethodProps

// @PrimaryKey({ columnType: "text" })
// id: string

// @CartIdIndex()
// @ManyToOne({
//   entity: () => Cart,
//   columnType: "text",
//   fieldName: "cart_id",
//   mapToPk: true,
// })
// cart_id: string

// @ManyToOne({ entity: () => Cart, persist: false })
// cart: Rel<Cart>

// @Property({ columnType: "text" })
// name: string

// @Property({ columnType: "jsonb", nullable: true })
// description: string | null = null

// @MikroOrmBigNumberProperty()
// amount: BigNumber | number

// @Property({ columnType: "jsonb" })
// raw_amount: BigNumberRawValue

// @Property({ columnType: "boolean" })
// is_tax_inclusive: boolean = false

// @ShippingOptionIdIndex()
// @Property({ columnType: "text", nullable: true })
// shipping_option_id: string | null = null

// @Property({ columnType: "jsonb", nullable: true })
// data: Record<string, unknown> | null = null

// @Property({ columnType: "jsonb", nullable: true })
// metadata: Record<string, unknown> | null = null

// @OneToMany(
//   () => ShippingMethodTaxLine,
//   (taxLine) => taxLine.shipping_method,
//   {
//     cascade: [Cascade.PERSIST, "soft-remove"] as any,
//   }
// )
// tax_lines = new Collection<Rel<ShippingMethodTaxLine>>(this)

// @OneToMany(
//   () => ShippingMethodAdjustment,
//   (adjustment) => adjustment.shipping_method,
//   {
//     cascade: [Cascade.PERSIST, "soft-remove"] as any,
//   }
// )
// adjustments = new Collection<Rel<ShippingMethodAdjustment>>(this)

// @Property({
//   onCreate: () => new Date(),
//   columnType: "timestamptz",
//   defaultRaw: "now()",
// })
// created_at: Date

// @Property({
//   onCreate: () => new Date(),
//   onUpdate: () => new Date(),
//   columnType: "timestamptz",
//   defaultRaw: "now()",
// })
// updated_at: Date

// @DeletedAtIndex()
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null

// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, "casm")
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "casm")
// }
// }
export default ShippingMethod
