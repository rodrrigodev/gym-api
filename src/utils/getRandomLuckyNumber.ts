import crypto from 'crypto'

export function getRandomLuckyNumber(id: string, type: string) {
  const letters = 'VIOLETGYM'
  const randomLetter = letters.charAt(
    Math.floor(Math.random() * letters.length),
  )
  const randomNumber = Math.floor(Math.random() * 999) + 1

  const timestamp = Date.now()
  const hash = crypto
    .createHash('sha256')
    .update(`${id}-${timestamp}`)
    .digest('hex')
    .slice(0, 4)

  return `${type}-${randomLetter}${randomNumber}-${hash}`
}
