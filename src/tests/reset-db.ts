import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const resetDb = {
  reset: async () => {
    await prisma.$transaction([
      prisma.activity.deleteMany(),
      prisma.bill.deleteMany(),
      prisma.equipmentTracking.deleteMany(),
      prisma.gymEquipment.deleteMany(),
      prisma.plan.deleteMany(),
      prisma.prizeDraw.deleteMany(),
      prisma.user.deleteMany(),
      prisma.userProgress.deleteMany(),
    ])
  },
  dropSchema: async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS test CASCADE`)
    await prisma.$disconnect()
  },
}

export default resetDb
