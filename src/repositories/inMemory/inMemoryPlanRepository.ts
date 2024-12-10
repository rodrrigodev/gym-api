import { Plan, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PlanRepository } from '../planRepository'

export class InMemoryPlanRepository implements PlanRepository {
  private plans: Plan[] = []

  async createPlan(data: Prisma.PlanCreateInput) {
    const plan = {
      id: randomUUID(),
      name: data.name,
      price: new Prisma.Decimal(Number(data.price)),
      created_at: new Date(),
    }

    this.plans.push(plan)

    return plan
  }

  async findPlanByName(name: string) {
    const planAlreadyExists = this.plans.find((plan) => {
      return plan.name === name
    })

    return planAlreadyExists || null
  }

  async findPlanById(id: string) {
    const planExists = this.plans.find((plan) => {
      return plan.id === id
    })

    return planExists || null
  }

  async deletePlan(id: string) {
    const filteredPlans = this.plans.filter((plan) => {
      return plan.id !== id
    })

    this.plans = filteredPlans

    return {
      plans: filteredPlans.slice(0, 20),
      length: Math.ceil(filteredPlans.length / 20),
    }
  }

  async updatePlan(id: string, data: Prisma.PlanUpdateInput) {
    const plansUpdated = this.plans.map((plan) => {
      if (plan.id === id) {
        return { ...plan, ...data }
      } else {
        return plan
      }
    })

    this.plans = plansUpdated as Plan[]

    const planUpdated = this.plans.find((plan) => {
      return plan.id === id
    })

    return planUpdated || null
  }

  async fetchPlans() {
    return this.plans || null
  }
}
