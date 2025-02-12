export function setDate(daysFromActual: number, type?: 'less') {
  const date = new Date()
  if (!type) {
    return new Date(date.setDate(date.getDate() + daysFromActual))
  }

  return new Date(date.setDate(date.getDate() - daysFromActual))
}
