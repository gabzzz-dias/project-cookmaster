const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);
const app = require('../api/app');
const { connection } = require('./connectionTest');
const { expect } = chai;

const expectedUser = {
  name: 'Uchiha Sasuke',
  email: 'uchiha@sasuke.com',
  password: 'sharingan'
};

const validUser = {
  name: 'Naruto',
  email: 'uzumaki@naruto.com',
  password: 'rasengan'
};

const invalidUser = {
  name: 'Naruto',
  email: 'uchiha@sasuke.com',
  password: 'rasengaan'
};

const invalidEmail = {
  name: 'Sasuke',
  email: 'uchiha@',
  password: 'sharingan'
};

describe('POST /users', () => {
  describe('if email is not valid', () => {
    let result;
    before(async () => result = await chai.request(app).post('/users').send(invalidEmail))
    it('returns status 400', () => expect(result).to.have.status(400));
    it('return an object', () => expect(result.body).to.be.an('object'));
    it('this object has a key "message"', () => expect(result.body).to.have.a.property('message'));
    it('"message" has a error message', () => expect(result.body.message).to.be.equal('Invalid entries. Try again.'));
  });

  describe('if the email already exists', () => {
    let connectionTest;
    let result;
      before(async() => {
      connectionTest = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connectionTest);
      await connectionTest.db('Cookmaster').collection('users').insertOne(expectedUser)
      result = await chai.request(app)
        .post('/users')
        .send(invalidUser);
    });
    after(async () => {
      MongoClient.connect.restore();
      await connectionTest.db('Cookmaster').collection('users').drop();
    })
    it('return status 409', () => expect(result).to.have.status(409));
    it('return an object', () => expect(result.body).to.be.an('object'));
    it('this object has a key "message"', () => expect(result.body).to.have.a.property('message'));
    it('"message" has a error message', () => expect(result.body.message).to.be.equal('Email already registered'));
  });

  describe('if some field arent entered', () => {
    let result;
    before(async () => result = await chai.request(app).post('/users').send({}))
    it('returns status 400', () => expect(result).to.have.status(400));
    it('return an object', () => expect(result.body).to.be.an('object'));
    it('this object has a key "message"', () => expect(result.body).to.have.a.property('message'));
    it('"message" has a error message', () => expect(result.body.message).to.be.equal('Invalid entries. Try again.'));
  });

  describe('if the user is added', () => {
    let connectionTest;
    let result;
      before(async() => {
      connectionTest = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connectionTest);
      await connectionTest.db('Cookmaster').collection('users').insertOne(expectedUser)
      result = await chai.request(app)
        .post('/users')
        .send(validUser);
    });
    after(async ()=>{
      MongoClient.connect.restore();
      await connectionTest.db('Cookmaster').collection('users').drop();
    })
    it('return status 201', () => expect(result).to.have.status(201));
    it('return an object', () => expect(result.body).to.be.an('object'));
    it('this object has a key "user"', () => expect(result.body).to.have.a.property('user'));
    it('"user" have name, email, role, and id keys ', () => {
      expect(result.body.user).to.have.a.property('_id');
      expect(result.body.user).to.have.a.property('role').equal('user');
      expect(result.body.user).to.have.a.property('name').equal(validUser.name);
      expect(result.body.user).to.have.a.property('email').equal(validUser.email);
    });
  });
});

describe('POST /login', () => {
  describe('when username and password are not entered', () => {
    let result;
    before(async () => result = await chai.request(app).post('/login').send({}))
    it('return status 401', () => expect(result).to.have.status(401))
    it('returns an object', () => expect(result.body).to.be.an('object'))
    it('this object has a key "message"', () => expect(result.body).to.have.a.property('message'))
    it('"message" have an error message', () => expect(result.body.message).to.be.equal('All fields must be filled'))
  });

  describe('if user is incorrect', () => {
    let connectionTest;
    let result;
    before(async() => {
      connectionTest = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connectionTest);
      result = await chai.request(app)
        .post('/login')
        .send(expectedUser);
    });
    after(() => MongoClient.connect.restore())
    it('return status 401', () => expect(result).to.have.a.status(401))
    it('returns an object', () => expect(result.body).to.be.an('object'))
    it('this object have a key "message"', () => expect(result.body).to.have.a.property('message'))
    it('"message" have an error message', () => expect(result.body.message).to.be.equal('Incorrect username or password'))
  });

  describe('if login is successful', () => {
    let connectionTest;
    let result;
      before(async() => {
      connectionTest = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connectionTest);
      await connectionTest.db('Cookmaster').collection('users').insertOne(expectedUser)
      result = await chai.request(app)
        .post('/login')
        .send(expectedUser);
    });
    after(async ()=>{
      MongoClient.connect.restore();
      await connectionTest.db('Cookmaster').collection('users').drop();
    })
    it('return status 200', () => expect(result).to.have.a.status(200))
    it('returns an object', () => expect(result.body).to.be.an('object'))
    it('this object have a key "token"', () => expect(result.body).to.have.an.property('token'))
  });
});
