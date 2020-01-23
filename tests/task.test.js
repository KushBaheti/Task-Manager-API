const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOneId, userOne, userTwo, taskOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ description: "From task.test.js" })
        .expect(201)
    
    // Assert that task is created and is stored in database
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    // Validate that completed property of task is false by default
    expect(task.completed).toEqual(false)
})

test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    // Assert length of tasks array in response is 2
    expect(response.body.length).toEqual(2) 
})

test('Should not delete other users task', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    // Assert that taskOne is still in database
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})