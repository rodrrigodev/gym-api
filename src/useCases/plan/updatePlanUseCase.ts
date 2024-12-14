import { PlanAlreadyExistsError } from '@/errors/planAlreadyExistsError'
import { PlanNotFoundError } from '@/errors/planNotFoundError'
import { PlanRepository } from '@/repositories/interfaces/planRepository'

interface UpdatePlanUseCaseRequest {
  id: string
  name?: string
  price?: string
}

export class UpdatePlanUseCase {
  constructor(private planRepository: PlanRepository) {}

  async execute({ id, name, price }: UpdatePlanUseCaseRequest) {
    const planExistsInDatabase = await this.planRepository.findPlanById(id)

    if (!planExistsInDatabase) {
      throw new PlanNotFoundError()
    }

    const planAlreadyExists = name
      ? await this.planRepository.findPlanByName(name)
      : null

    if (planAlreadyExists) {
      throw new PlanAlreadyExistsError()
    }

    const priceToDecimal = price ? price.replace('.', '') : price

    const priceUpdated = await this.planRepository.updatePlan(
      planExistsInDatabase.id,
      {
        name,
        price: priceToDecimal,
      },
    )

    return priceUpdated
  }
}
