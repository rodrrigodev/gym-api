import { GymEquipmentRepository } from '@/repositories/interfaces/gymEquipmentRepository'

export async function createGymEquipmentTestHelper(
  gymEquipmentRepository: GymEquipmentRepository,
) {
  await Promise.all(
    Array.from({ length: 25 }, (_, i) =>
      gymEquipmentRepository.createGymEquipment({
        name: `Leg Press Machine ${i}`,
        category: 'legs',
        sets: 4,
        reps: 12,
        cod: `LEG-0${i}1`,
        status: 'available',
        last_maintenance: new Date(),
      }),
    ),
  )

  const gymEquipment = await gymEquipmentRepository.createGymEquipment({
    name: 'Leg Press Machine',
    category: 'legs',
    sets: 4,
    reps: 12,
    cod: 'LEG-001',
    status: 'available',
    last_maintenance: new Date(),
  })

  return gymEquipment
}
