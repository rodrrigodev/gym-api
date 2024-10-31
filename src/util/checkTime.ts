import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export function timeIsBetween(date: Date) {
  const brazilTime = dayjs(date).tz('America/Sao_Paulo')
  const hour = brazilTime.hour()

  return hour >= 6 && hour < 22
}
