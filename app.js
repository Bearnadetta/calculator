let displayContent = [];
let aValue = [];
let bValue = [];
let opValue = '';
let storedOp = '';
const display = document.getElementById('display');
const equalBtn = document.getElementById('btnEquals');
const numBtns = document.getElementsByClassName('numeralBtn');
const decBtn = document.getElementById('btnDecimal');
const clearBtn = document.getElementById('btnClear');
const clearEntryBtn = document.getElementById('btnCe');
const plusBtn = document.getElementById('btnPlus');
const minusBtn = document.getElementById('btnMinus');
const multiplyBtn = document.getElementById('btnMultiply');
const divideBtn = document.getElementById('btnDivide');

//decimal is added to display on press
const pressDec = function() {
    if((displayContent.join('') == 'PLSDONOT') || (displayContent.join('') == 'MAXDIGITS')) {
        clearDisplay();
    }

    //Decimal can't be added to display more than once
    if((displayContent.length < 10) && !(displayContent.includes('.'))) {
        displayContent.push('.')
        display.textContent = displayContent.join('');
    }
};

//numbers get added to display on press
const pressNum = function(e) {
    if((displayContent.join('') == 'PLSDONOT') || (displayContent.join('') == 'MAXDIGITS')) {
        clearDisplay();
    }
    if(displayContent.length < 10) {
        displayContent.push(e);
       display.textContent = displayContent.join('');
    }
};

// operator value is set on press
const pressOperator = function(e) {
    if((displayContent.join('') == 'PLSDONOT') || (displayContent.join('') == 'MAXDIGITS')) {
        clearDisplay();
    }
    //allows operator switching 
    if((opValue != '') && displayContent.length === 0) {
        opValue = e;
        
    } else {
        // logic to allow operation without hitting equals each time
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
};

//calls operate function on specified parameters
const pressEquals = function() {
    if((displayContent.join('') == 'PLSDONOT') || (displayContent.join('') == 'MAXDIGITS')) {
        clearDisplay();
    }
    //stored values allow check against empty parameters, and recalls input on recursive operation
    let storedA = bValue;
    let storedB = displayContent;
    if((storedA.length == 0) || (storedB.length == 0)) {
        return;
    }
    if(opValue == ''){
        opValue = storedOp;
        aValue = displayContent;
        bValue = storedA;
    } else {
        aValue = bValue;
        bValue = displayContent;
    }
    let a = parseFloat(aValue.join(''));
    let b = parseFloat(bValue.join(''));
    newResult = operate(opValue, a, b);
    displayContent = Array.from(String(newResult));
    if(displayContent.length > 10) {
        displayContent = ['M','A','X','D','I','G','I','T','S']
        display.textContent = displayContent.join('');
       
    } else {
        display.textContent = displayContent.join('');
        storedOp = opValue
        opValue = '';
        
    }
};

// removes the selected class from operator buttons when called
const unSelected = function() {
    let opBtns = document.getElementsByClassName('opButton');
    for(i = 0; i < opBtns.length; i++) {
        opBtns[i].classList.remove('selected');
    }
};

//clears display and resets global variables
const clearDisplay = function() {
    unSelected();
    aValue = [];
    bValue = [];
    displayContent = [];
    storedOp = '';
    opValue = '';
    display.textContent = displayContent
};

//clears current entry, calls clearDisplay when pressed twice
const clearEntry = function() {
    if (displayContent.length === 0){
        clearDisplay();
    }
    displayContent = [];
    display.textContent = displayContent;
};

//adds event listeners to calculator buttons
const pageLoad = function() {
    for(i = 0; i < numBtns.length; i++) {
        let numValue = numBtns[i].textContent;
        numBtns[i].addEventListener('click',function(){
            pressNum(numValue);
        })
    }
    decBtn.addEventListener('click', function(){
        pressDec();
    })
    clearBtn.addEventListener('click', function(){
        clearDisplay();
    })
    clearEntryBtn.addEventListener('click', function() {
        clearEntry();
    })
    //operator buttons call unSelected when pressed to prevent multiple operator buttons
    //from being selected at once
    plusBtn.addEventListener('click', function() {
        unSelected();
        this.classList.add('selected');
        pressOperator('+');
    })
    minusBtn.addEventListener('click', function() {
        unSelected();
        this.classList.add('selected');
        pressOperator('-');
    })
    multiplyBtn.addEventListener('click', function() {
        unSelected();
        this.classList.add('selected');
        pressOperator('*');
    })
    divideBtn.addEventListener('click', function() {
        unSelected();
        this.classList.add('selected');
        pressOperator('/');
    })
    equalBtn.addEventListener('click', function() {
        unSelected();
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
    let result = (a * b);
    if(result % 1 === 0) {
        return result;
    }else {
        return (Math.round(result * 10000)/10000);
    }
};
//divides a by b, returns remainder in rounded decimal
const divide = function(a, b) {
    //prevent divide by 0
    if(b == 0) {
        aValue = [];
        bValue = [];
        opValue = '';
        return 'PLSDONOT';
    }else if ((a % b ) != 0) {
        return (Math.round(a * 10000.0 / b)/10000)
    }else {
        return (a / b);
    }
};
//calls one of the operator functions with two numbers
const operate = function(operator, num1, num2) {
    if(operator == '+') {
        return add(num1, num2);
    }else if(operator == '-') {
        return subtract(num1, num2);
    }else if(operator == '*') {
        return multiply(num1, num2);
    }else if(operator == '/'){
        return divide(num1, num2);
    }
};

const keyboardPress = function(e) {
    if (e.key >= 0 && e.key <= 9) pressNum(e.key)
    if (e.key === '.') pressDec()
    if (e.key === '=' || e.key === 'Enter') {
        pressEquals()
        unSelected()
    }
    if (e.key === 'Backspace') clearEntry()
    if (e.key === 'Escape') clearDisplay()
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
        unSelected();
        pressOperator(e.key)
        switch(e.key) {
            case '+':
                plusBtn.classList.add('selected')
                break;
            case '-':
                minusBtn.classList.add('selected')
                break;
            case '/':
                divideBtn.classList.add('selected')
                break;
            case '*':
                multiplyBtn.classList.add('selected')
                break;
            default:
                return null;
        }
        
    }
};

window.addEventListener('keydown', keyboardPress)

// runs pageload function when page loads to set constants and event listeners
pageLoad();