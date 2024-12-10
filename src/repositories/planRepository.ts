import { Plan, Prisma } from '@prisma/client'

export interface PlanRepository {
  createPlan: (data: Prisma.PlanCreateInput) => Promise<Plan>
  fetchPlans: () => Promise<Plan[]>
  findPlanByName: (name: string) => Promise<Plan | null>
  findPlanById: (id: string) => Promise<Plan | null>
  updatePlan: (id: string, data: Prisma.PlanUpdateInput) => Promise<Plan | null>
  deletePlan: (id: string) => Promise<{ plans: Plan[]; length: number }>
}
