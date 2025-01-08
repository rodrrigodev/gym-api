import { User } from '@prisma/client'

export function getPrizeDrawWinner(data: User[]) {
  type prizeDrawInfoType = { winnerId: string; drawNumber: string }

  const prizeDrawInfo: prizeDrawInfoType[] = []

  data.forEach((user) => {
    user.lucky_numbers.forEach((number) => {
      prizeDrawInfo.push({ winnerId: user.id, drawNumber: number })
    })
  })

  const winner = prizeDrawInfo[Math.floor(Math.random() * prizeDrawInfo.length)]

  return winner
}
