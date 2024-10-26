type WorkoutType = 'chest' | 'legs' | 'back'

interface CheckGymMembersWorkouts {
  id: string
  lastWeight: number | null
  nextWorkout: string
  lastWorkout: string | null
  iaAnalyses: string | null
  iaAnalysesDate: Date | null
  currentGoal: string | null
  streaks: Date[]
  userId: string
}

export default function getNextWorkoutExercise(
  workouts: CheckGymMembersWorkouts[],
): WorkoutType {
  const workoutCounts = workouts.reduce(
    (counts, workout) => {
      const workoutType = workout.nextWorkout as WorkoutType

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
