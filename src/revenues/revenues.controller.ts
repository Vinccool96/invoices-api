import { Controller, Get } from "@nestjs/common"
import { ApiBasicAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger"

import { RevenuesService } from "./revenues.service"

import { RevenueEntity } from "./entities/revenue.entity"

@Controller("revenues")
@ApiTags("revenues")
@ApiBasicAuth()
export class RevenuesController {
  constructor(private readonly revenuesService: RevenuesService) {}

  @Get()
  @ApiOkResponse({ description: "Returns the info of the revenue of the previous months", type: [RevenueEntity] })
  async getRevenues(): Promise<Array<RevenueEntity>> {
    return await this.revenuesService.fetchRevenue()
  }
}
