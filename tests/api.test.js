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

// hardenedSecurityConfig security test located in security/hardenedSecurityConfig.js
const express = require('express');
const https = require('https');
const fs = require('fs');

// Import the module you want to test
const configureServer = require('../security/hardenedSecurityConfig');

// Basic API tests
describe('API tests', () => {
    let app;

    beforeAll(() => {
        app = server.listen(3000);
    });

    afterAll(() => {
        jest.clearAllMocks();
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

    it('should handle invalid JSON format', async () => {
        const response = await request(server)
            .post('/test')
            .send('"json":"invalid-json"');

        expect(response.status).toBe(404);
    });
});


// Authenticator tests in middleware/authenticator.js
const User = require('../models/User');

jest.mock('../models/Token'); // Mock the Token class
jest.mock('../models/User'); // Mock the User class

describe('authenticator middleware', () => {
    let next;
    let req;
    let res;

    beforeEach(() => {
        next = jest.fn();
        req = {
            headers: {
                cookie: 'token=validTokenHere',
            },
        };
        res = {
            redirect: jest.fn(), // Mock the redirect method
            locals: {},
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should pass with a valid token', async () => {
        const validTokenMock = {
            account_username: 'testUser',
            isExpired: jest.fn().mockResolvedValue(false),
        };

        const userMock = {
            isActivated: jest.fn().mockResolvedValue(true),
        };

        Token.getOneByToken.mockResolvedValue(validTokenMock);
        User.getByUsername.mockResolvedValue(userMock);

        await authenticator(req, res, next);

        expect(Token.getOneByToken).toHaveBeenCalledWith('validTokenHere');
        expect(validTokenMock.isExpired).toHaveBeenCalled();
        expect(User.getByUsername).toHaveBeenCalledWith('testUser');
        expect(userMock.isActivated).toHaveBeenCalled();
        expect(res.locals.token).toBe('validTokenHere');
        expect(res.locals.user).toBe('testUser');
        expect(next).toHaveBeenCalled();
        expect(res.redirect).not.toHaveBeenCalled();
    });

    it('should redirect to "/" if token is empty', async () => {
        req.headers.cookie = 'token=';

        await authenticator(req, res, next);

        expect(Token.getOneByToken).not.toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith('/');
        expect(next).not.toHaveBeenCalled();
    });

    it('should redirect to "/" if an error occurs in token retrieval', async () => {
        Token.getOneByToken.mockRejectedValue(new Error('Mocked token error'));

        await authenticator(req, res, next);

        expect(Token.getOneByToken).toHaveBeenCalledWith('validTokenHere');
        expect(res.redirect).toHaveBeenCalledWith('/');
        expect(next).not.toHaveBeenCalled();
    });

    it('should redirect to "/" if an error occurs in user retrieval', async () => {
        // Mock valid token, but throw an error when retrieving the user
        const validTokenMock = {
            account_username: 'testUser',
            isExpired: jest.fn().mockResolvedValue(false),
        };

        Token.getOneByToken.mockResolvedValue(validTokenMock);
        User.getByUsername.mockRejectedValue(new Error('Mocked user error'));

        await authenticator(req, res, next);

        expect(Token.getOneByToken).toHaveBeenCalledWith('validTokenHere');
        expect(User.getByUsername).toHaveBeenCalledWith('testUser');
        expect(res.redirect).toHaveBeenCalledWith('/');
        expect(next).not.toHaveBeenCalled();
    });

    it('should redirect to "/" if user is not activated', async () => {
        const validTokenMock = {
            account_username: 'testUser',
            isExpired: jest.fn().mockResolvedValue(false),
        };

        const userMock = {
            isActivated: jest.fn().mockResolvedValue(false), // User is not activated
        };

        Token.getOneByToken.mockResolvedValue(validTokenMock);
        User.getByUsername.mockResolvedValue(userMock);

        await authenticator(req, res, next);

        expect(Token.getOneByToken).toHaveBeenCalledWith('validTokenHere');
        expect(validTokenMock.isExpired).not.toHaveBeenCalled();
        expect(User.getByUsername).toHaveBeenCalledWith('testUser');
        expect(userMock.isActivated).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith('/');
        expect(next).not.toHaveBeenCalled();
    });

    it('should redirect to "/" if token is expired', async () => {
        const validTokenMock = {
            account_username: 'testUser',
            isExpired: jest.fn().mockResolvedValue(true), // Token is expired
        };

        const mocked = {
            isActivated: jest.fn().mockResolvedValue(true), // User is activated
        };

        Token.getOneByToken.mockResolvedValue(validTokenMock);
        User.getByUsername.mockResolvedValue(mocked);

        await authenticator(req, res, next);

        expect(Token.getOneByToken).toHaveBeenCalledWith('validTokenHere');
        expect(validTokenMock.isExpired).toHaveBeenCalled();
        expect(User.getByUsername).toHaveBeenCalledWith('testUser');
        expect(mocked.isActivated).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith('/');
        expect(next).not.toHaveBeenCalled();
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
            boolParam: {type: 'boolean'},
            stringParam: {type: 'string'},
            intParam: {type: 'int'},
            positiveIntParam: {type: 'positiveInt'},
            stringWithMaxLengthParam: {type: 'stringWithMaxLength', maxLength: 5},
        };

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid boolean parameter', () => {
        const mockReq = {body: {boolParam: 'notABoolean'}};
        const parameterTypes = {boolParam: {type: 'boolean'}};

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'boolParam should be a boolean.'});
    });

    it('should return 400 for invalid string parameter', () => {
        const mockReq = {body: {stringParam: 42}};
        const parameterTypes = {stringParam: {type: 'string'}};

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'stringParam should be a string.'});
    });

    it('should return 400 for invalid int parameter', () => {
        const mockReq = {body: {intParam: 'notAnInt'}};
        const parameterTypes = {intParam: {type: 'int'}};

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'intParam should be a valid integer.'});
    });

    it('should return 400 for invalid positive int parameter', () => {
        const mockReq = {body: {positiveIntParam: -1}};
        const parameterTypes = {positiveIntParam: {type: 'positiveInt'}};

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'positiveIntParam should be a valid positive integer.'});
    });

    it('should return 400 for invalid string with max length parameter', () => {
        const mockReq = {body: {stringWithMaxLengthParam: 'tooLong'}};
        const parameterTypes = {stringWithMaxLengthParam: {type: 'stringWithMaxLength', maxLength: 5}};

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'stringWithMaxLengthParam should have a maximum length of 5 characters.'});
    });

    it('should return 400 for missing required parameter', () => {
        const mockReq = {body: {}};
        const parameterTypes = {requiredParam: {type: 'string'}};

        validateParameters(parameterTypes)(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({error: 'requiredParam is required.'});
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
        const mockReq = {path: '/validPath'};

        filter(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.redirect).not.toHaveBeenCalled();
    });

    it('should return 403 when the path has a forbidden extension', () => {
        const mockReq = {path: '/forbidden.html'};

        filter(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.redirect).toHaveBeenCalledWith('/');
    });
});

