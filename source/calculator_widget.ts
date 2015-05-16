///<reference path="./interfaces.d.ts" />

class CalculatorWidget {

 private _math : MathInterface;
 private _dom : any;

 constructor(math : MathInterface) {

   if(math == null) throw new Error("Argument null exception!");
   this._math = math;

   this._dom = {
     base : HTMLInputElement,
     exponent : HTMLInputElement,
     result : HTMLInputElement,
     btn : HTMLButtonElement
   };

   this._dom.base = (<HTMLInputElement>document.getElementById("base"));
   this._dom.exponent = (<HTMLInputElement>document.getElementById("exponent"));
   this._dom.result = (<HTMLInputElement>document.getElementById("result"));
   this._dom.btn = (<HTMLButtonElement>document.getElementById("submit"));
 }

 initialize() {
  this._dom.btn.addEventListener("click", (e) => {
    this.onSubmit();
  });
 }

 onSubmit() {
   var base = parseInt(this._dom.base.value);
   var exponent = parseInt(this._dom.exponent.value);

   if(isNaN(base) || isNaN(exponent)) {
     alert("Base and exponent must be a number!");
   }
   else {
     this._dom.result.value = this._math.pow(base, exponent);
   }
 }
}

export = CalculatorWidget;
