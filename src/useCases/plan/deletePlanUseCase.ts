import { PlanNotFoundError } from '@/errors/planNotFoundError'
import { PlanRepository } from '@/repositories/interfaces/planRepository'

export class DeletePlanUseCase {
  constructor(private planRepository: PlanRepository) {}

  async execute(id: string) {
    const planExists = await this.planRepository.findPlan(id)

    if (!planExists) {
      throw new PlanNotFoundError()
    }

    const message = await this.planRepository.deletePlan(planExists.id)

    return message
  }
}
