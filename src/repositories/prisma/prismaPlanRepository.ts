import { Prisma } from '@prisma/client'
import { PlanRepository } from '../interfaces/planRepository'
import { prisma } from '@/lib/prisma'

export class PrismaPlanRepository implements PlanRepository {
  async createPlan(data: Prisma.PlanCreateInput) {
    const plan = await prisma.plan.create({ data })

    return plan
  }

  async findPlanByName(name: string) {
    const plan = await prisma.plan.findFirst({ where: { name } })

    return plan
  }

  async fetchPlans() {
    return await prisma.plan.findMany()
  }

  async findPlan(id: string) {
    const plan = await prisma.plan.findUnique({ where: { id } })

    return plan
  }

  async deletePlan(id: string) {
    await prisma.plan.delete({ where: { id } })

    return 'Plan deleted successfully!'
  }

  async updatePlan(id: string, data: Prisma.PlanUpdateInput) {
    const planUpdated = await prisma.plan.update({
      where: { id },
      data,
    })

    return planUpdated
  }
}
