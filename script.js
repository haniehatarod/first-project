class Calculator {
  constructor() {
    this.inputValue = "";
  }

  appendValue(value) {
    this.inputValue += value;
    this.update();
    this.preCalcuteResult();
  }

  add(first, second) {
    return first + second;
  }

  mines(first, second) {
    return first - second;
  }

  divide(first, second) {
    if (second === 0) {
      return;
    }
    return first / second;
  }

  multiply(first, second) {
    return first * second;
  }

  calculate() {
    const iterate = this.inputValue.split(/([+\-*/])/);
    if (iterate.length < 3) return;
    let firstNum = parseFloat(iterate[0]);
    for (let i = 1; i < iterate.length; i += 2) {
      const operator = iterate[i];
      const secondNum = parseFloat(iterate[i + 1]);
      switch (operator) {
        case "+":
          firstNum = this.add(firstNum, secondNum);
          break;
        case "-":
          firstNum = this.mines(firstNum, secondNum);
          break;
        case "*":
          firstNum = this.multiply(firstNum, secondNum);
          break;
        case "/":
          firstNum = this.divide(firstNum, secondNum);
          break;
      }
    }

    this.inputValue = firstNum.toString();
    this.update();
    this.preViewUpdate("");
  }
  backspace() {
    this.inputValue = this.inputValue.slice(0, -1);
    this.update();
    this.preCalcuteResult();
  }

  preCalcuteResult() {
    const iterate = this.inputValue.split(/([+\-*/])/);
    if (iterate.length < 3) {
      this.preViewUpdate("");
      return;
    }

    let firstNum = parseFloat(iterate[0]);
    for (let i = 1; i < iterate.length; i += 2) {
      const operator = iterate[i];
      const secondNum = parseFloat(iterate[i + 1]);
      if (isNaN(secondNum)) return;

      switch (operator) {
        case "+":
          firstNum = this.add(firstNum, secondNum);
          break;
        case "-":
          firstNum = this.mines(firstNum, secondNum);
          break;
        case "*":
          firstNum = this.multiply(firstNum, secondNum);
          break;
        case "/":
          firstNum = this.divide(firstNum, secondNum);
          break;
      }
    }
    this.preViewUpdate(firstNum.toString());
  }

  clear() {
    this.inputValue = "";
    this.update();
    this.preViewUpdate("");
  }

  update() {
    const result = document.querySelector(".input-sec #result-input");
    result.value = this.inputValue;
  }
  preViewUpdate(value) {
    const preview = document.querySelector("#preresult-input");
    preview.value = value;
  }
}
let newCalculator = new Calculator();



const backspaceBtn = document.querySelector(".delete-btn");
backspaceBtn.addEventListener("click", () => {
  newCalculator.backspace();
});

let buttons = document.querySelectorAll(".row button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonInnerText = e.target.innerText;

    if (buttonInnerText === "C") {
      newCalculator.clear();
    } else if (buttonInnerText === "=") {
      newCalculator.calculate();
    } else {
      newCalculator.appendValue(buttonInnerText);
    }
  });
});
