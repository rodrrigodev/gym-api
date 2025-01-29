import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('update activity test', () => {
  it('should be able to update an activity', async () => {
    const users = await testHelper.createRandomUsers()
    const usersProgresses = await testHelper.createRandomUsersProgress(users)

    const activity = await request(app).post('/create-activity').send({
      userProgressId: usersProgresses[5].id,
    })

    const { body, status } = await request(app).patch('/update-activity').send({
      activityId: activity.body.id,
      finishedAt: null,
    })

    expect(status).toBe(200)
    expect(body).toHaveProperty('workout')
    expect(new Date(body.finished_at)).toEqual(expect.any(Date))
  })
})
