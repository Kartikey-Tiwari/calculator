function add(a, b){
	return a+b;
}

function subtract(a, b){
	return a-b;
}

function multiply(a, b){
	return a*b;
}

function divide(a, b){
	return a/b;
}

function operate(a, operator, b=0){
	switch(operator){
		case '+':
			return add(a, b);
		case '-':
			return subtract(a, b);
		case '*':
			return multiply(a, b);
		case '/':
			return divide(a,b);
		case '%':
			return a/100;
		default:
			return "oops";
	}
}

let result = 0;
let curNumber = 0;
let operator = '';
let wasLastOperator = false;
let isFloat = false;
let display = document.querySelector('#display');
let resultExpr = document.querySelector('#result-expr')

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
	button.addEventListener('click', (event) => {
		if (button.id==='all-clear'){
			display.textContent = '0'
      operator = '';
			result = 0;
      resultExpr.textContent = '';
      isFloat = false;
		}
		else if (button.id==='clear'){
      if (display.textContent){
        if (display.textContent[display.textContent.length-1] === '.') {
          isFloat = false;
        }
				display.textContent = display.textContent.slice(0, display.textContent.length-1);
      }
		}
    else if (button.id === '.'){
      if (!isFloat){
        isFloat = true;
        if (!display.textContent)
          display.textContent += '0';
        display.textContent += '.';
      }
    }
		else{
			if (display.textContent === '0'){
				if (button.classList.contains('operator-btn') || button.id==='00'){
					return;
				}
				else{
					display.textContent = button.id;
				}
			}
			else{
				if (button.classList.contains('operator-btn')){
          if (operator === ""){
            operator = button.id;
            resultExpr.textContent = display.textContent + button.id; 
            result = +display.textContent;
            display.textContent = "";
          }
          else if (wasLastOperator && operator !== '%'){
            operator = button.id;
						resultExpr.textContent = resultExpr.textContent.slice(0, resultExpr.textContent.length-1) + button.id;
					}
          else{
            curNumber = +display.textContent;
            result = operate(result, operator, curNumber);
            operator = button.id;
            resultExpr.textContent = result + button.id;
            display.textContent = "";
          }
					wasLastOperator = true;
          isFloat = false;
				}
        else if (button.id === '='){
          if (resultExpr.textContent !== ''){
            if (operator){
              curNumber = +display.textContent;
              if (!curNumber && operator !== '%')
                return;
              result = operate(result, operator, curNumber);
              if (operator === '%')
                curNumber = '';
              resultExpr.textContent += curNumber + '=';
              display.textContent = result;
            }
          }
          operator = '';
        }
				else{
          if (resultExpr.textContent[resultExpr.textContent.length-1] === '=')
            resultExpr.textContent = '';
          if (operator === '%')
            return;
					wasLastOperator = false;
					display.textContent += button.id;
				}
			}
		}
	});
});
