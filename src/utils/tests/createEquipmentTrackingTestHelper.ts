import { EquipmentTrackingRepository } from '@/repositories/interfaces/equipmentTrackingRepository'

export async function createEquipmentTrackingTestHelper(
  equipmentTrackingRepository: EquipmentTrackingRepository,
  gymEquipmentId: string,
  userProgressId: string,
) {
  await equipmentTrackingRepository.createEquipmentTracking({
    initial_weight: 1,
    actual_weight: 5,
    gym_equipment_id: gymEquipmentId,
    user_progress_id: 'user-02',
    active: true,
  })

  await equipmentTrackingRepository.createEquipmentTracking({
    initial_weight: 1,
    actual_weight: 5,
    gym_equipment_id: gymEquipmentId,
    user_progress_id: 'user-04',
    active: true,
  })

  const equipmentTracking =
    await equipmentTrackingRepository.createEquipmentTracking({
      initial_weight: 1,
      actual_weight: 5,
      gym_equipment_id: gymEquipmentId,
      user_progress_id: userProgressId,
      active: true,
    })

  return equipmentTracking
}
