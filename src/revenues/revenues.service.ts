import { Injectable } from "@nestjs/common"

import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class RevenuesService {
  constructor(private readonly prisma: PrismaService) {}
}
