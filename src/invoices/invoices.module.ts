import { Module } from "@nestjs/common"
import { InvoicesController } from "./invoices.controller"
import { InvoicesService } from "./invoices.service"

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class InvoicesModule {}
