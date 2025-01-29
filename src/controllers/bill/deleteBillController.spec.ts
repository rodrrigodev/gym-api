import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('delete bill test', () => {
  it('should be able to delete a bills', async () => {
    const bills = await testHelper.createBills()

    const { body, status } = await request(app).delete('/delete-bill').send({
      id: bills[0].id,
    })

    expect(status).toBe(200)
    expect(body.message).toBe('Bill deleted successfully!')
  })
})
