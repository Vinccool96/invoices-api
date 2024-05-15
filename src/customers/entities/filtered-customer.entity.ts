import { ApiProperty } from "@nestjs/swagger"

export class FilteredCustomerEntity {
  @ApiProperty({ description: "The customer's ID" })
  id: string

  @ApiProperty({ description: "The customer's name" })
  name: string

  @ApiProperty({ description: "The customer's email" })
  email: string

  @ApiProperty({ description: "The URL to the customer's image" })
  imageUrl: string

  @ApiProperty({ description: "The number of invoices the customer has" })
  totalInvoices: number

  @ApiProperty({ description: "The total amount of the customer's paid invoices" })
  totalPaid: string

  @ApiProperty({ description: "The total amount of the customer's pending invoices" })
  totalPending: string
}
