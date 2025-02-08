import { prisma } from '@/lib/prisma'
import { PrizeDrawRepository } from '../interfaces/prizeDrawRepository'
import { Prisma } from '@prisma/client'

export class PrismaPrizeDrawRepository implements PrizeDrawRepository {
  async createPrizeDraw(data: Prisma.PrizeDrawCreateInput) {
    return await prisma.prizeDraw.create({
      data: {
        prize: data.prize,
        finished_at: data.finished_at,
        status: data.status,
      },
    })
  }

  async findPrizeDraw(id: string) {
    return prisma.prizeDraw.findUnique({
      where: {
        id,
      },
    })
  }

  async fetchPrizeDraws(page: number) {
    const [prizeDraws, total] = await prisma.$transaction([
      prisma.prizeDraw.findMany({
        skip: (page - 1) * 20,
        take: 20,
      }),
      prisma.prizeDraw.count(),
    ])

    return { prizeDraws, length: Math.ceil(total / 20) }
  }

  async updatePrizeDraw(
    id: string,
    data: Prisma.PrizeDrawUncheckedUpdateInput,
  ) {
    return await prisma.prizeDraw.update({
      where: { id },
      data,
    })
  }

  async deletePrizeDraw(id: string) {
    await prisma.prizeDraw.delete({ where: { id } })

    return 'Prize draw deleted successfully!'
  }
}
