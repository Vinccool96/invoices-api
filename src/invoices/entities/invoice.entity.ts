import { ApiProperty } from "@nestjs/swagger"
import { CustomerEntity } from "../../customers/entities/customer.entity"

export class InvoiceEntity {
  @ApiProperty({ description: "The invoice's ID" })
  id: string

  @ApiProperty({ description: "The invoice's customer", type: CustomerEntity })
  customer: CustomerEntity

  @ApiProperty({ description: "The invoice's amount" })
  amount: string

  @ApiProperty({ description: "The invoice's status" })
  status: string

  @ApiProperty({ description: "The date at which the invoice was created", type: Date })
  date: Date
}
