function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number1 / number2;
}

let firstNumber, operator, secondNumber;

function operate(operator, firstNumber, secondNumber) {
  let solution;

  switch (operator) {
    case "+":
      solution = add(firstNumber, secondNumber);
      break;
    case "-":
      solution = subtract(firstNumber, secondNumber);
      break;
    case "*":
      solution = multiply(firstNumber, secondNumber);
      break;
    case "/":
      solution = divide(firstNumber, secondNumber);
  }

  return solution;
}
