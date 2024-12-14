import { UserRepository } from '@/repositories/interfaces/userRepository'

export async function createUserTestHelper(userRepository: UserRepository) {
  const users = await Promise.all(
    Array.from({ length: 9 }, (_, i) =>
      userRepository.createUser({
        email: `alex-${i}@email.com`,
        name: `Alex-${i}`,
        password: '12345678',
        created_at: new Date(),
        lucky_numbers: [],
      }),
    ),
  )

  users.forEach(async (user) => {
    await userRepository.getLuckyNumber(user.id, 'str')
    await userRepository.getLuckyNumber(user.id, 'plan')
    await userRepository.getLuckyNumber(user.id, 'ind')
  })

  const user = await userRepository.createUser({
    email: 'rodrigo@email.com',
    name: 'Rodrigo',
    password: '12345678',
    created_at: new Date(),
    current_weight: 75,
  })

  return user
}
