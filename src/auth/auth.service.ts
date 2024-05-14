import { Injectable } from "@nestjs/common"
import bcrypt from "bcrypt"

import { UsersService } from "../users/users.service"

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email)

    if (user !== null) {
      const passwordMatches = await bcrypt.compare(password, user.password)

      if (passwordMatches) {
        return user
      }
    }

    return null
  }
}