describe('Server URL Construction', () => {
    beforeEach(() => {
        jest.resetModules();
        process.env.ENV = 'production';
    });

    it('should construct the correct server URL with HTTPS protocol and custom port for production environment', () => {
        const serverUrl = require('../security/serverUrl');

        expect(serverUrl.protocol).toBe("https:");
    });
});

// Test for the middleware configuration in security/hardenedSecurityConfig.js
describe('Middleware Configuration', () => {
    let app;
    let server;

    const originalReadFileSync = fs.readFileSync;
    const originalCreateServer = https.createServer;

    beforeAll(() => {
        app = express();

        // Mock the readFileSync function
        fs.readFileSync = jest.fn(() => 'mocked_key');

        // Mock the createServer function
        https.createServer = jest.fn(() => ({
            listen: jest.fn(),
            close: jest.fn(),
        }));

        // Configure the server with middleware
        server = configureServer(app);
    });

    afterAll(() => {
        // Restore the original functions
        fs.readFileSync = originalReadFileSync;
        https.createServer = originalCreateServer;

        server.close();
    });

    // HTTPS server creation
    it('should create an HTTPS server with the correct credentials', () => {
        expect(fs.readFileSync).toHaveBeenCalledWith('security/certificates/private_key.pem', 'utf8');
        expect(fs.readFileSync).toHaveBeenCalledWith('security/certificates/certificate.pem', 'utf8');
        expect(https.createServer).toHaveBeenCalledWith(
            {key: 'mocked_key', cert: 'mocked_key'},
            app
        );
    });
});