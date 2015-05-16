///<reference path="./interfaces.d.ts" />

class MathDemo implements MathInterface{
  public PI : number;

  constructor() {
    this.PI = 3.14159265359;
  }

  public pow(base: number, exponent: number) {
    var result = base;
    for(var i = 1; i < exponent; i++){
      result = result * base;
    }
    return result;
  }
  public powAsync(base: number, exponent: number, cb : (result : number) => void) {
    var result = this.pow(base, exponent);
    cb(result);
  }
  public powAsyncSlow(base: number, exponent: number, cb : (result : number) => void) {
    setTimeout(() => { // simulate slow
      var result = this.pow(base, exponent);
      cb(result);
    }, 45);
  }
  public powAsyncReallySlow(base: number, exponent: number, cb : (result : number) => void) {
    var result = base ^ exponent;
    setTimeout(() => { // simulate reqlly slow
      var result = this.pow(base, exponent);
      cb(result);
    }, 101);
  }
  public powAsyncTooSlow(base: number, exponent: number, cb : (result : number) => void) {
    var result = base ^ exponent;
    setTimeout(() => { // simulate too slow
      var result = this.pow(base, exponent);
      cb(result);
    }, 2001);
  }
}

export = MathDemo;
