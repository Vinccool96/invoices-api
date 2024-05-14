import { Injectable } from "@nestjs/common"

import { PrismaService } from "../prisma/prisma.service"
import { formatCurrency } from "../utils"

type FilteredCustomersQueryRawRow = {
  id: string
  name: string
  email: string
  imageUrl: string
  totalInvoices: number
  totalPending: number
  totalPaid: number
}

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchCustomers() {
    try {
      return await this.prisma.customer.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } })
    } catch (err) {
      console.error("Database Error:", err)
      throw new Error("Failed to fetch all customers.")
    }
  }

  async fetchFilteredCustomers(query: string) {
    try {
      const data: Array<FilteredCustomersQueryRawRow> = await this.prisma.$queryRaw`
        SELECT
          "Customer".id,
          "Customer".name,
          "Customer".email,
          "Customer"."imageUrl",
          COUNT("Invoice".id) AS "totalInvoices",
          SUM(CASE WHEN "Invoice".status = 'pending' THEN "Invoice".amount ELSE 0 END) AS "totalPending",
          SUM(CASE WHEN "Invoice".status = 'paid' THEN "Invoice".amount ELSE 0 END) AS "totalPaid"
        FROM "Customer"
        LEFT JOIN "Invoice" ON "Customer".id = "Invoice"."customerId"
        WHERE
          "Customer".name ILIKE ${`%${query}%`} OR
          "Customer".email ILIKE ${`%${query}%`}
        GROUP BY "Customer".id, "Customer".name, "Customer".email, "Customer"."imageUrl"
        ORDER BY "Customer".name
      `

      return data.map((customer) => ({
        ...customer,
        total_pending: formatCurrency(customer.totalPending),
        total_paid: formatCurrency(customer.totalPaid),
      }))
    } catch (err) {
      console.error("Database Error:", err)
      throw new Error("Failed to fetch customer table.")
    }
  }
}
