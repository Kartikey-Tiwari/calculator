function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, operator, b = 0) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    case "%":
      return a / 100;
    default:
      return "oops";
  }
}

let result = 0;
let curNumber = 0;
let operator = "";
let wasLastOperator = false;
let isFloat = false;
let display = document.querySelector("#display");
let resultExpr = document.querySelector("#result-expr");

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button.id === "all-clear") {
      display.textContent = "";
      operator = "";
      result = 0;
      resultExpr.textContent = "";
      isFloat = false;
    } else if (button.id === "clear") {
      if (display.textContent) {
        if (display.textContent[display.textContent.length - 1] === ".") {
          isFloat = false;
        }
        if (!operator) {
          resultExpr.textContent = "";
        }
        display.textContent = display.textContent.slice(
          0,
          display.textContent.length - 1
        );
        if (!display.textContent) {
          if (
            resultExpr.textContent &&
            /[+-\÷*]/.test(
              resultExpr.textContent[resultExpr.textContent.length - 1]
            )
          ) {
            wasLastOperator = true;
          }
        }
      }
    } else if (button.id === ".") {
      if (!isFloat) {
        isFloat = true;
        if (!display.textContent) display.textContent += "0";
        display.textContent += ".";
        if (operator === '')
          resultExpr.textContent = '';
      }
    } else if (button.classList.contains("operator-btn")) {
      if (display.textContent === "" && resultExpr.textContent === "") {
        return;
      } else if (operator === "") {
        operator = button.id;
        resultExpr.textContent = display.textContent + button.id;
        result = +display.textContent;
        display.textContent = "";
      } else if (wasLastOperator && operator !== "%") {
        operator = button.id;
        resultExpr.textContent =
          resultExpr.textContent.slice(0, resultExpr.textContent.length - 1) +
          button.id;
      } else {
        curNumber = +display.textContent;
        result = operate(result, operator, curNumber);
        operator = button.id;
        resultExpr.textContent = result + button.id;
        display.textContent = "";
      }
      wasLastOperator = true;
      isFloat = false;
    } else if (button.id === "=") {
      if (resultExpr.textContent !== "") {
        if (operator) {
          curNumber = +display.textContent;
          if (display.textContent === "" && operator !== "%") return;
          result = operate(result, operator, curNumber);
          if (operator === "%") curNumber = "";
          resultExpr.textContent += curNumber + "=";
          display.textContent = result;
        }
      }
      operator = "";
    } else {
      if (resultExpr.textContent[resultExpr.textContent.length - 1] === "=")
        resultExpr.textContent = "";
      if (operator === "%") return;
      wasLastOperator = false;
      if (display.textContent === "" && button.id === "00") {
        display.textContent = "0";
      } else if (display.textContent === "0") {
        if (button.id === "00") return;
        else display.textContent = button.id;
      } else {
        display.textContent += button.id;
      }
    }
  });
});
