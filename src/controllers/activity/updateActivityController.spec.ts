import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('update activity test', () => {
  it('should be able to update an activity', async () => {
    const users = await testHelper.createRandomUsers()
    const usersProgresses = await testHelper.createRandomUsersProgress(users)
    const training = await testHelper.createRandomTrainings()
    const token = await testHelper.createAndAuthenticateUser(app)

    const activity = await request(app)
      .post('/activity/create')
      .send({
        userProgressId: usersProgresses[5].id,
        trainingId: training[0].id,
      })
      .set('Authorization', `Bearer ${token}`)

    const { body, status } = await request(app)
      .patch('/activity/update')
      .send({
        activityId: activity.body.id,
        finishedAt: null,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('id')
    expect(new Date(body.finished_at)).toEqual(expect.any(Date))
  })
})
