import { Prisma, PrizeDraw } from '@prisma/client'

export interface PrizeDrawRepository {
  createPrizeDraw: (data: Prisma.PrizeDrawCreateInput) => Promise<PrizeDraw>
  fetchPrizeDraw: () => Promise<PrizeDraw[]>
  updatePrizeDraw: (
    id: string,
    data: Prisma.PrizeDrawUncheckedUpdateInput,
  ) => Promise<PrizeDraw | null>
  findPrizeDraw: (id: string) => Promise<PrizeDraw | null>
  deletePrizeDraw: (id: string) => Promise<string>
}
