import { Prisma, PrizeDraw } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PrizeDrawRepository } from '../interfaces/prizeDrawRepository'

export class InMemoryPrizeDrawRepository implements PrizeDrawRepository {
  private prizeDraws: PrizeDraw[] = []

  async createPrizeDraw(data: Prisma.PrizeDrawCreateInput) {
    const prizeDraw = {
      id: randomUUID(),
      prize: data.prize,
      drawn_number: null,
      status: data.status,
      created_at: new Date(),
      finished_at: new Date(data.finished_at),
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

    return 'Prize draw deleted successfully!'
  }

  async updatePrizeDraw(
    id: string,
    data: Prisma.PrizeDrawUncheckedUpdateInput,
  ) {
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

  async fetchPrizeDraws(page: number) {
    const length = Math.ceil(this.prizeDraws.length / 20)
    const prizeDraws = this.prizeDraws.slice((page - 1) * 20, page * 20)

    return { prizeDraws, length }
  }
}
