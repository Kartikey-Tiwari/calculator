let result = 0;
let curNumber = 0;
let operator = "";
let wasLastOperator = false;
let isFloat = false;
let display = document.querySelector("#display");
let resultExpr = document.querySelector("#result-expr");
let allClearArr = {
  Shift: false,
  Backspace: false,
};

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
    case "x":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    case "%":
      return a / 100;
    default:
      return "oops";
  }
}

function roundResult() {
  let lenResult;
  if (result % 1 == 0) {
    lenResult = Math.trunc(Math.log(Math.abs(result))) + 1;
  } else {
    lenResult = (result + "").replace(".", "").length;
  }
  if (lenResult > 14) {
    result = result.toPrecision(14);
    if (result % 1 === 0) {
      result = parseFloat(result);
    }
  }
}

function handleDigitInput(digit) {
  if (display.textContent === "Infinity") return;
  if (resultExpr.textContent[resultExpr.textContent.length - 1] === "=")
    resultExpr.textContent = "";
  if (operator === "%") return;
  wasLastOperator = false;
  if (display.textContent === "" && digit === "00") {
    display.textContent = "0";
  } else if (display.textContent === "0") {
    if (digit === "00") return;
    else display.textContent = digit;
  } else {
    if (
      display.textContent.length < 14 ||
      (display.textContent[0] === "-" && display.textContent.length < 15)
    )
      display.textContent += digit;
  }
}

function calculateResult() {
  curNumber = +display.textContent;
  result = operate(result, operator, curNumber);
  roundResult();
}

function clearDisplay() {
  if (display.textContent) {
    if (display.textContent === "Infinity") {
      display.textContent = "";
    }
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
        /[+-\÷x]/.test(
          resultExpr.textContent[resultExpr.textContent.length - 1]
        )
      ) {
        wasLastOperator = true;
      }
    }
  }
}

function handleOperatorInput(op) {
  if (display.textContent === "" && resultExpr.textContent === "") {
    if (op === "-") {
      display.textContent = op;
    }
    return;
  } else if (operator === "") {
    operator = op;
    resultExpr.textContent = display.textContent + op;
    result = +display.textContent;
    display.textContent = "";
  } else if (wasLastOperator && operator !== "%") {
    if ((operator === "x" || operator === "÷") && op === "-") {
      display.textContent = op;
    } else {
      operator = op;
      resultExpr.textContent =
        resultExpr.textContent.slice(0, resultExpr.textContent.length - 1) + op;
    }
  } else {
    calculateResult();
    operator = op;
    resultExpr.textContent = result + op;
    result = +result;
    display.textContent = "";
  }
  wasLastOperator = true;
  isFloat = false;
}

function handleEqualsInput() {
  if (resultExpr.textContent !== "") {
    if (operator) {
      if (display.textContent === "" && operator !== "%") return;
      calculateResult();
      resultExpr.textContent += curNumber + "=";
      display.textContent = result;
    }
  }
  operator = "";
}

function handleDotInput() {
  if (!isFloat) {
    isFloat = true;
    if (!display.textContent) display.textContent += "0";
    display.textContent += ".";
    if (operator === "") resultExpr.textContent = "";
  }
}

function allClear() {
  display.textContent = "";
  operator = "";
  result = 0;
  resultExpr.textContent = "";
  isFloat = false;
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button.id === "all-clear") {
      allClear();
    } else if (button.id === "clear") {
      clearDisplay();
    } else if (button.id === ".") {
      handleDotInput();
    } else if (button.classList.contains("operator-btn")) {
      handleOperatorInput(button.id);
    } else if (button.id === "=") {
      handleEqualsInput();
    } else {
      handleDigitInput(button.id);
    }
  });
});

window.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key == +key) {
    handleDigitInput(key);
  } else if (key === "Backspace") {
    clearDisplay();
  } else if (key === ".") {
    handleDotInput();
  } else if (/[+-\/\*\%]/.test(key)) {
    if (key === "/") {
      handleOperatorInput("÷");
      event.preventDefault();
    } else if (key === "*") handleOperatorInput("x");
    else handleOperatorInput(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    handleEqualsInput();
  }
  if (key === "Shift" || key === "Backspace") {
    allClearArr[key] = true;
  }
  if (allClearArr["Shift"] && allClearArr["Backspace"]) {
    allClear();
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key;

  if (key === "Shift" || key === "Backspace") {
    allClearArr[key] = false;
  }
});
