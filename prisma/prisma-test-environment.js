import { TestEnvironment as NodeEnvironment } from 'jest-environment-node'
import { randomUUID } from 'node:crypto'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
    this.schema = randomUUID()
    this.databaseURL = `${process.env.DATABASE_URL_TEST}${this.schema}`
  }

  async setup() {
    process.env.DATABASE_URL = this.databaseURL
    this.global.env.DATABASE_URL = this.databaseURL

    execSync('npx prisma migrate dev')
  }

  async teardown() {
    await prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`,
    )
    await prisma.$disconnect()
  }
}
