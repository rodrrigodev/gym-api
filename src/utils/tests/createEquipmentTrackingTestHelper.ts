import { EquipmentTrackingRepository } from '@/repositories/equipmentTrackingRepository'

export async function createEquipmentTrackingTestHelper(
  equipmentTrackingRepository: EquipmentTrackingRepository,
  gymEquipmentId: string,
  userProgressId: string,
) {
  const equipmentTracking =
    await equipmentTrackingRepository.createEquipmentTracking({
      initial_weight: 1,
      actual_weight: 5,
      gym_equipment_id: gymEquipmentId,
      user_progress_id: userProgressId,
    })

  return equipmentTracking
}
