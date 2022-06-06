'use strict';
const { app } = require('../src/server');  
const supertest = require('supertest');
const mockRequest = supertest(app);

const { db } = require('../src/models/index');

beforeAll(async () => {
  await db.sync();
});

describe('Web server', () => {

    it('Respond with 404 status on an invalid route', async () => {
    const response = await mockRequest.get('/abc');
    expect(response.status).toBe(404);
  });
  it('Respond with 404 status on an invalid method', async () => {
    const response = await mockRequest.patch('/food');
    expect(response.status).toBe(404);
  });
  it('Add a food', async () => {
    const response = await mockRequest.post('/food').send({
        name: 'burger',
        price: 10
    });
    expect(response.status).toBe(201);
  });
  it('Get all food items', async () => {
    const response = await mockRequest.get('/food');
    expect(response.status).toBe(200);
  });
  it('Get one food', async () => {
    const response = await mockRequest.get('/food/1');
    expect(response.status).toBe(200);
  });
  it('Update a food', async () => {
    const response = await mockRequest.put('/food/1');
    expect(response.status).toBe(201);
  });
  it('Delete a food', async () => {
    const response = await mockRequest.delete('/food/1');
    expect(response.status).toBe(204);
  });
  it('Add a clothing', async () => {
    const response = await mockRequest.post('/clothes').send({
        name: 'burger',
        size: "small"
    });
    expect(response.status).toBe(201);
  });
  it('Get all clothes items', async () => {
    const response = await mockRequest.get('/clothes');
    expect(response.status).toBe(200);
  });
  it('Get one clothing', async () => {
    const response = await mockRequest.get('/clothes/1');
    expect(response.status).toBe(200);
  });
  it('Update a clothes', async () => {
    const response = await mockRequest.put('/clothes/1');
    expect(response.status).toBe(201);
  });
  it('Delete a clothes', async () => {
    const response = await mockRequest.delete('/clothes/1');
    expect(response.status).toBe(204);
  });

});
afterAll(async () => {
  await db.drop();
});