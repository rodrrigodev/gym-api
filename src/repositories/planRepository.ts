import { Plan, Prisma } from '@prisma/client'

export interface PlanRepository {
  createPlan: (data: Prisma.PlanCreateInput) => Promise<Plan>
  fetchPlans: () => Promise<Plan[]>
  findPlan: (name: string) => Promise<Plan | null>
  updatePlan: (id: string, data: Prisma.UserUpdateInput) => Promise<Plan | null>
  deletePlan: (id: string) => Promise<string>
}
