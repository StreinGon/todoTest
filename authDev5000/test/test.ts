const chaiS = require('chai');
const server = require('../bin/www').default;
const chaiHttp = require('chai-http');
const expect = chaiS.expect
const should = chaiS.should();

const { UserModel } = require('../models/user');
const { CategoryModel } = require('../models/category');
const { ImageModel } = require('../models/image');
const { PriorityModel } = require('../models/priority');
const { SharedTodosModel } = require('../models/sharedTodos');
const { TodoModel } = require('../models/todo');
const { RoleModel } = require('../models/role');
chaiS.use(chaiHttp);

describe('/POST registration', () => {
    beforeEach((done) => {
        UserModel.remove({}, (err) => { });
        SharedTodosModel.remove({}, (err) => { });
        CategoryModel.remove({}, (err) => { });
        PriorityModel.remove({}, (err) => { });
        TodoModel.remove({}, (err) => { });
        RoleModel.remove({}, (err) => { });
        done();
    });
    it('it should reg new user', (done) => {
        const user = {
            username: "tester",
            password: "123456",
            mail: "mail@mail.com"
        }
        chaiS.request(server)
            .post('/reg')
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                res.body.should.be.a('object');
                done();
            });

    });
});
describe('/POST login', () => {
    it('it should login user', (done) => {
        const user = {
            username: "tester",
            password: "123456",
            mail: "mail@mail.com"
        }
        chaiS.request(server)
            .post('/login')
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);

                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.should.have.property('message');
                done();
            });

    });
});
describe('/GET all todo', () => {
    let token = null;

    beforeEach(function (done) {
        chaiS.request(server)
            .post('/login')
            .send({
                username: "tester",
                password: "123456",
                mail: "mail@mail.com"
            })

            .end(function (err, res) {
                expect(res.status).to.be.equal(200);
                token = res.body.data.token;
                done();
            });
    });
    it('it should get all todos of user', (done) => {
        chaiS.request(server)
            .get('/todos')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                res.body.should.have.property('data');
                res.body.should.have.property('message');
                res.body.should.be.a('object');
                done();
            });

    });
});