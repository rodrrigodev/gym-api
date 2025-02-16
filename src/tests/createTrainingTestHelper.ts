import { TrainingRepository } from '@/repositories/interfaces/trainingRepository'

export async function createTrainingTestHelper(
  trainingRepository: TrainingRepository,
) {
  const trainings = [
    {
      category: 'Strength',
      type: 'Bulk Up',
      level: 'Intermediate',
      age_group: '18-40',
      gender: 'Unisex',
      gymEquipment: ['Dumbbells', 'Barbell', 'Bench Press'],
    },
    {
      category: 'Cardio',
      type: 'Slim Down',
      level: 'Beginner',
      age_group: 'All Ages',
      gender: 'Unisex',
      gymEquipment: ['Treadmill', 'Jump Rope', 'Stationary Bike'],
    },
    {
      category: 'Endurance',
      type: 'Improve Stamina',
      level: 'Advanced',
      age_group: '18-50',
      gender: 'Unisex',
      gymEquipment: ['Rowing Machine', 'Battle Ropes', 'Kettlebell'],
    },
  ]

  const results = await Promise.all(
    trainings.map((data) =>
      trainingRepository.createTraining({
        age_group: data.age_group,
        category: data.category,
        gender: data.gender,
        level: data.level,
        type: data.type,
      }),
    ),
  )

  return results[2]
}
