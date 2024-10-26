import { UserProgress } from '@prisma/client'

export interface CreateUserProgressData {
  id: string
  lastWeight: number
  currentGoal: 'slim down' | 'bulk up'
  nextWorkout?: 'chest' | 'legs' | 'back'
}

export interface UserProgressRepository {
  createUserProgress: (
    data: CreateUserProgressData,
  ) => Promise<UserProgress | null>
  // updateUserProgress: (id: string) => Promise<User | null>
}
