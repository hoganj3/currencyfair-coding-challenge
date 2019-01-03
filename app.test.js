const request = require('supertest')
const app = require('./app')

describe('Test the root path', () => {
    test('The GET method should respond', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200)
            done()
        })
    })
})

describe('Test the message POST endpoint', () => {
    test('The POST method should respond', (done) => {
        request(app).post('/post-message').then((response) => {
            expect(response.statusCode).toBe(200)
            done()
        })
    })
})

