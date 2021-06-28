let a = 0;
let b = null;
let operation = null;
let result = null;
let aChanged = false;

const screen = document.getElementById('screen');
screen.innerText = a;

const numbers = Array.from(document.querySelectorAll('.number'));
numbers.forEach(number => number.addEventListener("click", numberEntry));

const operators = Array.from(document.querySelectorAll('.operator'));
operators.forEach(operator => operator.addEventListener("click", operatorEntry));

window.addEventListener("keydown", keyboardInput);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("delete").addEventListener("click", deleteEntry);
document.getElementById("decimal").addEventListener("click", decimalEntry);
document.getElementById("enter").addEventListener("click", evaluate)

function keyboardInput(e) {
	if (e.key >= 0 && e.key <= 9) {
		if (screen.innerText === '0') screen.innerText = e.key;
		else if (operation != null) screen.innerText = e.key;
		else screen.innerText = screen.innerText.concat(e.key);
	}
	if (e.key === ".") decimalEntry();
	if (e.key === "Escape") clear();
	if (e.key === "Escape") deleteEntry();
	if (e.key === "Enter" || e.key === '=') evaluate();
	if (e.key === "/") {
		operation = e.key;
		a = screen.innerText;
    aChanged = true;
	}
	if (e.key === "*") {
		operation = e.key;
		a = screen.innerText;
    aChanged = true;
	}
	if (e.key === "+") {
		operation = e.key;
		a = screen.innerText;
    aChanged = true;
	}
	if (e.key === "-") {
		operation = e.key;
		a = screen.innerText;
    aChanged = true;
	}
}

function add(a, b) {
	return a+b;
}

function subtract(a, b) {
	return a-b;
}

function multiply(a, b) {
	return Math.round(a*b*100000)/100000;
}

function divide(a, b) {
	return Math.round(a/b*100000)/100000;
}

function operate(a, b, operation) {
	if(operation === "+") return add(a,b);
	else if (operation === "-") return subtract(a,b);
	else if (operation === "*") return multiply(a,b);
	else if (operation === "/") return divide(a,b);
}

function numberEntry() {
	if (screen.innerText === '0') {
		screen.innerText = this.value;
	}
	else if (operation != null) {
		screen.innerText = this.value;
	}
	else screen.innerText = screen.innerText.concat(this.value);
}

function clear() {
	a = 0;
	b = null;
	operation = null;
	screen.innerText = a;
  aChanged = false;
}

function operatorEntry() {
	operation = this.value;
	a = screen.innerText;
  aChanged = true;
}

function decimalEntry() {
	if (screen.innerText.indexOf('.') === -1) {
		screen.innerText = screen.innerText.concat('.');
	}
}

function evaluate() {
  if (aChanged == false) {
    result = operate(Number(a), Number(b), operation);
    screen.innerText = result;
    a = result;
  }
  else {
  	b = screen.innerText;
  	if (b==='' || operation==null) {
  		clear();
  		alert("Operands or operator is missing");
  	}
  	else if (b === '0' && operation === '/') {
  		clear();
  		alert("Cannot divide by 0");
  	}
  	else {
  		result = operate(Number(a), Number(b), operation);
  		screen.innerText = result;
      a = result;
      aChanged = false;
    }
	}
}

function deleteEntry() {
	screen.innerText = screen.innerText.slice(0, -1);
	if (screen.innerText === '') {
		screen.innerText = '0';
	}
}