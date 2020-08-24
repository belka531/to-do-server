process.env.NODE_ENV = "test"

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const db = require('../models');

let should = chai.should();

chai.use(chaiHttp);

/*
* Test the /POST element route
*/

before((done) => {
  db.sequelize.sync().then(() => {
    done();
  });
});

var firstId;
var secondId;

describe('/POST element', () => {
  it('should post the first element in todo list', (done) => {

    const element = {
      name: "First element"
    };

    chai.request(server)
      .post('/api/elements/')
      .send(element)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql(1);
        res.body.should.have.property('name').eql('First element');
        res.body.should.have.property('active').eql(true);
        firstId = res.body.id;
        done();
      });
  });

  it('should post the second element in todo list', (done) => {

    const element = {
      name: "Second element"
    };

    chai.request(server)
      .post('/api/elements/')
      .send(element)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql(2);
        res.body.should.have.property('name').eql('Second element');
        res.body.should.have.property('active').eql(true);
        secondId = res.body.id;
        done();
      });
  });
});

/*
* Test the /GET elements route
*/

describe('/GET elements', () => {
  it('should GET all the elements', (done) => {
    chai.request(server)
      .get('/api/elements/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        done();
      });
  });
});

// /*
// * Test the /PUT elements/id route
// */

describe('/PUT/:id element', () => {
  it('should UPDATE a element given the id', (done) => {
    chai.request(server)
      .put('/api/elements/' + firstId)
      .send({ "active": false })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Element was updated successfully.');
        done();
      });
  });
});


// /*
// * Test the /GET elements/active route
// */

  describe('/GET elements/active elements', () => {
    it('should GET a element given the id', (done) => {
      chai.request(server)
        .get('/api/elements/active')
        .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
    });
  });

// /*
// * Test the /GET elements/completed route
// */

describe('/GET elements/completed elements', () => {
  it('should GET a element given the id', (done) => {
    chai.request(server)
      .get('/api/elements/completed')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
  });
});

// /*
// * Test the /DELETE/:id route
// */

  describe('/DELETE/:id element', () => {
    it('should DELETE a element given the id', (done) => {
        chai.request(server)
          .delete('/api/elements/' + secondId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Element was deleted successfully!');
            done();
      });
    });
  });

// /*
// * Test the /DELETE elements route
// */

describe('/DELETE all element', () => {
  it('should DELETE a element given the id', (done) => {
    chai.request(server)
      .delete('/api/elements/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Element was deleted successfully!');
        done();
      });
  });
});
