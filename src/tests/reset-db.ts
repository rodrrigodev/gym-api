import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const resetDb = {
  reset: async () => {
    await prisma.$transaction([
      prisma.equipmentTracking.deleteMany(),
      prisma.activity.deleteMany(),
      prisma.trainingGymEquipment.deleteMany(),
      prisma.training.deleteMany(),
      prisma.userProgress.deleteMany(),
      prisma.prizeDraw.deleteMany(),
      prisma.bill.deleteMany(),
      prisma.plan.deleteMany(),
      prisma.user.deleteMany(),
      prisma.gymEquipment.deleteMany(),
    ])
  },

  clear: async () => {
    await prisma.$disconnect()
  },
}

export default resetDb
