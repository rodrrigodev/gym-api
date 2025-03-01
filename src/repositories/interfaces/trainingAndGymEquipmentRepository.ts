import { TrainingGymEquipment } from '@prisma/client'

export interface TrainingAndGymEquipmentRepository {
  createTrainingAndGymEquipment: (data: {
    trainingId: string
    gymEquipmentIds: string[]
  }) => Promise<string[]>

  fetchTrainingsAndGymEquipment: (
    trainingIds: string[],
  ) => Promise<TrainingGymEquipment[]>

  findTrainingsAndGymEquipment: (
    trainingId: string,
  ) => Promise<TrainingGymEquipment[]>

  updateTrainingsAndGymEquipment: (data: {
    trainingId: string
    gymEquipmentId: string
  }) => Promise<TrainingGymEquipment>

  deleteTrainingEquipment: (
    trainingId: string,
    gymEquipmentId: string,
  ) => Promise<string>
}
