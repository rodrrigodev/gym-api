import { Prisma, PrizeDraw, User } from '@prisma/client'

export interface PrizeDrawRepository {
  createPrizeDraw: (data: Prisma.PrizeDrawCreateInput) => Promise<PrizeDraw>

  fetchPrizeDraws: () => Promise<PrizeDraw[]>

  updatePrizeDraw: (
    id: string,
    data: Prisma.PrizeDrawUncheckedUpdateInput,
  ) => Promise<PrizeDraw | null>

  findPrizeDraw: (id: string) => Promise<PrizeDraw | null>

  deletePrizeDraw: (
    id: string,
  ) => Promise<{ prizeDraws: PrizeDraw[]; length: number }>

  drawParticipantWinnerUseCase: (
    prizeDrawId: string,
    data: User[],
  ) => Promise<{
    winnerId: string
    drawNumber: string
  }>
}
