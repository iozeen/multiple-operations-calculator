const signs = { '+': 0, '-': 0, '/': 1, '*': 1 };

const convertToPostfix = (expression) => {
  console.log(expression);
  let isValidExpression = isValid(expression);
  console.log(isValid(expression), expression);
  let output = [];
  if (isValidExpression) {
    let tokens = expression.match(/(\d+\.\d+|\d+)|([-|*|\/|+|(|)])/g);
    let operatorsStack = [];
    tokens.forEach((token, i) => {
      console.log(output, operatorsStack);
      if (!isNaN(token)) {
        output.push(token);
      } else if (isOperator(token)) {
        while (operatorsStack.length !== 0 && hasHigherPrecedence(operatorsStack, token) && !isOpeningParantheses(operatorsStack)) {
          output.push(operatorsStack.pop());
        }
        operatorsStack.push(token);
      } else if (token == '(') {
        operatorsStack.push(token);
      } else if (token == ')') {
        while (operatorsStack.length !== 0 && !isOpeningParantheses(operatorsStack)) {
          output.push(operatorsStack.pop());
        }
        //pop opening
        operatorsStack.pop();
      }
    });
    while (operatorsStack.length !== 0) {
      output.push(operatorsStack.pop());
    }
  }
  console.log(output);
  return { output, isValid: isValidExpression };
}

const isValid = (expression) => {
  let openingPar = expression.match(/\(/g), closingPar = expression.match(/\)/g);
  if (isOperator(expression[0]) || isOperator(expression[expression.length - 1])) {
    return false;
  } else if (openingPar && closingPar && expression.length > 2) {
    return openingPar.length === closingPar.length;
  } else if (!openingPar && !closingPar) {
    return true;
  }
  else return false;
}

const calculate = (expression) => {
  let { output, isValid } = convertToPostfix(expression);
  if (isValid) {
    let result = [];
    output.forEach(token => {
      if (result.indexOf('Division by 0!') !== -1) {
        result = ['Division by 0!'];
        return result;
      }
      else if (!isOperator(token)) {
        result.push(token);
      } else {
        let a = result.pop(), b = result.pop(), A = parseFloat(a), B = parseFloat(b);
        switch (token) {
          case '+':
            result.push(A + B);
            break;
          case '-':
            result.push(B - A);
            break;
          case '*':
            result.push(A * B);
            break;
          case '/':
            result.push(A !== 0 ? (B / A) : 'Division by 0!');
            break;
        }
      }
    });
    return result.pop() + '';
  } else {
    return 'Invalid expression';
  }
}

const hasHigherPrecedence = (stack, token) => {
  return signs[stack[stack.length - 1]] >= signs[token];
}

const isOpeningParantheses = (stack) => {
  return stack[stack.length - 1] == '(';
}

export const isOperator = (value) => {
  for (let sign in signs) {
    if (sign == value) {
      return true;
    }
  }
  return false;
}

export default calculate;