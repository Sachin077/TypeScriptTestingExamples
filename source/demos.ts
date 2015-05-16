// This file contains some classes that are not related
// they are just delcared in order to have some code that we
// can test.

import MathDemo = require("./math_demo");
import CalculatorWidget = require("./calculator_widget");

var math = new MathDemo();
var calculator = new CalculatorWidget(math);
(<any>window).calculator = calculator;
calculator.initialize();
