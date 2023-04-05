const output = document.getElementById("output");
const outputQuestion = document.getElementById("question");
const buttons = document.getElementById("buttons");

let currentInput = "0";
let question = "";
let oldValue = "";
let operator = null;
let hasDecimal = false;

output.innerText = currentInput;

buttons.addEventListener("click", (event) => {
  const { target } = event;
  const value = target.getAttribute("data-value");

  if (outputQuestion.innerText.includes("=")) {
    question = output.innerText;
  }

  question += value;

  if (target.matches("button.number")) {
    handleNumber(value);
  }

  if (target.matches("button.operator")) {
    handleOperator(value);
  }

  if (target.matches("#equals")) {
    handleEquals();
  }

  if (target.matches("#clear")) {
    handleClear();
  }
});

function handleNumber(value) {
  if (currentInput === "0") {
    currentInput = value;
  } else {
    currentInput += value;
  }

  updateOutput();
}

function handleOperator(value) {

  oldValue = output.innerText;
  currentInput = "";
  operator = value;

  if (outputQuestion.innerText.indexOf('=') !== -1) {
    question = oldValue + operator;
    outputQuestion.innerText = question;
  } else {
    outputQuestion.innerText = question;
  }
}

function handleEquals() {
  const inputValue = currentInput;
  let newValue = eval(question.replace(/[=\s]/g, "").replace(/[%]/g, "/100"));

  currentInput = newValue.toString();
  operator = null;
  hasDecimal = false;
  oldValue = newValue;

  updateOutput();
}

function handleClear() {
  currentInput = "0";
  question = "";
  operator = null;
  hasDecimal = false;

  updateOutput();
}

function updateOutput() {
  output.innerText = currentInput;
  outputQuestion.innerText = question;
}