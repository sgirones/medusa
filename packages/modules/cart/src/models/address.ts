import { model } from "@medusajs/framework/utils"
import Cart from "./cart"

const Address = model.define(
  { tableName: "cart_address", name: "Address" },
  {
    id: model.id({ prefix: "caaddr" }).primaryKey(),
    customer_id: model.text().nullable(),
    company: model.text().nullable(),
    first_name: model.text().nullable(),
    last_name: model.text().nullable(),
    address_1: model.text().nullable(),
    address_2: model.text().nullable(),
    city: model.text().nullable(),
    country_code: model.text().nullable(),
    province: model.text().nullable(),
    postal_code: model.text().nullable(),
    phone: model.text().nullable(),
    metadata: model.json().nullable(),
    carts: model.hasMany(() => Cart, {
      mappedBy: "shipping_address",
    }),
  }
)

// @Entity({ tableName: "cart_address" })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class Address {
// [OptionalProps]: OptionalAddressProps

// @PrimaryKey({ columnType: "text" })
// id!: string

// @Property({ columnType: "text", nullable: true })
// customer_id: string | null = null

// @Property({ columnType: "text", nullable: true })
// company: string | null = null

// @Property({ columnType: "text", nullable: true })
// first_name: string | null = null

// @Property({ columnType: "text", nullable: true })
// last_name: string | null = null

// @Property({ columnType: "text", nullable: true })
// address_1: string | null = null

// @Property({ columnType: "text", nullable: true })
// address_2: string | null = null

// @Property({ columnType: "text", nullable: true })
// city: string | null = null

// @Property({ columnType: "text", nullable: true })
// country_code: string | null = null

// @Property({ columnType: "text", nullable: true })
// province: string | null = null

// @Property({ columnType: "text", nullable: true })
// postal_code: string | null = null

// @Property({ columnType: "text", nullable: true })
// phone: string | null = null

// @Property({ columnType: "jsonb", nullable: true })
// metadata: Record<string, unknown> | null = null

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

// @PgIndex.MikroORMIndex()
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null

// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, "caaddr")
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "caaddr")
// }
// }

export default Address
