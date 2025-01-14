export function setDate(daysToAddFromActual: number) {
  const date = new Date()
  const finalDate = date.setDate(date.getDate() + daysToAddFromActual)
  return new Date(finalDate)
}
