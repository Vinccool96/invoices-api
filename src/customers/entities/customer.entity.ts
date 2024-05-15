import { ApiProperty } from "@nestjs/swagger"

import { CustomerMinimalEntity } from "./customer-minimal.entity"

export class CustomerEntity extends CustomerMinimalEntity {
  @ApiProperty({ description: "the customer's email address" })
  email: string

  @ApiProperty({ description: "The URL to the customer's image" })
  imageUrl: string
}
