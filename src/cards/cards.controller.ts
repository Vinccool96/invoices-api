import { Controller, Get } from "@nestjs/common"
import { ApiBasicAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger"

import { CardsService } from "./cards.service"

import { CardEntity } from "./entities/card.entity"

@Controller("cards")
@ApiTags("cards")
@ApiBasicAuth()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get("data")
  @ApiOkResponse({ description: "Gives the card data", type: CardEntity })
  async getCards(): Promise<CardEntity> {
    return await this.cardsService.fetchCardData()
  }
}
