import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'
import { setDate } from '@/utils/setDate'

describe('create prize draw test', () => {
  it('should be able to create a prize draw', async () => {
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .post('/prize/create')
      .send({
        prize: 'Protein kit',
        status: 'waiting',
        finishedAt: setDate(25),
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('prize')
    expect(body.status).toEqual(expect.stringContaining('waiting'))
  })
})
