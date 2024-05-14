import { Module } from "@nestjs/common"
import { CardsController } from "./cards.controller"
import { CardsService } from "./cards.service"

@Module({
  controllers: [CardsController],
  providers: [CardsService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CardsModule {}
