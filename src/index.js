import calculate, { isOperator } from './utils/utils';
import './style/style.css';

let keys = document.querySelector('.keys');
let screen = document.querySelector('.display input'), value = '', isResult = false;
screen.value = '0';
keys.addEventListener('click', function (e) {
  let targetValue = e.target.value;
  if (targetValue) {
    if (screen.value.length <= 18) {
      if (targetValue == '=') {
        value = calculate(value);
        isResult = true;
      } else if (targetValue == 'C') {
        value = '0';
      } else if (isResult) {
        value = targetValue;
        isResult = false;
      } else if ((targetValue == '(' && !isOperator(value[value.length - 1])) || (value[0] == '0' && value.length === 1)) {
        value = targetValue;
      } else if (!(targetValue == '0' && value[0] == '0' && value.length === 1)) {
        value += targetValue;
      }
      screen.value = value;
    } else {
      if (targetValue == 'C') {
        value = '0';
      } else {
        value = value.substr(0, 18);
      }
      screen.value = value;
    }
  }
});