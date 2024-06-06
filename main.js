let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false;

const add = (number1, number2) => number1 + number2;
const subtract = (number1, number2) => number1 - number2;
const multiply = (number1, number2) => number1 * number2;
const divide = (number1, number2) => number1 / number2;

function operate(operator, firstNumber, secondNumber) {
  let solution;
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);

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
      if (secondNumber === 0) {
        return "Nice try! Division by zero!";
      }
      solution = divide(firstNumber, secondNumber);
  }

  return typeof result === "number"
    ? Math.round((solution + Number.EPSILON) * 10) / 10
    : solution;
}

const updateDisplay = (value) => {
  const displayEl = document.getElementById("display");
  displayEl.innerText = value;
};

const handleDigits = (value) => {
  if (shouldResetDisplay) {
    if (value === ".") {
      updateDisplay("0.");
    } else {
      updateDisplay(value);
    }
    shouldResetDisplay = false;
  } else {
    const displayValue = document.getElementById("display").innerText;
    if (value === "." && displayValue.includes(".")) {
      return;
    }
    updateDisplay(
      displayValue === "0" && value !== "." ? value : displayValue + value
    );
  }
};
const digitButtons = [...document.querySelectorAll(".digit")];
digitButtons.forEach((digitButton) => {
  digitButton.addEventListener("click", (e) =>
    handleDigits(e.target.dataset.value)
  );
});

const handleOperators = (operatorValue) => {
  if (operator) {
    secondNumber = document.getElementById("display").innerText;
    firstNumber = operate(operator, firstNumber, secondNumber);
    updateDisplay(firstNumber);
    secondNumber = "";
  } else {
    firstNumber = document.getElementById("display").innerText;
  }
  operator = operatorValue;
  shouldResetDisplay = true;
};
const operatorButtons = [...document.querySelectorAll(".operator")];
operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (e) =>
    handleOperators(e.target.dataset.value)
  );
});

const handleEqual = () => {
  if (operator && firstNumber) {
    secondNumber = document.getElementById("display").innerText;
    const result = operate(operator, firstNumber, secondNumber);
    updateDisplay(result);
    firstNumber = result;
    operator = "";
    shouldResetDisplay = true;
  }
};
const equalButton = document.getElementById("equal");
equalButton.addEventListener("click", handleEqual);

const clearCalculator = () => {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  shouldResetDisplay = false;
  updateDisplay("0");
};
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearCalculator);

const handleBackspace = () => {
  let displayValue = document.getElementById("display").innerText;
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
    updateDisplay(displayValue);
  } else {
    updateDisplay("0");
  }
};
const backspaceButton = document.getElementById("backspace");
backspaceButton.addEventListener("click", handleBackspace);

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if ((key >= "0" && key <= "9") || key === ".") {
    handleDigits(key);
  } else if (key === "Backspace") {
    handleBackspace();
  } else if (key === "Escape") {
    clearCalculator();
  } else if (key === "Enter" || key === "=") {
    handleEqual();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    handleOperators(key);
  }
});
