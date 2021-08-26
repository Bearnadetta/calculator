let displayContent = [];
let aValue = [];
let bValue = [];
let opValue = '';
const display = document.getElementById('display');

const pressDec = function() {
    if((displayContent.length < 10) && !(displayContent.includes('.'))) {
        displayContent.push('.')
        display.textContent = displayContent.join('');
    }
};
const pressNum = function(e) {
    if(displayContent.length < 10) {
        displayContent.push(e);
       display.textContent = displayContent.join('');
    }
};

const pressOperator = function(e) {
    let subA = bValue;
    let subB = displayContent;
    if((subA.length > 0) && (subB.length > 0) && opValue) {
        pressEquals();
    }
    aValue = bValue;
    bValue = displayContent;
    display.textContent = displayContent.join('');
    displayContent = [];
    opValue = e;
}
const pressEquals = function() {
    let storedA = bValue;
    let storedB = displayContent;
    if((storedA.length == 0) || (storedB.length == 0)) {
        return;
    }
    aValue = bValue;
    bValue = displayContent;
    let a = parseFloat(aValue.join(''));
    let b = parseFloat(bValue.join(''));
    newResult = operate(opValue, a, b);
    displayContent = Array.from(String(newResult));
    if(displayContent.length > 10) {
        display.textContent = '(MAXDIGITS)'
    } else {
        display.textContent = displayContent.join('');
    }
};

const clearDisplay = function() {
    aValue = [];
    bValue = [];
    displayContent = [];
    display.textContent = displayContent
};
const clearEntry = function() {
    displayContent = [];
    display.textContent = displayContent;
};
const pageLoad = function() {
    const numBtns = document.getElementsByClassName('numeralBtn');
    for(i = 0; i < numBtns.length; i++) {
        let numValue = numBtns[i].textContent;
        numBtns[i].addEventListener('click',function(){
            pressNum(numValue);
        })
    }
    const decBtn = document.getElementById('btnDecimal');
    decBtn.addEventListener('click', function(){
        pressDec();
    })
    const clearBtn = document.getElementById('btnClear');
    clearBtn.addEventListener('click', function(){
        clearDisplay();
    })
    const clearEntryBtn = document.getElementById('btnCe');
    clearEntryBtn.addEventListener('click', function() {
        clearEntry();
    })
    const plusBtn = document.getElementById('btnPlus');
    plusBtn.addEventListener('click', function() {
        pressOperator('plus');
    })
    const minusBtn = document.getElementById('btnMinus');
    minusBtn.addEventListener('click', function() {
        pressOperator('minus');
    })
    const multiplyBtn = document.getElementById('btnMultiply');
    multiplyBtn.addEventListener('click', function() {
        pressOperator('times');
    })
    const divideBtn = document.getElementById('btnDivide');
    divideBtn.addEventListener('click', function() {
        pressOperator('division');
    })
    const equalBtn = document.getElementById('btnEquals');
    equalBtn.addEventListener('click', function() {
        pressEquals();
    })
};

//adds two numbers
const add = function(a, b) {
    return (a + b);
};
//subtracts b from a
const subtract = function(a, b) {
    return (a - b);
};
//multiplies two numbers
const multiply = function(a, b) {
    return (a * b);
};
//divides a by b, returns remainder in rounded decimal
const divide = function(a, b) {
    //prevent divide by 0
    if(b == 0) {
        aValue = [];
        bValue = [];
        opValue = '';
        return 'PLSNO';
    }else if ((a % b ) != 0) {
        return (Math.round(a * 10000.0 / b)/10000)
    }else {
        return (a / b);
    }
};
//calls one of the operator functions with two numbers
const operate = function(operator, num1, num2) {
    if(operator == 'plus') {
        return add(num1, num2);
    }else if(operator == 'minus') {
        return subtract(num1, num2);
    }else if(operator == 'times') {
        return multiply(num1, num2);
    }else if(operator == 'division'){
        return divide(num1, num2);
    }
};
pageLoad();