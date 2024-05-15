import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"

import { AuthService } from "./auth.service"
import { HttpStrategy } from "./http.strategy"

import { UsersModule } from "../users/users.module"

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, HttpStrategy],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthModule {}
