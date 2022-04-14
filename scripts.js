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
  return a - b;
}

// Multiple two inputs
function multiply (a, b) {
  return a * b;
}

// Divide two inputs
function divide (a, b) {
  if (b === 0) return 'Cannot divide by Zero!';
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
  // Trim result if it gets too long
  result = result.toString();
  if (result.length > 11) {
    return parseFloat(result.substring(0, 10));
  }
  return result;
}

// Reset calc array and set display panel to 0
function allClear() {
  calc = calc.map(num => 0);
  dispVal.innerHTML = 0;
  isNum1 = true;
}

// Reset display, called when user has finished inputting the current number
// and needs to enter a new number
// This is trigged by user clicking on any of +, -, *, /, and =
// Input argument: Number user clicked immediately after +, -, *, /, and =
function resetDisplay(clicked) {
  // console.log('Display has been reset');
  dispVal.innerHTML = clicked;
  resetDisp = false; // Reset not needed when entering the second number
}

// Remove clicked status from all operator buttons
function deactivateAllBtns() {
  const operatorBtns = document.querySelectorAll('.operator');
  operatorBtns.forEach((btn) => {
    // Remove the last class unless no additional class exists
    if (btn.classList.length === 3) return;
    btn.classList.remove(`${btn.classList[btn.classList.length - 1]}`)
  })
}

// addEventListener() to all buttons
const allBtns = document.querySelectorAll('.btn');
const dispVal = document.querySelector('.dispVal');

allBtns.forEach((btn) => {
  btn.addEventListener('click', handler)});

// Populate display after activation of numeric and operator buttons
function handler(e) {
  const clicked = this.classList[2];
  let newDisplayText = dispVal.innerHTML + clicked;
  // Evaluate buttons
  switch (clicked) {
    case '+': case '-': case '*': case '/':
      // Deactivate all buttons then activate current
      deactivateAllBtns();
      console.log(this.classList.add('active'));
      // Check if no operator has been selected before
      if (calc[2] === 0) {
        calc.splice(2, 1, clicked);
      }
      // If number ends with a decimal point, remove that decimal point
      if (newDisplayText[newDisplayText.length - 2] === '.') {
        dispVal.innerHTML = newDisplayText.substring(0, newDisplayText.length - 2);
      }
      if (isNum1) {
        // Do not revoke isNum1 status if operator is the 1st input
        // User can choose an operator even if no number is typed
        if (calc[0] !== 0) {
          isNum1 = false;
        }
        // Reset for next number input
        resetDisp = true;
        calc.splice(2, 1, clicked);
        console.log(calc);
      } else if (calc[1] !== 0) {
        // Reset to display new result
        resetDisp = true;
        // Compute pending
        result = operate(calc[0], calc[1], calc[2]);
        // Store result in calc[0], set calc[1] to 0
        calc.splice(0, 2, result, 0);
        dispVal.innerHTML = result;
        // calc[2] set to current operator, to be evaluated on next input
        calc.splice(2, 1, clicked);
        console.log(calc);
        console.log('3');
        return;
      } else {
        // When user hasn't input the 2nd number
        // Allow users to change/spam operator buttons
        calc.splice(2, 1, clicked);
        resetDisp = true;
        console.log(calc);
      };
      console.log(newDisplayText);
      break;
    case 'ac':
      if (calc[0] === 0 && 
          calc[1] === 0 && 
          calc[2] === 0) return;
      allClear();
      deactivateAllBtns();
      console.log(calc);
      return;
    case 'bksp':
      let bksped = dispVal.innerHTML.slice(0, -1)
      if (bksped === '') {
        dispVal.innerHTML = 0;
      } else {
        dispVal.innerHTML = bksped;
      }
    case '=':
      // Check for empty calc array
      deactivateAllBtns();
      if (calc[0] === 0 || 
          calc[1] === 0 || 
          calc[2] === 0) {
            // If number ends with a decimal point, remove that decimal point
            if (newDisplayText[newDisplayText.length - 2] === '.') {
              dispVal.innerHTML = newDisplayText.substring(0, newDisplayText.length - 2);
            }
            return;
          }
      result = operate(calc[0], calc[1], calc[2]);
      console.log(`Result is ${result}.`);
      // Store result in calc[0]
      calc.splice(0, 3, result, 0, 0);
      dispVal.innerHTML = result;
      resetDisp = true;
      console.log(calc);
      break;
    case '.':
      // Return if there is already a decimal point
      if (dispVal.innerHTML.split("").find(e => e === '.') === '.') return;
      // Return if over length limit
      if (newDisplayText.length > 11) return;
      if (isNum1) {
        // Display accumulated string of numbers
        dispVal.innerHTML = newDisplayText;
        calc.splice(0, 1, newDisplayText);
      } else { // Ready for new number input
        dispVal.innerHTML = newDisplayText;
        calc.splice(1, 1, newDisplayText);
      }
      break;
    default:  // Update display upon click on any of the numbers
      // Remove leading '0', unless it is '0.'
      if (newDisplayText[0] === '0' && 
          newDisplayText[1] !== '.') { 
        newDisplayText = newDisplayText.substring(1);
      }
      // Reset display for displaying next input
      if (resetDisp) {
        resetDisplay(clicked);
        // User tries to input the first number
        if (isNum1) {
          calc.splice(0, 1, clicked);
        } else if (calc[1] === 0 && calc[2] === 0) {
          // This happens when '=' was used to calculate a result last time.
          // So the new number is num1.
          isNum1 = true;
          calc.splice(0, 1, clicked);
        } else {
          calc.splice(1, 1, clicked);
        }
        console.log(calc);
        resetDisp = false;
        return;
      }
      // Trim display value if over 11 in length
      if (newDisplayText.length > 11) return;
      if (isNum1) {
        // Display accumulated string of numbers
        dispVal.innerHTML = newDisplayText;
        calc.splice(0, 1, newDisplayText);
      } else { // Ready for new number input
        dispVal.innerHTML = newDisplayText;
        calc.splice(1, 1, newDisplayText);
      }
    console.log(calc);
  }
}