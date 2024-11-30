import { Prisma, PrizeDraw } from '@prisma/client'

export interface PrizeDrawRepository {
  createPrizeDraw: (data: Prisma.PrizeDrawCreateInput) => Promise<PrizeDraw>
  fetchPrizeDraw: () => Promise<PrizeDraw[]>
  updatePrizeDraw: (
    id: string,
    data: Prisma.PrizeDrawUpdateInput,
  ) => Promise<PrizeDraw | null>
  findPrizeDraw: (id: string) => Promise<PrizeDraw | null>
  deletePrizeDraw: (id: string) => Promise<string>
}
