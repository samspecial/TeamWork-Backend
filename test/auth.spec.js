// import { createLogin } from '../controllers/adminController';

const chai = require('chai');
const chaiHttp = require('chai-http');
// const pool = require('../config')
// require('dotenv').config();
const should = chai.should();
// const assert = require('assert');
const serve = require('../app');

chai.use(chaiHttp);


describe('Teamwork', () => {
    describe('POST /create-user', () => {

        it('it should create an employee user account', (done) => {
            const data = {
                firstname: 'Samuelson',
                lastname: 'Egbekunle',
                email: 'jobagblis@gmail.com',
                password: 'supersest',
                gender: 'Male',
                jobrole: 'Software Developer',
                department: 'Information Technology',
                address: 'Ikoyi Street, Lagos',

            };
            chai
                .request(serve)
                .post('/api/v1/auth/create-user')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('status').eql('Success');
                    done();
                });
        });
    });

    describe('POST /signin', () => {
        it('it should allow user to sign in', (done) => {
            const data = {
                email: 'jobagblis@gmail.com',
                password: 'supersest',
            };

            chai
                .request(serve)
                .post('/api/v1/auth/signin')
                .send(data)
                .end((error, results) => {
                    results.should.have.status(200);
                    results.body.should.have.property('status').equal('Signin Successful');
                    done();
                });
        });
        it('It should reject unregistered user', (done) => {
            const data = {
                email: "agbado@gmail.com",
                password: "ologunboy"
            };
            chai
                .request(serve)
                .post('/api.v1/auth/signin')
                .send(data)
                .end((err, results) => {
                    results.should.have.status(404);
                    results.body.should.have.property('message').equal('Password Mismatch');
                    done();
                    console.log(status)
                });
        });
        // it('It should reject unregistered user', () => {
        //     const data = {
        //         email: "agbado@gmail.com",
        //         pasword: "ologunboy"
        //     };
        //     return createLogin(data).then(() => {
        //         assert.fail('User details not regiatered')
        //     }, error => {
        //         assert.equal(error.message, 'You have to be registered')
        //     })
        // })
    });
});
