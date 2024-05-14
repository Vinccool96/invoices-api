import { Module } from "@nestjs/common"
import { RevenuesController } from "./revenues.controller"
import { RevenuesService } from "./revenues.service"

@Module({
  controllers: [RevenuesController],
  providers: [RevenuesService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RevenuesModule {}
