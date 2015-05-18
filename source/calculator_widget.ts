///<reference path="./interfaces.d.ts" />

class CalculatorWidget implements CalculatorWidgetInterface{

 private _math : MathInterface;
 private _dom : any;

 constructor(math : MathInterface) {
   if(math == null) throw new Error("Argument null exception!");
   this._math = math;
   this._dom = {};
 }

 public render(id : string) {
   $(id).html(template);
   this._dom.$base = $("#base");
   this._dom.$exponent = $("#exponent");
   this._dom.$result = $("#result");
   this._dom.$btn = $("#submit");

   this._dom.$btn.on("click", (e) => {
     this.onSubmit();
   });
 }

 public onSubmit() {
   var base = parseInt(this._dom.$base.val());
   var exponent = parseInt(this._dom.$exponent.val());

   if(isNaN(base) || isNaN(exponent)) {
     alert("Base and exponent must be a number!");
   }
   else {
     this._dom.$result.val(this._math.pow(base, exponent));
   }
 }
}

// normally we will use a template system
var template = '<div class="well">' +
  '<div class="row">' +
    '<div class="col-md-3">' +
      '<div class="form-group">' +
        '<label>Base</label>' +
        '<input type="text" class="form-control" id="base" placeholder="0">' +
        '</div>' +
      '</div>' +
    '<div class="col-md-3">' +
      '<div class="form-group">' +
        '<label>Exponent</label>' +
          '<input type="text" class="form-control" id="exponent" placeholder="0">' +
        '</div>' +
      '</div>' +
    '<div class="col-md-3">' +
      '<div class="form-group">' +
        '<label>Result</label>' +
          '<input type="text" class="form-control" id="result" placeholder="1" disabled="disabled">' +
        '</div>' +
      '</div>' +
    '<div class="col-md-3">' +
      '<div class="form-group">' +
        '<button id="submit" type="submit" class="btn btn-primary">Submit</button>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</div>';

export = CalculatorWidget;
