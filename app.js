
//adds two numbers
const add = function(a, b) {
    return (a + b);
};
//subtracts b from a
const subtract = function(a, b) {
    return (a - b);
}
//multiplies two numbers
const multiply = function(a, b) {
    return (a * b);
}
//divides a by b, returns remainder in rounded decimal
const divide = function(a, b) {
    //prevent divide by 0
    if(b == 0) {
        return 'ERROR';
    }else if ((a % b ) != 0) {
        return (Math.round(a * 1000000.0 / b)/1000000)
    }else {
        return (a / b);
    }
}
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
}