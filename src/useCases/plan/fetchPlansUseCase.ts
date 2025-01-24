import { PlanRepository } from '@/repositories/interfaces/planRepository'

export class FetchPlansUseCase {
  constructor(private planRepository: PlanRepository) {}

  async execute() {
    return await this.planRepository.fetchPlans()
  }
}
