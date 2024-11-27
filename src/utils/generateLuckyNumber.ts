import { User } from '@prisma/client'

interface GenerateUniqueLuckyCodeParams {
  users: User[]
  type: string
}

export async function generateUniqueLuckyCode({
  users,
  type,
}: GenerateUniqueLuckyCodeParams) {
  const letters = 'VIOLETGYM'
  let luckyCode = ''
  let isUnique = false

  while (!isUnique) {
    const randomLetter = letters.charAt(
      Math.floor(Math.random() * letters.length),
    )

    const randomNumber = Math.floor(Math.random() * 100) + 1

    luckyCode = `${type}-${randomLetter}${randomNumber}`

    const existingUser = users.find((user) => {
      return user.lucky_numbers.find((number) => {
        return number.includes(luckyCode)
      })
    })

    if (!existingUser) {
      isUnique = true
    }
  }

  return luckyCode
}
