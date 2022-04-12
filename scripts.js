// [0]: Num1; [1]: Num2; [2]: Operation
let calc = [0, 0, 0];
// Determine if the resulting string is stored in calc[0] or [1]
let isNum1 = true;
// Determine if the number display is to be reset next time the
// user clicks a numeric button
let resetDisp = false;
// Numbers for storing numeric values
let num1 = calc[0];
let num2 = calc[1];
let operator = calc[2];
let result;

// Add two inputs
function add (a, b) {
  return a + b;
}

// Subtract two inputs
function subtract (a, b) {
  return Math.max(a, b) - Math.min(a, b);
}

// Multiple two inputs
function multiply (a, b) {
  return a * b;
}

// Divide two inputs
function divide (a, b) {
  return a / b;
}

// Handle input and call the four operation functions when needed
function operate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  let result;
  switch (operator) {
    case '+': result = add(num1, num2); break;
    case '-': result = subtract(num1, num2); break;
    case '*': result = multiply(num1, num2); break;
    case '/': result = divide(num1, num2); break;
  }
  return result;
}

// Reset calc array and set display panel to 0
function allClear() {
  calc = calc.map(num => 0);
  display.innerHTML = 0;
  isNum1 = true;
}

// Reset display, called when user has finished inputting the current number
// and needs to enter a new number
// This is trigged by user clicking on any of +, -, *, /, and =
// Input argument: Number user clicked immediately after +, -, *, /, and =
function resetDisplay(clicked) {
  // console.log('Display has been reset');
  display.innerHTML = clicked;
  resetDisp = false; // Reset not needed when entering the second number
}


// addEventListener() to all buttons
const allBtns = document.querySelectorAll('.btn');
const display = document.querySelector('.display');

allBtns.forEach((btn) => {
  btn.addEventListener('click', updateDisplay)});

// Populate display after activation of numeric and operator buttons
function updateDisplay(e) {
  const clicked = this.classList[1];
  // Evaluate buttons
  switch (clicked) {
    case '+': case '-': case '*': case '/':
      // If there is no pending computation (this is the 1st operator)
      if (calc[2] === 0) {
        calc.splice(2, 1, clicked);
        // console.log(calc);
      }
      if (isNum1) {
        // Do not revoke isNum1 status if operator is the 1st input
        if (calc[0] !== 0) {
          isNum1 = false;
        }
        // Reset for next number input
        resetDisp = true;
        calc.splice(2, 1, clicked);
        console.log(calc);
      } else if (calc[1] !== 0) {
        // If user didn't input anything, calc[1] === 0. This allows user to
        // spam/change operator when there's no second number input yet

        // Reset to display new result
        resetDisp = true;
        // Compute pending
        result = operate(calc[0], calc[1], calc[2]);
        // Store result in calc[0], set calc[1] to 0
        calc.splice(0, 2, result, 0);
        display.innerHTML = result;
        // calc[2] set to current operator, to be evaluated on next input
        calc.splice(2, 1, clicked);
        console.log(calc);
        console.log('3');
        return;
      } else {
        calc.splice(2, 1, clicked);
        resetDisp = true;
        console.log(calc);
      };
      break;
    case 'ac':
      if (calc[0] === 0 && 
        calc[1] === 0 && 
        calc[2] === 0) return;
      allClear();
      console.log(calc);
      return;
    case '=':
      // Check for empty calc array
      if (calc[0] === 0 || 
          calc[1] === 0 || 
          calc[2] === 0) return;
      result = operate(calc[0], calc[1], calc[2]);
      console.log(`Result is ${result}.`);
      // Store result in calc[0]
      calc.splice(0, 3, result, 0, 0);
      display.innerHTML = result;
      resetDisp = true;
      console.log(calc);
      break;
    default:  // Update display upon clicks
      let newDisplayText = display.innerHTML + clicked;
      if (newDisplayText[0] === '0') { // Remove leading '0'
        newDisplayText = newDisplayText.substring(1);
      }
      // Reset display for displaying next input
      if (resetDisp) {
        resetDisplay(clicked);
        if (isNum1) {
          calc.splice(0, 1, clicked);
        } else if (calc[1] === 0 && calc[2] === 0) {
          // This happens When '=' was called.
          // In this case the numeric inputs are num1.
          isNum1 = true;
          calc.splice(0, 1, clicked);
        } else {
          calc.splice(1, 1, clicked);
        }
        console.log(calc);
        resetDisp = false;
        return;
      }
      if (isNum1) {
        // Store display num1 into calc
        display.innerHTML = newDisplayText;
        calc.splice(0, 1, newDisplayText);
      } else { // Ready for new number input
        display.innerHTML = newDisplayText;
        calc.splice(1, 1, newDisplayText);
      }
    console.log(calc);
  }
}