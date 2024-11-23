import { PlanRepository } from '@/repositories/planRepository'

export class FetchPlansUseCase {
  constructor(private planRepository: PlanRepository) {}

  async execute() {
    const fetchPlans = await this.planRepository.fetchPlans()

    return fetchPlans
  }
}
