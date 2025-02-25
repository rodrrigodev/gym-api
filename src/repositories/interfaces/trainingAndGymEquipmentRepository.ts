import { TrainingGymEquipment } from '@prisma/client'

export interface TrainingAndGymEquipmentRepository {
  createTrainingAndGymEquipment: (data: {
    trainingId: string
    gymEquipmentIds: string[]
  }) => Promise<string[]>

  findTrainingsAndGymEquipment: (
    trainingIds: string[],
  ) => Promise<TrainingGymEquipment[]>

  deleteTrainingEquipment: (
    trainingId: string,
    gymEquipmentIds: string[],
  ) => Promise<string>
}
