import { TrainingGymEquipment } from '@prisma/client'

export interface TrainingAndGymEquipmentRepository {
  createTrainingAndGymEquipment: (data: {
    trainingId: string
    gymEquipmentIds: string[]
  }) => Promise<{ trainingId: string; amount: number }>

  fetchTrainingsAndGymEquipment: (
    trainingIds: string[],
  ) => Promise<TrainingGymEquipment[]>

  findTrainingsAndGymEquipment: (
    trainingId: string,
  ) => Promise<TrainingGymEquipment[]>

  deleteTrainingEquipment: (
    trainingId: string,
    gymEquipmentId: string,
  ) => Promise<string>
}
