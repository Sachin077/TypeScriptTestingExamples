///<reference path="../typings/tsd.d.ts" />
///<reference path="../source/interfaces.d.ts" />

import MathDemo = require("../source/math_demo");

// Here we will write some test for the demos in the source
// directory using a TDD style.TBDD style assertions are
// provided by assert() which use a chainable language to
// construct assertions.

var assert = chai.assert; // http://chaijs.com/guide/styles/#assert

// in theory in tdd we should use suite() not describe() but it
// is missing from the mocha types definitions file
describe('Test Suite \n', () => {

  // setup() is invoked once before ALL tests
  setup(function(){
    console.log("setup() invoked!");
  });

  // teardown() invoked once after ALL tests
  teardown(function(){
    console.log("teardown() invoked!");
  });

  // suiteSetup() is invoked once before EACH test
  suiteSetup(function(){
    console.log("suiteSetup() invoked!");
  });

  // suiteTeardown() is invoked once before EACH test
  suiteTeardown(function(){
    console.log("suiteTeardown() invoked!");
  });

  // in theory in tdd we should use test() not it() but
  // it is missing from the mocha types definitions file
  it('Unit Test \n', (done) => {
    var math = new MathDemo();
    assert.typeOf(math.PI, 'number');
    assert.equal(math.PI, 3.14159265359);
    done();
  });

  it('should return the correct numeric value for pow \n', () => {
    var math : MathInterface = new MathDemo();
    var result = math.pow(2, 3);
    var expected = 8;
    assert.typeOf(result, 'number');
    assert.equal(result, expected);
  });

  // to test asyn code we need to invoke done() when the execution is completed
  it('should return the correct numeric value for pow (async) \n', (done) => {
    var math : MathInterface = new MathDemo();
    math.powAsync(2, 3, function(result){
      var expected = 8;
      assert.typeOf(result, 'number');
      assert.equal(result, expected);
      done(); // invoke done() inside your call back or fullfiled promises
    });
  });

  // When testing async code mocha will let us know if a function takes to long
  // to finish its execution. There are 3 levels of warning
  // 1. >   40ms low warning
  // 2. >  100ms warning
  // 3. > 2000ms fatal error (execution of test will not continue)

  // Is slow and we will get a warning
  it('should return the correct numeric value for pow (async) in slow networks\n', (done) => {
    var math : MathInterface = new MathDemo();
    math.powAsyncSlow(2, 3, function(result){
      var expected = 8;
      assert.typeOf(result, 'number');
      assert.equal(result, expected);
      done(); // invoke done() inside your call back or fullfiled promises
    });
  });

  // Is really slow and we will get a warning
  it('should return the correct numeric value for pow (async) in really slow networks\n', (done) => {
    var math : MathInterface = new MathDemo();
    math.powAsyncReallySlow(2, 3, function(result){
      var expected = 8;
      assert.typeOf(result, 'number');
      assert.equal(result, expected);
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
      assert.typeOf(result, 'number');
      assert.equal(result, expected);
      done(); // invoke done() inside your call back or fullfiled promises
    });
  });
  */
});
