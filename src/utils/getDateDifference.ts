import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const brazilTimeZone = 'America/Sao_Paulo'

export function getDateDifference(date: Date) {
  const date1 = dayjs().tz(brazilTimeZone)
  const date2 = dayjs(date).tz(brazilTimeZone)

  return date2.diff(date1, 'days')
}
