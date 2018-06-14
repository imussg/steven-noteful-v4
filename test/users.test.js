const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { TEST_MONGODB_URI } = require('../config');

const User = require('../models/user');

chai.use(chaiHttp);
const expect = chai.expect;

describe.only('Noteful API - Users', function () {
  
  const username = 'exampleUser';
  const password = 'examplePass';
  const fullname = 'Example User';

  before(function () {
    return mongoose.connect(TEST_MONGODB_URI)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function () {
    return User.createIndexes();
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });
  
  describe('/api/users', function () {
    describe('POST', function () {
      // it('Should create a new user', function () {
      //   const testUser = { username, password, fullname };

      //   let res;
      //   return chai
      //     .request(app)
      //     .post('/api/users')
      //     .send(testUser)
      //     .then(_res => {
      //       res = _res;
      //       expect(res).to.have.status(201);
      //       expect(res.body).to.be.an('object');
      //       expect(res.body).to.have.keys('id', 'username', 'fullname');

      //       expect(res.body.id).to.exist;
      //       expect(res.body.username).to.equal(testUser.username);
      //       expect(res.body.fullname).to.equal(testUser.fullname);

      //       return User.findOne({ username });
      //     })
      //     .then(user => {
      //       expect(user).to.exist;
      //       expect(user.id).to.equal(res.body.id);
      //       expect(user.fullname).to.equal(testUser.fullname);
      //       return user.validatePassword(password);
      //     })
      //     .then(isValid => {
      //       expect(isValid).to.be.true;
      //     });
      // });
      // it('Should reject users with missing username', function () {
      //   const testUser = { password, fullname };
      //   return chai.request(app).post('/api/users').send(testUser)
      //     .then(res => {
      //       expect(res).to.have.status(422);
      //       expect(res).to.be.json;
      //       expect(res.body).to.be.a('object');
      //       expect(res.body.message).to.equal(`Missing 'username' in request body`);
      //     });
      // });

      // /**
      //  * STUDENT FILLED TESTS
      //  */
      // it('Should reject users with missing password', function() {
      //   const testUser = { username, fullname };
      //   return chai.request(app).post('/api/users').send(testUser)
      //     .then(res => {
      //       expect(res).to.have.status(422);
      //       expect(res).to.be.json;
      //       expect(res.body).to.be.a('object');
      //       expect(res.body.message).to.equal(`Missing 'password' in request body`);
      //     });
      // });
      // it('Should reject users with non-string username', function() {
      //   const testUser = { username: 12345, fullname, password };
      //   return chai.request(app).post('/api/users').send(testUser)
      //     .then(res => {
      //       expect(res).to.have.status(422);
      //       expect(res).to.be.json;
      //       expect(res.body).to.be.a('object');
      //       expect(res.body.message).to.equal(`Field: 'username' must be type String`);
      //     });
      // });
      // it('Should reject users with non-string password', function() {
      //   const testUser = { username, fullname, password: 12345 };
      //   return chai.request(app).post('/api/users').send(testUser)
      //     .then(res => {
      //       expect(res).to.have.status(422);
      //       expect(res).to.be.json;
      //       expect(res.body).to.be.a('object');
      //       expect(res.body.message).to.equal(`Field: 'password' must be type String`);
      //     });
      // });
      // it('Should reject users with non-trimmed username', function() {
      //   const testUser = { username: ` ${username} `, fullname, password };
      //   return chai.request(app).post('/api/users').send(testUser)
      //     .then(res => {
      //       expect(res).to.have.status(422);
      //       expect(res).to.be.json;
      //       expect(res.body).to.be.a('object');
      //       expect(res.body.message).to.equal(`Field: 'username' cannot start or end with whitespace`);
      //     });
      // });
      // it('Should reject users with non-trimmed password', function() {
      //   const testUser = { username, fullname, password: ` ${password} ` };
      //   return chai.request(app).post('/api/users').send(testUser)
      //     .then(res => {
      //       expect(res).to.have.status(422);
      //       expect(res).to.be.json;
      //       expect(res.body).to.be.a('object');
      //       expect(res.body.message).to.equal(`Field: 'password' cannot start or end with whitespace`);
      //     });
      // });
      // it('Should reject users with empty username', function() {
      //   const testUser = { username: '', fullname, password };
      //   return chai.request(app).post('/api/users').send(testUser)
      //     .then(res => {
      //       expect(res).to.have.status(422);
      //       expect(res).to.be.json;
      //       expect(res.body).to.be.a('object');
      //       expect(res.body.message).to.equal(`Field: 'username' must be at least 1 characters long`);
      //     });
      // });
      // it('Should reject users with password less than 8 characters', function() {
      //   const testUser = { username, fullname, password: '1234' };
      //   return chai.request(app).post('/api/users').send(testUser)
      //     .then(res => {
      //       expect(res).to.have.status(422);
      //       expect(res).to.be.json;
      //       expect(res.body).to.be.a('object');
      //       expect(res.body.message).to.equal(`Field: 'password' must be at least 8 characters long`);
      //     });
      // });
      // it('Should reject users with password greater than 72 characters', function() {
      //   const tooLarge = 'asdfghjktasdfghjktasdfghjktasdfghjktasdfghjktasdfghjktasdfghjktasdfghjkt12345';
      //   const testUser = { username, fullname, password: tooLarge };
      //   return chai.request(app).post('/api/users').send(testUser)
      //     .then(res => {
      //       expect(res).to.have.status(422);
      //       expect(res).to.be.json;
      //       expect(res.body).to.be.a('object');
      //       expect(res.body.message).to.equal(`Field: 'password' must be at most 72 characters long`);
      //     });
      // });
      // it.only('Should reject users with duplicate username', function() {
      //   const obj1 = {username, fullname: `${fullname}s`, password: `${password}123`};
      //   const obj2 = {username, fullname, password};

      //   return chai.request(app).post('/api/users').send(obj1)
      //     .then(res => {
      //       return chai.request(app).post('/api/users').send(obj2)
      //         .then(res => {
      //           expect(res).to.have.status(400);
      //           expect(res).to.be.json;
      //           expect(res.body).to.be.a('object');
      //           expect(res.body.message).to.equal('The username already exists');
      //         });
      //     });
      // });
      it.only('Should trim fullname', function() {
        const nameSpaces = '  ' + fullname + '   ';
        const testUser = { username, password, fullname: nameSpaces };

        let createdUser;

        return chai.request(app).post('api/users').send(testUser)
          .then(res => {
            createdUser = res.body;
            expect(createdUser["fullname"]).to.equal(fullname);
          });

      });
    });

    describe('GET', function () {
      it('Should return an empty array initially', function () {
        return chai.request(app).get('/api/users')
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(0);
          });
      });
      it('Should return an array of users', function () {
        
        const testUser0 = {
          username: `${username}`,
          password: `${password}`,
          fullname: ` ${fullname} `
        };
        const testUser1 = {
          username: `${username}1`,
          password: `${password}1`,
          fullname: `${fullname}1`
        };
        const testUser2 = {
          username: `${username}2`,
          password: `${password}2`,
          fullname: `${fullname}2`
        };

        /**
         * CREATE THE REQUEST AND MAKE ASSERTIONS
         */
        Promise.all([
          User.insertMany([testUser0, testUser1, testUser2]),
          User.createIndexes()
        ]);
        return chai.request(app).get('/api/users')
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.a('array');

            const expectedKeys = ['id', 'username', 'fullname'];
            res.body.forEach(user => {
              expect(user).to.be.a('object');
              expect(user).to.have.keys(expectedKeys);
            });
          });
      });
    });
  });
});