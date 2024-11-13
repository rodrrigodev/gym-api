import { UserRepository } from '@/repositories/userRepository'

export async function userTestHelper(userRepository: UserRepository) {
  const user = await userRepository.createUser({
    email: 'rodrigo@email.com',
    name: 'Rodrigo',
    password: '12345678',
    created_at: new Date(),
  })

  return user
}
