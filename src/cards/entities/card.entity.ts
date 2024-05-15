import { ApiProperty } from "@nestjs/swagger"

export class CardEntity {
  @ApiProperty({ description: "The total number of customers" })
  numberOfCustomers: number

  @ApiProperty({ description: "The total number of invoices" })
  numberOfInvoices: number

  @ApiProperty({ description: "The total amount of paid invoices" })
  totalPaidInvoices: string

  @ApiProperty({ description: "The total amount of pending invoices" })
  totalPendingInvoices: string
}
