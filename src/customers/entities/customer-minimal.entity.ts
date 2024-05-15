import { ApiProperty } from "@nestjs/swagger"

export class CustomerMinimalEntity {
  @ApiProperty({ description: "The customer's ID" })
  id: string

  @ApiProperty({ description: "The customer's name" })
  name: string
}
