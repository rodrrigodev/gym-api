import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'

describe('create a gym equipment test', () => {
  it('should be able to create a gym equipment', async () => {
    const { body, status } = await request(app)
      .post('/create-gym-equipment')
      .send({
        name: 'Leg Press 45',
        category: 'legs',
        sets: 12,
        reps: 4,
        cod: 1,
      })

    expect(status).toBe(201)
    expect(body).toHaveProperty('name')
    expect(body.category).toEqual(expect.stringContaining('legs'))
  })
})
