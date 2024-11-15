import { GymEquipmentRepository } from '@/repositories/gymEquipmentRepository'

export async function createGymEquipmentTestHelper(
  gymEquipmentRepository: GymEquipmentRepository,
) {
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
