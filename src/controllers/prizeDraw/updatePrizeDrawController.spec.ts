import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'
import { setDate } from '@/tests/setDate'

describe('update prize draw test', () => {
  it('should be able to create a prize draw', async () => {
    const token = await testHelper.createAndAuthenticateUser(app)
    const prize = await testHelper.createPrizeDraw()

    const { body, status } = await request(app)
      .patch('/update-prize')
      .send({
        id: prize.id,
        prize: 'Protein kit',
        finishedAt: setDate(25),
        status: 'waiting',
        drawNumber: null,
        winnerId: null,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body.prize).toEqual(expect.stringContaining('Protein kit'))
    expect(body.status).toEqual(expect.stringContaining('waiting'))
  })
})
