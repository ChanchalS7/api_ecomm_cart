const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Cart API', () => {
  it('should add an item to the cart', async () => {
    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId: 'sample-product-id',
        quantity: 2,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Item added to cart');
  });
});
