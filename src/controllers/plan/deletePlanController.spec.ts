import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('delete plan test', () => {
  it('should be able to delete a plan', async () => {
    const plans = await testHelper.createPlans()
    const { body, status } = await request(app).delete('/delete-plan').send({
      id: plans[0].id,
    })

    expect(status).toBe(200)
    expect(body.message).toEqual(
      expect.stringContaining('Plan deleted successfully!'),
    )
  })
})
