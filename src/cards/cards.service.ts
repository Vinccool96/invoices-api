import { Injectable } from "@nestjs/common"

import { PrismaService } from "../prisma/prisma.service"

import { formatCurrency } from "../utils"

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchCardData() {
    try {
      // You can probably combine these into a single SQL query
      // However, we are intentionally splitting them to demonstrate
      // how to initialize multiple queries in parallel with JS.
      const invoiceCountPromise = this.prisma.invoice.count()
      const customerCountPromise = this.prisma.customer.count()
      const invoiceStatusPromise = this.prisma.$queryRaw<Array<{ paid: number; pending: number }>>`
        SELECT
          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
        FROM "Invoice"
      `

      const data = await Promise.all([invoiceCountPromise, customerCountPromise, invoiceStatusPromise])

      const numberOfInvoices = data[0]
      const numberOfCustomers = data[1]
      const totalPaidInvoices = formatCurrency(Number(data[2][0].paid))
      const totalPendingInvoices = formatCurrency(Number(data[2][0].pending))

      return {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices,
      }
    } catch (error) {
      console.error("Database Error:", error)
      throw new Error("Failed to fetch card data.")
    }
  }
}
