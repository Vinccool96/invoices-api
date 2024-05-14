import { APP_GUARD } from "@nestjs/core"
import { Module } from "@nestjs/common"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"

import { PrismaModule } from "./prisma/prisma.module"
import { RevenuesModule } from "./revenues/revenues.module"
import { CardsModule } from "./cards/cards.module"
import { InvoicesModule } from "./invoices/invoices.module"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
import { HttpAuthGuard } from "./auth/http-auth.guard"
import { CustomersModule } from "./customers/customers.module"

@Module({
  imports: [PrismaModule, RevenuesModule, CardsModule, InvoicesModule, UsersModule, AuthModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: HttpAuthGuard }],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
