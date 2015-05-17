///<reference path="../typings/tsd.d.ts" />
///<reference path="../source/interfaces.d.ts" />

import MathDemo = require("../source/math_demo");

// Here we will write some test for the demos in the source
// directory using a BDD style. BDD style assertions are
// provided by expect() and should() which use a chainable
// language to construct assertions. The should() has
// function has some issues when used Internet Explorer,
// so it will not be used in this demo.

var expect = chai.expect; // http://chaijs.com/guide/styles/#expect

// describe() is used to declare a test suite
describe('BDD test example for MathDemo class \n', () => {

  // before() is invoked once before ALL tests
  before(function(){
    console.log("before() invoked!");
  });

  // after() invoked once after ALL tests
  after(function(){
    console.log("after() invoked!");
  });

  // beforeEach() is invoked once before EACH test
  beforeEach(function(){
    console.log("beforeEach() invoked!");
  });

  // afterEach() is invoked once before EACH test
  afterEach(function(){
    console.log("afterEach() invoked!");
  });

  // if() a single test containing one or more assetion
  it('should return the correct numeric value for PI \n', () => {
    var math : MathInterface = new MathDemo();
    expect(math.PI).to.equals(3.14159265359);
    expect(math.PI).to.be.a('number');
  });

  it('should return the correct numeric value for pow \n', () => {
    var math : MathInterface = new MathDemo();
    var result = math.pow(2, 3);
    var expected = 8;
    expect(result).to.be.a('number');
    expect(result).to.equal(expected);
  });

  // to test asyn code we need to invoke done() when the execution is completed
  it('should return the correct numeric value for pow (async) \n', (done) => {
    var math : MathInterface = new MathDemo();
    math.powAsync(2, 3, function(result) {
      var expected = 8;
      expect(result).to.be.a('number');
      expect(result).to.equal(expected);
      done(); // invoke done() inside your call back or fullfiled promises
    });
  });

  // When testing async code mocha will let us know if a function takes to long
  // to finish its execution. There are 3 levels of warning
  // 1. >   40ms low warning
  // 2. >  100ms warning
  // 3. > 2000ms fatal error (execution of test will not continue)

  // Is slow and we will get a warning 40ms
  it('should return the correct numeric value for pow (async) in slow networks\n', (done) => {
    var math : MathInterface = new MathDemo();
    math.powAsyncSlow(2, 3, function(result){
      var expected = 8;
      expect(result).to.be.a('number');
      expect(result).to.equal(expected);
      done(); // invoke done() inside your call back or fullfiled promises
    });
  });

  // Is really slow and we will get a warning 100ms
  it('should return the correct numeric value for pow (async) in really slow networks\n', (done) => {
    var math : MathInterface = new MathDemo();
    math.powAsyncReallySlow(2, 3, function(result){
      var expected = 8;
      expect(result).to.be.a('number');
      expect(result).to.equal(expected);
      done(); // invoke done() inside your call back or fullfiled promises
    });
  });
  /*
  // this function takes over 2000ms to complete and
  // will thereofore stop the test execution
  it('too slow will cause build to fail\n', (done) => {
    var math : MathInterface = new MathDemo();
    math.powAsyncTooSlow(2, 3, function(result){
      var expected = 8;
      expect(result).to.be.a('number');
      expect(result).to.equal(expected);
      done(); // invoke done() inside your call back or fullfiled promises
    });
  });
  */

  // how to test for errors
  it('should throw an exception \n', (done) => {
    var math : MathInterface = new MathDemo();
    expect(math.bad).to.throw(Error);
  });


});
