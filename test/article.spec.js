const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');

chai.use(chaiHttp);

describe('Teamwork', () => {
    let token, articleid;
    const userCredentials = {
        email: 'psalmueloye@gmail.com',
        password: 'adebayo123!'
    };
    describe('POST/articles', () => {
        before((done) => {
            chai.request(server).post('api/vi/auth/signin').send(userCredentials).end((error, response) => {
                const { data } = response.body;
            })
        })
    })
})