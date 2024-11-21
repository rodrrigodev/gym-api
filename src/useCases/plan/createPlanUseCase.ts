import { PlanAlreadyExistsError } from '@/errors/planAlreadyExistsError'
import { PlanRepository } from '@/repositories/planRepository'

interface CreatePlanUseCaseRequest {
  name: string
  price: string
}

export class CreatePlanUseCase {
  constructor(private planRepository: PlanRepository) {}

  async execute({ name, price }: CreatePlanUseCaseRequest) {
    const planAlreadyExists = await this.planRepository.findPlan(name)
    const priceToDecimal = price.replace('.', '')

    if (planAlreadyExists) {
      throw new PlanAlreadyExistsError()
    }

    const plan = await this.planRepository.createPlan({
      name,
      price: priceToDecimal,
    })

    return plan
  }
}
