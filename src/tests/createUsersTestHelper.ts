import { UserRepository } from '@/repositories/interfaces/userRepository'
import { getRandomLuckyNumber } from '@/utils/getRandomLuckyNumber'

export async function createUsersTestHelper(userRepository: UserRepository) {
  const users = await Promise.all(
    Array.from({ length: 9 }, (_, i) =>
      userRepository.createUser({
        email: `alex-${i}@email.com`,
        name: `Alex-${i}`,
        password: '12345678',
        created_at: new Date(),
        lucky_numbers: [],
        last_login: null,
      }),
    ),
  )

  users.forEach(async (user) => {
    const lucky_numbers = [
      getRandomLuckyNumber(user.id, 'str'),
      getRandomLuckyNumber(user.id, 'plan'),
      getRandomLuckyNumber(user.id, 'ind'),
    ]

    await userRepository.updateUser(user.id, {
      lucky_numbers,
    })
  })

  const user = await userRepository.createUser({
    email: 'rodrigo@email.com',
    name: 'Rodrigo',
    password: '12345678',
    created_at: new Date(),
    current_weight: 75,
    last_login: new Date(),
  })

  return user
}
