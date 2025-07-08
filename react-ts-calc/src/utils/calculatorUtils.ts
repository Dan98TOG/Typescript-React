export const performBasicOperation = (
  prevValue: number,
  nextValue: number,
  operation: string
): number => {
  switch (operation) {
    case '+':
      return prevValue + nextValue;
    case '-':
      return prevValue - nextValue;
    case '×':
      return prevValue * nextValue;
    case '÷':
      if (nextValue === 0) throw new Error('Division by zero');
      return prevValue / nextValue;
    case '=':
      return nextValue;
    default:
      return nextValue;
  }
};

export const performScientificOperation = (
  value: number,
  operation: string
): number => {
  switch (operation) {
    case 'sin':
      return Math.sin(value * Math.PI / 180);
    case 'cos':
      return Math.cos(value * Math.PI / 180);
    case 'tan':
      return Math.tan(value * Math.PI / 180);
    case 'log':
      if (value <= 0) throw new Error('Invalid input for logarithm');
      return Math.log10(value);
    case 'ln':
      if (value <= 0) throw new Error('Invalid input for natural logarithm');
      return Math.log(value);
    case 'sqrt':
      if (value < 0) throw new Error('Invalid input for square root');
      return Math.sqrt(value);
    case 'x²':
      return value * value;
    case 'x³':
      return value * value * value;
    case '1/x':
      if (value === 0) throw new Error('Division by zero');
      return 1 / value;
    case 'exp':
      return Math.exp(value);
    case '10^x':
      return Math.pow(10, value);
    case 'x!':
      if (value < 0 || !Number.isInteger(value)) throw new Error('Invalid input for factorial');
      return factorial(value);
    default:
      return value;
  }
};

const factorial = (n: number): number => {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

export const formatDisplay = (value: string): string => {
  if (value === 'Error') return value;
  
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  
  // Handle very large or very small numbers
  if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(6);
  }
  
  // Remove trailing zeros and unnecessary decimal point
  return num.toString().replace(/\.?0+$/, '');
};