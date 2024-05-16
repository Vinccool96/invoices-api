import { Injectable } from "@nestjs/common"

import { Prisma } from "@prisma/client"

import { PrismaService } from "../prisma/prisma.service"

import { formatCurrency, ITEMS_PER_PAGE } from "../utils"

type FilteredInvoiceQueryRawRow = {
  id: string
  amount: number
  date: string
  status: string
  customerId: string
  name: string
  email: string
  imageUrl: string
}

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchLatestInvoices() {
    try {
      const data = await this.prisma.invoice.findMany({
        orderBy: { date: "desc" },
        include: { customer: true },
        take: ITEMS_PER_PAGE,
      })

      return data.map((invoice) => ({
        ...invoice,
        amount: formatCurrency(invoice.amount),
      }))
    } catch (error) {
      console.error("Database Error:", error)
      throw new Error("Failed to fetch the latest invoices.")
    }
  }

  async fetchFilteredInvoices(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
      const data: Array<FilteredInvoiceQueryRawRow> = await this.prisma.$queryRaw`
        SELECT
          "Invoice".id,
          "Invoice".amount,
          "Invoice".date,
          "Invoice".status,
          "Invoice"."customerId",
          "Customer".name,
          "Customer".email,
          "Customer"."imageUrl"
        FROM "Invoice"
        JOIN "Customer" ON "Invoice"."customerId" = "Customer".id
        WHERE
          "Customer".name ILIKE ${`%${query}%`} OR
          "Customer".email ILIKE ${`%${query}%`} OR
          "Invoice".amount::text ILIKE ${`%${query}%`} OR
          "Invoice".date::text ILIKE ${`%${query}%`} OR
          "Invoice".status ILIKE ${`%${query}%`}
        ORDER BY "Invoice".date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `

      return data
    } catch (error) {
      console.error("Database Error:", error)
      throw new Error("Failed to fetch invoices.")
    }
  }

  async fetchInvoicesPages(query: string) {
    try {
      const count: Array<{ count: number }> = await this.prisma.$queryRaw`
        SELECT COUNT(*)
        FROM "Invoice"
        JOIN "Customer" ON "Invoice"."customerId" = "Customer".id
        WHERE
          "Customer".name ILIKE ${`%${query}%`} OR
          "Customer".email ILIKE ${`%${query}%`} OR
          "Invoice".amount::text ILIKE ${`%${query}%`} OR
          "Invoice".date::text ILIKE ${`%${query}%`} OR
          "Invoice".status ILIKE ${`%${query}%`}
      `

      return Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE)
    } catch (error) {
      console.error("Database Error:", error)
      throw new Error("Failed to fetch total number of invoices.")
    }
  }

  async fetchInvoiceById(id: string) {
    try {
      const invoice = await this.prisma.invoice.findUnique({
        where: { id: id },
        select: { id: true, customerId: true, amount: true, status: true },
      })

      if (invoice === null) {
        return null
      }

      return {
        ...invoice,
        // Convert amount from cents to dollars
        amount: formatCurrency(invoice.amount),
      }
    } catch (error) {
      console.error("Database Error:", error)
      throw new Error("Failed to fetch invoice.")
    }
  }

  async createInvoice(formData: { customerId: string; amount: number; status: string }) {
    const { customerId, amount, status } = formData

    const amountInCents = amount * 100
    const date = new Date()

    const invoice: Prisma.InvoiceCreateInput = {
      customer: { connect: { id: customerId } },
      amount: amountInCents,
      status: status,
      date: date,
    }

    try {
      const created = await this.prisma.invoice.create({ data: invoice, include: { customer: true } })

      return {
        ...created,
        // Convert amount from cents to dollars
        amount: formatCurrency(created.amount),
      }
    } catch (error) {
      console.error("Database Error:", error)
      throw new Error("Failed to Create Invoice.")
    }
  }

  async updateInvoice(id: string, formData: { customerId?: string; amount?: number; status?: string }) {
    const { customerId, amount, status } = formData
    const amountInCents = amount !== undefined ? amount * 100 : undefined

    try {
      const updated = await this.prisma.invoice.update({
        where: { id: id },
        data: {
          customerId: customerId,
          amount: amountInCents,
          status: status,
        },
        include: { customer: true },
      })

      return {
        ...updated,
        // Convert amount from cents to dollars
        amount: formatCurrency(updated.amount),
      }
    } catch (error) {
      console.error("Database Error:", error)
      throw new Error("Failed to Update Invoice.")
    }
  }

  async deleteInvoice(id: string) {
    try {
      const deleted = await this.prisma.invoice.delete({ where: { id: id }, include: { customer: true } })

      return {
        ...deleted,
        // Convert amount from cents to dollars
        amount: formatCurrency(deleted.amount),
      }
    } catch (error) {
      console.error("Database Error:", error)
      throw new Error("Failed to Delete Invoice.")
    }
  }
}
