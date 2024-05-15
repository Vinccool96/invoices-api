import { Controller, Get, Query } from "@nestjs/common"
import { ApiBasicAuth, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger"

import { CustomersService } from "./customers.service"

import { CustomerMinimalEntity } from "./entities/customer-minimal.entity"
import { FilteredCustomerEntity } from "./entities/filtered-customer.entity"

@Controller("customers")
@ApiTags("customers")
@ApiBasicAuth()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOkResponse({ description: "Returns all the customers", type: [CustomerMinimalEntity] })
  async getCustomers(): Promise<Array<CustomerMinimalEntity>> {
    return await this.customersService.fetchCustomers()
  }

  @Get("filtered")
  @ApiOkResponse({
    description: "Returns the customers filtered according to the query, filtering on both the name AND the email",
    type: [FilteredCustomerEntity],
  })
  @ApiQuery({ name: "filter", description: "The filter passed to the query", type: String })
  async getCustomersFiltered(@Query("filter") filter: string): Promise<Array<FilteredCustomerEntity>> {
    return await this.customersService.fetchFilteredCustomers(filter)
  }
}
