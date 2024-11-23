import { PlanRepository } from '@/repositories/planRepository'

export async function createPlanTestHelper(planRepository: PlanRepository) {
  await planRepository.createPlan({ name: 'Gold', price: '300.00' })

  const plan = await planRepository.createPlan({
    name: 'Basic',
    price: '140.00',
  })

  return plan
}
