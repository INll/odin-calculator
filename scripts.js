// Add two inputs
function add (a, b) {
  return a + b;
}

// Subtract two inputs
function subtract (a, b) {
  return Math.max(a, b) - Math.min(a, b);
}

// Multiple two inputs
function multipy (a, b) {
  return a * b;
}

// Divide two inputs
function divide (a, b) {
  return a / b;
}

// Handle input and call the four operation functions when needed
function operate (num1, operator, num2) {
  let result;
  switch (operator) {
    case '+': result = add(num1, num2); break;
    case '-': result = subtract(num1, num2); break;
    case '*': result = multiply(num1, num2); break;
    case '/': result = divide(num1, num2); break;
  }
  return result;
}