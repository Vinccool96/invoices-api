import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { RevenuesModule } from "./revenues/revenues.module"
import { CardsModule } from "./cards/cards.module"
import { InvoicesModule } from "./invoices/invoices.module"
import { UsersModule } from "./users/users.module"

@Module({
  imports: [RevenuesModule, CardsModule, InvoicesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
