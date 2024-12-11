const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Checkout API', () => {
  it('should process checkout and place an order', async () => {
    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/api/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({
        discountCode: 'DISCOUNT123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Order placed successfully');
  });
});
