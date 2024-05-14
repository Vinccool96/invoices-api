import { hash } from "bcrypt"
import { PrismaClient } from "@prisma/client"
import moment from "moment"

import { customers, invoices, revenue, users } from "./placeholder-data"

const prisma = new PrismaClient()

function stringToDate(value: string): Date {
  const m = moment(value, "YYYY-MM-DD")
  return m.toDate()
}

async function seedUsers() {
  console.log("Seeding users")
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      create: { ...user, password: await hash(user.password, 10) },
      update: {},
    })
  }
}

async function seedCustomers() {
  console.log("Seeding customers")
  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { id: customer.id },
      create: customer,
      update: {},
    })
  }
}

async function seedInvoices() {
  console.log("Seeding invoices")
  for (const invoice of invoices) {
    await prisma.invoice.upsert({
      where: { id: invoice.id },
      create: { ...invoice, date: stringToDate(invoice.date) },
      update: {},
    })
  }
}

async function seedRevenue() {
  console.log("Seeding revenue")
  for (const rev of revenue) {
    await prisma.revenue.upsert({
      where: { month: rev.month },
      create: rev,
      update: {},
    })
  }
}

async function main() {
  console.log("Seeding started")
  await seedUsers()
  await seedCustomers()
  await seedInvoices()
  await seedRevenue()
  console.log("Seeding ended")
}

main().catch((err) => {
  console.error("An error occurred while attempting to seed the database:", err)
})
