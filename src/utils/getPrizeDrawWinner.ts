interface GetPrizeDrawWinner {
  id: string
  lucky_numbers: string[]
}

export function getPrizeDrawWinner(data: GetPrizeDrawWinner[]) {
  type prizeDrawInfoType = { winnerId: string; drawNumber: string }

  const prizeDrawInfo: prizeDrawInfoType[] = []

  data.forEach((info) => {
    info.lucky_numbers.forEach((number) => {
      prizeDrawInfo.push({ winnerId: info.id, drawNumber: number })
    })
  })

  const winner = prizeDrawInfo[Math.floor(Math.random() * prizeDrawInfo.length)]

  return winner
}
