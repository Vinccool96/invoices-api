import { Module } from "@nestjs/common"
import { CustomersController } from "./customers.controller"
import { CustomersService } from "./customers.service"

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CustomersModule {}
