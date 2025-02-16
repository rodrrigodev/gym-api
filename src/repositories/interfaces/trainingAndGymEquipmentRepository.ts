import { Prisma, TrainingGymEquipment } from '@prisma/client'

export interface TrainingAndGymEquipmentRepository {
  createTrainingAndGymEquipment: (
    data: Prisma.TrainingGymEquipmentCreateManyInput,
  ) => Promise<TrainingGymEquipment>

  fetchTrainingAndGymEquipment: (
    page: number,
  ) => Promise<TrainingGymEquipment[]>

  updateTrainingAndGymEquipment: (
    where: Prisma.TrainingGymEquipmentWhereUniqueInput,
    data: Prisma.TrainingGymEquipmentUncheckedUpdateInput,
  ) => Promise<TrainingGymEquipment>
}
