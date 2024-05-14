import { Injectable } from "@nestjs/common"

import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class RevenuesService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchRevenue() {
    try {
      // Artificially delay a response for demo purposes.
      // Don't do this in production :)

      console.log("Fetching revenue data...")
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const data = await this.prisma.revenue.findMany()

      console.log("Data fetch completed after 3 seconds.")

      return data
    } catch (error) {
      console.error("Database Error:", error)
      throw new Error("Failed to fetch revenue data.")
    }
  }
}
