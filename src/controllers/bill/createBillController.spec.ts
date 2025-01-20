import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'

describe('create bill test', () => {
  it('should be able to create a bill', async () => {
    const { body, status } = await request(app).post('/create-bill').send({
      name: 'Sabonete liquido',
      category: 'cleaning',
      price: '25.45',
    })

    expect(status).toBe(201)
    expect(body).toHaveProperty('name')
    expect(body.category).toBe('cleaning')
    expect(body.price).toBe('2545')
  })
})
