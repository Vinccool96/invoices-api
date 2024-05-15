import { ApiProperty } from "@nestjs/swagger"

export class RevenueEntity {
  @ApiProperty({ description: "The month of this revenue" })
  month: string

  @ApiProperty({ description: "The revenue for the month" })
  revenue: number
}
