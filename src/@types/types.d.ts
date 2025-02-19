export {}

declare global {
  namespace PrismaJson {
    export type Workout = {
      id: string
      category: string
      finished_at: Date | null
    }
  }
}
