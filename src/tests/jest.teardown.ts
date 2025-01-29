import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const globalTeardown = async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS test CASCADE`)
  await prisma.$disconnect()

  console.log('Global teardown: All tests completed!')
}

export default globalTeardown
