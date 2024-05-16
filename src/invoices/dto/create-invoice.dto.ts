import { ApiProperty } from "@nestjs/swagger"

import { IsIn, IsInt, IsPositive, IsString, IsUUID } from "class-validator"

export class CreateInvoiceDto {
  @ApiProperty({ description: "The invoice's customer" })
  @IsUUID()
  customerId: string

  @ApiProperty({ description: "The invoice's amount as an integer in cents" })
  @IsInt()
  @IsPositive()
  amount: number

  @ApiProperty({ description: "The invoice's status" })
  @IsString()
  @IsIn(["paid", "pending"])
  status: string
}
