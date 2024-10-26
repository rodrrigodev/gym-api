import { prisma } from '@/lib/prisma'
import {
  CreateUserProgressData,
  UserProgressRepository,
} from '../userProgressRepository'

export class PrismaUserProgressRepository implements UserProgressRepository {
  async createUserProgress({
    id,
    lastWeight,
    currentGoal,
    nextWorkout,
  }: CreateUserProgressData) {
    // const checkGymMembersWorkouts = await prisma.userProgress.findMany()
//     if (!nextWorkout) {
//       const workouts = await prisma.userProgress.groupBy({
//         by: ['nextWorkout'],
//         _count: { nextWorkout: true },
//         orderBy: { _count: { nextWorkout: 'asc' } },
//       })

//       const progress = await prisma.userProgress.create({
//         data: {
//           userId: id,
//           currentGoal,
//           lastWeight,
//           nextWorkout: workouts[0].nextWorkout,
//         },
//       })

//       return progress
//     }

//     const progress = await prisma.userProgress.create({
//       data: { userId: id, currentGoal, lastWeight, nextWorkout },
//     })

//     return progress
//   }
}
