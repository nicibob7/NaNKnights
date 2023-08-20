require('dotenv').config({path: './test/.env.test'});

//basic api imports
const request = require('supertest');
const validateParameters = require('../middleware/validateParams');
const server = require('../app');

// authentication Imports
const authenticator = require('../middleware/authenticator');
const Token = require('../models/Token');

// middleware Imports
const filter = require('../middleware/filter');
// Basic API tests
describe('API tests', () => {
    let app;

    beforeAll(() => {
        app = server.listen(3000);
    });

    afterAll(() => {
        app.close();
    });

    it('should return a 200 status code for GET request to /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    it('should return a 302 status code for GET request to unhandled mapping', async () => {
        const response = await request(app).get('/unknown');
        expect(response.statusCode).toBe(302);
    });

    it('should return a 404 status code for POST request to unhandled mapping', async () => {
        const response = await request(app).post('/unknown');
        expect(response.statusCode).toBe(404);
    });

    it('should return a 404 status code for ANY other request to unhandled mapping', async () => {
        const response = await request(app).put('/unknown');
        expect(response.statusCode).toBe(404);
    });

    it('should return a 404 status code for HEAD request to unhandled mapping', async () => {
        const response = await request(app).head('/unknown');
        expect(response.statusCode).toBe(404);
    });
});


// Authenticator tests in middleware/authenticator.js
jest.mock("../models/Token", () => ({
    getOneByToken: jest.fn(),
}));

describe('authenticator middleware', () => {
    let agent;
    let response;

    beforeEach(() => {
        agent = request.agent(server); // Replace 'app' with your Express app instance
        response = jest.fn();
    });

    it('should pass with a valid token', async () => {
        const validTokenMock = {
            username: 'testUser',
            isExpired: jest.fn().mockResolvedValue(false),
        };

        Token.getOneByToken.mockResolvedValue(validTokenMock);

        await authenticator(
            { headers: { cookie: 'token=validTokenHere' } },
            { locals: {} },
            response
        );

        expect(Token.getOneByToken).toHaveBeenCalledWith('validTokenHere');
        expect(validTokenMock.isExpired).toHaveBeenCalled();
        expect(response).toHaveBeenCalledWith();
    });

    it('should redirect with an expired token', async () => {
        const expiredTokenMock = {
            username: 'testUser',
            isExpired: jest.fn().mockResolvedValue(true),
        };

        Token.getOneByToken.mockResolvedValue(expiredTokenMock);

        await authenticator(
            { headers: { cookie: 'token=expiredTokenHere' } },
            { locals: {}, status: jest.fn().mockReturnThis(), redirect: jest.fn() },
            response
        );

        expect(Token.getOneByToken).toHaveBeenCalledWith('expiredTokenHere');
        expect(expiredTokenMock.isExpired).toHaveBeenCalled();
    });

    it('should redirect with an empty token', async () => {
        const expiredTokenMock = {
            username: 'testUser',
            isExpired: jest.fn().mockResolvedValue(true),
        };

        Token.getOneByToken.mockResolvedValue(expiredTokenMock);

        await authenticator(
            { headers: { cookie: 'token=' } },
            { locals: {}, status: jest.fn().mockReturnThis(), redirect: jest.fn() },
            response
        );
    });
});

// validateParameters tests in middleware/validateParameters.js
describe('validateParameters middleware', () => {
    const mockNext = jest.fn();
    let mockRes;

    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should pass when all parameters are valid', () => {
        const mockReq = {
            body: {
                boolParam: true,
                stringParam: 'test',
                intParam: 42,
                positiveIntParam: 10,
                stringWithMaxLengthParam: 'abc',
            },
        };
        const parameterTypes = {
            boolParam: { type: 'boolean' },
            stringParam: { type: 'string' },
            intParam: { type: 'int' },
            positiveIntParam: { type: 'positiveInt' },
            stringWithMaxLengthParam: { type: 'stringWithMaxLength', maxLength: 5 },
        };

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid boolean parameter', () => {
        const mockReq = { body: { boolParam: 'notABoolean' } };
        const parameterTypes = { boolParam: { type: 'boolean' } };

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'boolParam should be a boolean.' });
    });

    it('should return 400 for invalid string parameter', () => {
        const mockReq = { body: { stringParam: 42 } };
        const parameterTypes = { stringParam: { type: 'string' } };

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'stringParam should be a string.' });
    });

    it('should return 400 for invalid int parameter', () => {
        const mockReq = { body: { intParam: 'notAnInt' } };
        const parameterTypes = { intParam: { type: 'int' } };

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'intParam should be a valid integer.' });
    });

    it('should return 400 for invalid positive int parameter', () => {
        const mockReq = { body: { positiveIntParam: -1 } };
        const parameterTypes = { positiveIntParam: { type: 'positiveInt' } };

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'positiveIntParam should be a valid positive integer.' });
    });

    it('should return 400 for invalid string with max length parameter', () => {
        const mockReq = { body: { stringWithMaxLengthParam: 'tooLong' } };
        const parameterTypes = { stringWithMaxLengthParam: { type: 'stringWithMaxLength', maxLength: 5 } };

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'stringWithMaxLengthParam should have a maximum length of 5 characters.' });
    });

    it('should return 400 for missing required parameter', () => {
        const mockReq = { body: {} };
        const parameterTypes = { requiredParam: { type: 'string' } };

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'requiredParam is required.' });
    });

});


// Test for the filter middleware in middleware/filter.js
describe('filter middleware', () => {
    const mockNext = jest.fn();
    let mockRes;

    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            redirect: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should pass when the path is valid', () => {
        const mockReq = { path: '/validPath' };

        filter(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.redirect).not.toHaveBeenCalled();
    });

    it('should return 403 when the path has a forbidden extension', () => {
        const mockReq = { path: '/forbidden.html' };

        filter(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.redirect).toHaveBeenCalledWith('/');
    });
});