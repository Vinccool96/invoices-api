import { ApiProperty } from "@nestjs/swagger"

export class InvoiceMinimalEntity {
  @ApiProperty({ description: "The invoice's ID" })
  id: string

  @ApiProperty({ description: "The invoice's customer" })
  customerId: string

  @ApiProperty({ description: "The invoice's amount" })
  amount: string

  @ApiProperty({ description: "The invoice's status" })
  status: string
}
