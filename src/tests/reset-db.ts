import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const resetDb = {
  reset: async () => {
    await prisma.$transaction([
      prisma.user.deleteMany(),
      prisma.prizeDraw.deleteMany(),
      prisma.userProgress.deleteMany(),
      prisma.gymEquipment.deleteMany(),
      prisma.equipmentTracking.deleteMany(),
      prisma.activity.deleteMany(),
      prisma.bill.deleteMany(),
      prisma.plan.deleteMany(),
    ])
  },

  clear: async () => {
    await prisma.$disconnect()
  },
}

export default resetDb
