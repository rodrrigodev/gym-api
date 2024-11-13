import { UserProgress } from '@prisma/client'

type WorkoutType = 'chest' | 'legs' | 'back'

export function getNextWorkoutExercise(workouts: UserProgress[]): WorkoutType {
  const workoutCounts = workouts.reduce(
    (counts, workout) => {
      const workoutType = workout.next_workout as WorkoutType

      counts[workoutType] = (counts[workoutType] || 0) + 1
      return counts
    },
    { chest: 0, legs: 0, back: 0 },
  )

  const { chest, legs, back } = workoutCounts

  if (chest <= legs && chest <= back) {
    return 'chest'
  } else if (legs <= back) {
    return 'legs'
  } else {
    return 'back'
  }
}
