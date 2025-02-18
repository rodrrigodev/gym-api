import { TrainingGymEquipment } from '@prisma/client'

export interface TrainingAndGymEquipmentRepository {
  createTrainingAndGymEquipment: (data: {
    trainingId: string
    gymEquipmentIds: string[]
  }) => Promise<string[]>

  fetchTrainingAndGymEquipment: (
    equipmentId: string,
  ) => Promise<TrainingGymEquipment[]>

  addTrainingEquipment: (
    trainingId: string,
    gymEquipmentIds: string[],
  ) => Promise<TrainingGymEquipment[]>

  deleteTrainingEquipment: (
    trainingId: string,
    gymEquipmentIds: string[],
  ) => Promise<string>
}
