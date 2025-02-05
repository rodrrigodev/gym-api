import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('generate file test', () => {
  it('should generate an Excel file', async () => {
    await testHelper.createBills()
    const token = await testHelper.createAndAuthenticateUser(app)

    const response = await request(app)
      .get('/bill/generate')
      .buffer(true) // Ensures response is treated as a buffer
      .parse((res, callback) => {
        // Prevents Supertest from parsing JSON
        res.setEncoding('binary')
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => callback(null, Buffer.from(data, 'binary')))
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.header['content-type']).toBe(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    expect(response.header['content-disposition']).toContain('attachment')
    expect(response.body).toBeInstanceOf(Buffer)
  })
})
