import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('get user progress resume test', () => {
  it('should be able to get a user progress resume', async () => {
    const users = await testHelper.createRandomUsers()
    const progress = await testHelper.createRandomUsersProgress(users)
    await testHelper.createRandomActivities(progress[12])

    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .get(`/progress/resume/${progress[12].id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body.currentGoal).toEqual(expect.stringContaining('slim down'))
    expect(body.activitiesResume.totalActivities).toBe(6)
  })
})
