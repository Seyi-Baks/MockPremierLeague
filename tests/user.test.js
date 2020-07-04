const request = require('supertest');
const dbHandler = require('./db.handler');

const app = require('../index');

const USER_SIGNUP_API = '/api/v1/auth/register';
const USER_LOGIN_API = '/api/v1/auth/login';

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.

afterEach(async () => await dbHandler.clearDatabase());
 */

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase;
});

describe('User signup test', () => {
  it('Should Sign Up User and Return A User Object', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: 'Bakare',
      email: 'admin@gmail.com',
      password: 'golden',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(typeof res.body).toBe('object');
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data).toHaveProperty('firstName');
    expect(res.body.data).toHaveProperty('lastName');
    expect(res.body.data).toHaveProperty('email');
    expect(res.body.data).toHaveProperty('password');
    expect(res.body.data).toHaveProperty('userType');
    expect(res.body.data).toHaveProperty('status');
  });

  it('User type should be admin if userType is set to 1', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: 'Bakare',
      email: 'test@gmail.com',
      password: 'golden',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(typeof res.body).toBe('object');
    expect(res.body.data.userType).toEqual('ADMIN');
  });

  it('User type should be user if userType is set to 0', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: 'Bakare',
      email: 'user@gmail.com',
      password: 'golden',
      userType: 0,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(typeof res.body).toBe('object');
    expect(res.body.data.userType).toEqual('USER');
  });

  it('Should not register user when the email is missing', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: 'Bakare',
      password: 'golden',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe('email is required');
  });

  it('Should not register user if email is null or empty', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: 'Bakare',
      email: '',
      password: 'golden',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe('email is not allowed to be empty');
  });

  it('Should not register user when the first name is missing', async () => {
    const newUser = {
      lastName: 'Bakare',
      email: 'test@gmail.com',
      password: 'golden',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe('firstName is required');
  });

  it('Should not register user if firstName is null or empty', async () => {
    const newUser = {
      firstName: '',
      lastName: 'Bakare',
      email: 'test@gmail.com',
      password: 'golden',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe('firstName is not allowed to be empty');
  });

  it('Should not register user when the last name is missing', async () => {
    const newUser = {
      firstName: 'Seyi',
      email: 'test@gmail.com',
      password: 'golden',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe('lastName is required');
  });

  it('Should not register user if lastName is null or empty', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: '',
      email: 'test@gmail.com',
      password: 'golden',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe('lastName is not allowed to be empty');
  });

  it('Should not register user when the user type is missing', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: 'Bakare',
      email: 'test@gmail.com',
      password: 'golden',
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe(
      'userType must be either 0 - User or 1 - Admin'
    );
  });

  it('Should not register user if user type is null or empty', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: 'Bakare',
      email: 'test@gmail.com',
      password: 'golden',
      userType: null,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe(
      'userType must be either 0 - User or 1 - Admin'
    );
  });

  it('Should not register user when the password is missing', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: 'Bakare',
      email: 'test@gmail.com',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe('password is required');
  });

  it('Should not register user if password is null or empty', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: 'Bakare',
      email: 'test@gmail.com',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe('password is required');
  });

  it('Should not register user if email is invalid', async () => {
    const newUser = {
      firstName: 'Seyi',
      lastName: 'Bakare',
      email: 'test@.com',
      password: 'golden',
      userType: 1,
    };

    const res = await request(app).post(USER_SIGNUP_API).send(newUser);

    expect(res.body.error).toBe('email must be a valid email');
  });
});

describe('User login test', () => {
  it('Should return an object if authentication is successful', async () => {
    const user = {
      email: 'admin@gmail.com',
      password: 'golden',
    };

    const res = await request(app).post(USER_LOGIN_API).send(user);

    expect(res.body.data).toHaveProperty('token');
  });

  it('Should return an error if details are incorrect', async () => {
    const user = {
      email: 'john.smith@gmail.com',
      password: 'password',
    };

    const res = await request(app).post(USER_LOGIN_API).send(user);

    expect(res.body.message).toEqual('Error: Invalid user credentials');
  });

  it('Should return an error if email is empty or null', async () => {
    const user = {
      email: '',
      password: 'password',
    };

    const res = await request(app).post(USER_LOGIN_API).send(user);

    expect(res.body.error).toEqual('email is not allowed to be empty');
  });

  it('Should return an error if password is empty or null', async () => {
    const user = {
      email: 'john.smith@gmail.com',
      password: '',
    };

    const res = await request(app).post(USER_LOGIN_API).send(user);

    expect(res.body.error).toEqual('password is not allowed to be empty');
  });

  it('Tests for admin login', async () => {
    const user = {
      email: 'admin@gmail.com',
      password: 'golden',
    };

    const res = await request(app).post(USER_LOGIN_API).send(user);

    expect(res.body.message.userType).toBe('ADMIN');
  });

  it('Tests for user login', async () => {
    const user = {
      email: 'user@gmail.com',
      password: 'golden',
    };
    const res = await request(app).post(USER_LOGIN_API).send(user);

    expect(res.body.message.userType).toBe('USER');
  });
});
