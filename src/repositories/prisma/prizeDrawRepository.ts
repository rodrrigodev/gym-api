import { prisma } from '@/lib/prisma'
import { PrizeDrawRepository } from '../interfaces/prizeDrawRepository'
import { Prisma } from '@prisma/client'

export class PrismaPrizeDrawRepository implements PrizeDrawRepository {
  async createPrizeDraw(data: Prisma.PrizeDrawCreateInput) {
    const prize = await prisma.prizeDraw.create({
      data: {
        prize: data.prize,
        finished_at: data.finished_at,
        status: data.status,
      },
    })

    return prize
  }

  async findPrizeDraw(id: string) {
    const prizeDraw = await prisma.prizeDraw.findFirst({
      where: {
        id,
      },
    })

    return prizeDraw
  }

  async fetchPrizeDraws(page: number) {
    const prizeDraws = await prisma.prizeDraw.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })

    return { prizeDraws, length: Math.ceil(prizeDraws.length) }
  }

  async updatePrizeDraw(
    id: string,
    data: Prisma.PrizeDrawUncheckedUpdateInput,
  ) {
    const prizeDrawUpdated = await prisma.prizeDraw.update({
      where: { id },
      data: {
        status: data.status,
        finished_at: data.finished_at,
        prize: data.prize,
        drawn_number: data.drawn_number,
        winner_id: data.winner_id,
      },
    })

    return prizeDrawUpdated
  }

  async deletePrizeDraw(id: string) {
    await prisma.prizeDraw.delete({ where: { id } })

    return 'Prize draw deleted successfully.'
  }
}
