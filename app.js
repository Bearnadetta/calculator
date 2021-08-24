const add = function(a, b) {
    return (a + b);
};

const subtract = function(a, b) {
    return (a - b);
}

const multiply = function(a, b) {
    return (a * b);
}

const divide = function(a, b) {
    if(b == 0) {
        return 'ERROR';
    }else if ((a % b ) != 0) {
        return (Math.round(a * 1000000.0 / b)/1000000)
    }else {
        return (a / b);
    }
}

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
}