function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function operate(operator,a,b){
    switch (operator) {
        case 'add':
            return add(a,b);
        case 'subtract':
            return subtract(a,b);
        case 'multiply':
            return multiply(a,b);
        case 'divide':
            return divide(a,b);
        default:
            break;
    }
}

function keyPress(e){
    const btnPress = document.querySelector(`button[data-btn="${e.key}"]`);
    if (btnPress) {
        btnPress.click();
        //console.log(e.key);
    }
}

function keyClick(e){
    if (resetFlag) {
        clearDisplay();
        resetFlag = false;
        if (!needFirstNumber && !needSecondNumber) {
            clearAll();
        }
    }
    const keyPressed = e.target.dataset.btn;
    display.innerHTML += keyPressed;
}

function operatorClick(e){
    if (needFirstNumber && needSecondNumber) {
        equation.firstNumber = parseInt(display.innerHTML);
        needFirstNumber = false;
        resetFlag = true;
        equation.operator = e.target.dataset.operator;
        if (!equation.firstNumber) {
            clearAll();
        }
    } else if (!needFirstNumber && needSecondNumber) {
        if (parseInt(display.innerHTML) == 0 && equation.operator == 'divide') {
            clearAll();
            display.innerHTML = 'nice try!'
            resetFlag = true;
        } else {
            const answer = operate(equation.operator, equation.firstNumber, parseInt(display.innerHTML));
            equation.operator = e.target.dataset.operator;
            display.innerHTML = answer.toString().substring(0,10);
            equation.firstNumber = answer;
            resetFlag = true;
        }
    } else if (!needFirstNumber && !needSecondNumber) {
        equation.operator = e.target.dataset.operator;
        needSecondNumber = true;
    }
}

function clearDisplay(){
    display.innerHTML = '';
}

function equalsClick(){
    if (needFirstNumber && needSecondNumber) {

    } else if (!needFirstNumber && needSecondNumber) {
        if (parseInt(display.innerHTML) == 0 && equation.operator == 'divide') {
            clearAll();
            display.innerHTML = 'nice try!'
            resetFlag = true;
        } else {
            equation.secondNumber = parseInt(display.innerHTML);
            const answer = operate(equation.operator, equation.firstNumber, equation.secondNumber);
            needSecondNumber = false;
            display.innerHTML = answer.toString().substring(0,10);
            equation.firstNumber = answer;
            resetFlag = true;
        }
    } else if (!needFirstNumber && !needSecondNumber) {
        const answer = operate(equation.operator, equation.firstNumber, equation.secondNumber);
        display.innerHTML = answer.toString().substring(0,10);
        equation.firstNumber = answer;
        resetFlag = true;
    }
}

function clearAll(){
    clearDisplay();
    equation.resetEquation();
    needFirstNumber = true;
    needSecondNumber = true;
}

const calcNumbers = document.querySelectorAll('.calculator-number');
const calcOperators = document.querySelectorAll('.calculator-operator');
const equalsButton = document.querySelector('.calculator-equals');
const clearButton = document.querySelector('.calculator-clear');
const display = document.querySelector('.display-text');

let resetFlag = false;

let needFirstNumber = true;
let needSecondNumber = true;

let equation = {
    operator: undefined,
    firstNumber: undefined,
    secondNumber: undefined,
    resetEquation: function() {
        this.operator = undefined;
        this.firstNumber = undefined;
        this.secondNumber = undefined;
    }
}


calcNumbers.forEach(button => button.addEventListener('click', keyClick));
calcOperators.forEach(button => button.addEventListener('click', operatorClick));
equalsButton.addEventListener('click', equalsClick);
clearButton.addEventListener('click', clearAll);

window.addEventListener('keydown', keyPress);