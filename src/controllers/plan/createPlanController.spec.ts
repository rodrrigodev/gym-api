import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'

describe('create plan test', () => {
  it('should be able to create a plan', async () => {
    const { body, status } = await request(app).post('/create-plan').send({
      name: 'basic',
      price: 120.0,
    })

    expect(status).toBe(201)
    expect(body).toHaveProperty('price')
    expect(body.name).toEqual(expect.stringContaining('basic'))
  })
})
