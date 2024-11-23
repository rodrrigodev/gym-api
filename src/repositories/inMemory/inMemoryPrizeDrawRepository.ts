import { Prisma, PrizeDraw } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PrizeDrawRepository } from '../prizeDrawRepository'

export class InMemoryPrizeDrawRepository implements PrizeDrawRepository {
  private prizeDraws: PrizeDraw[] = []

  async createPrizeDraw(data: Prisma.PrizeDrawCreateInput) {
    const prizeDraw = {
      id: randomUUID(),
      prize: data.prize,
      drawn_number: data.drawn_number,
      status: data.status,
      created_at: new Date(),
      finished_at: null,
      winner_id: null,
    }

    this.prizeDraws.push(prizeDraw)

    return prizeDraw
  }

  async findPrizeDraw(id: string) {
    const prizeDrawExists = this.prizeDraws.find((prizeDraw) => {
      return prizeDraw.id === id
    })

    return prizeDrawExists || null
  }

  async deletePrizeDraw(id: string) {
    const filteredPrizeDraws = this.prizeDraws.filter((prizeDraw) => {
      return prizeDraw.id !== id
    })

    this.prizeDraws = filteredPrizeDraws

    return 'Success!'
  }

  async updatePrizeDraw(id: string, data: Prisma.PrizeDrawUpdateInput) {
    const prizeDrawsUpdated = this.prizeDraws.map((prize) => {
      if (prize.id === id) {
        return { ...prize, ...data }
      } else {
        return prize
      }
    })

    this.prizeDraws = prizeDrawsUpdated as PrizeDraw[]

    const prizeDrawUpdated = this.prizeDraws.find((prizeDraw) => {
      return prizeDraw.id === id
    })

    return prizeDrawUpdated || null
  }

  async fetchPrizeDraw() {
    return this.prizeDraws || null
  }
}
