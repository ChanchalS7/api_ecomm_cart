const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should log in a user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
