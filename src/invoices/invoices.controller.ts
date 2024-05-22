import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common"
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger"

import { InvoicesService } from "./invoices.service"

import { InvoiceEntity } from "./entities/invoice.entity"

import { formatCurrency } from "../utils"
import { InvoiceMinimalEntity } from "./entities/invoice-minimal.entity"
import { CreateInvoiceDto } from "./dto/create-invoice.dto"
import { UpdateInvoiceDto } from "./dto/update-invoice.dto"

@Controller("invoices")
@ApiTags("invoices")
@ApiBasicAuth()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get("latest")
  @ApiOkResponse({ description: "Returns the five (5) latest invoices", type: [InvoiceEntity] })
  async getLatestInvoices(): Promise<Array<InvoiceEntity>> {
    return await this.invoicesService.fetchLatestInvoices()
  }

  @Get("filtered")
  @ApiOkResponse({ description: "Returns the five (5) latest filtered invoices", type: [InvoiceEntity] })
  @ApiQuery({ name: "filter", description: "The filter applied to the query" })
  @ApiQuery({ name: "page", description: "The current page of the query", type: Number })
  async getFilteredInvoices(
    @Query("filter") filter: string,
    @Query("page") page: number,
  ): Promise<Array<InvoiceEntity>> {
    const invoices = await this.invoicesService.fetchFilteredInvoices(filter, page)

    return invoices.map(function (invoice) {
      return {
        id: invoice.id,
        customer: {
          id: invoice.customerId,
          name: invoice.name,
          email: invoice.email,
          imageUrl: invoice.imageUrl,
        },
        customerId: invoice.customerId,
        amount: formatCurrency(invoice.amount),
        status: invoice.status,
        date: new Date(invoice.date),
      }
    })
  }

  @Get("page")
  @ApiOkResponse({ description: "Return how many pages the call to `/invoices/filtered` yields", type: Number })
  @ApiQuery({ name: "filter", description: "The filter applied to the query" })
  async getFilteredInvoicesPages(@Query("filter") filter: string): Promise<number> {
    return await this.invoicesService.fetchInvoicesPages(filter)
  }

  @Get(":id")
  @ApiOkResponse({ description: "Returns a specific invoice", type: InvoiceMinimalEntity })
  @ApiNotFoundResponse({ description: "Couldn't find the invoice" })
  @ApiParam({ name: "id", description: "The ID of the invoice", type: String })
  async getInvoice(@Param("id") id: string): Promise<InvoiceMinimalEntity> {
    const invoice = await this.invoicesService.fetchInvoiceById(id)

    if (invoice === null) {
      throw new NotFoundException("Invoice not found")
    }

    return invoice
  }

  @Post()
  @ApiCreatedResponse({ description: "Creates an invoice", type: InvoiceEntity })
  async createInvoice(@Body() invoice: CreateInvoiceDto): Promise<InvoiceEntity> {
    return await this.invoicesService.createInvoice(invoice)
  }

  @Put(":id")
  @ApiParam({ name: "id", description: "The ID of the invoice", type: String })
  @ApiOkResponse({ description: "Updates an invoice", type: InvoiceEntity })
  async updateInvoice(@Param("id") id: string, @Body() invoice: UpdateInvoiceDto): Promise<InvoiceEntity> {
    return await this.invoicesService.updateInvoice(id, invoice)
  }

  @Delete(":id")
  @ApiParam({ name: "id", description: "The ID of the invoice", type: String })
  @ApiOkResponse({ description: "Deletes an invoice", type: InvoiceEntity })
  async deleteInvoice(@Param("id") id: string): Promise<InvoiceEntity> {
    return await this.invoicesService.deleteInvoice(id)
  }
}
