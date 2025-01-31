import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('update a bill test', () => {
  it('should be able to update a bill', async () => {
    const bills = await testHelper.createBills()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .patch('/bill/update')
      .send({
        id: bills[0].id,
        name: 'Kit fitness violet-fit',
        category: 'revenue',
        price: 241.22,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body.name).toEqual(expect.stringContaining('Kit fitness violet-fit'))
    expect(body.category).toEqual(expect.stringContaining('revenue'))
  })
})
