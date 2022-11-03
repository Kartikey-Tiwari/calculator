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
let wasLastOperator = false;
let isFloat = false;
let wasLastNumFloat = false;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
	button.addEventListener('click', (event) => {
		if (button.id==='all-clear'){
			display.textContent = ''
			result = 0;
		}
		else if (button.id==='clear'){
			if (display.textContent.length === 1){
				display.textContent = '0';
			}
			else {
				if (/^[+\-\%\÷x]$/.test(display.textContent[display.textContent.length-1])){
					wasLastOperator = false;
          isFloat = wasLastNumFloat;
          wasLastNumFloat = false;
				}
        else if (display.textContent[display.textContent.length-1] === '.') {
          isFloat = false;
        }
				display.textContent = display.textContent.slice(0, display.textContent.length-1);
			}
		}
    else if (button.id === '.'){
      if (!isFloat){
        isFloat = true;
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
					if (wasLastOperator){
						display.textContent = display.textContent.slice(0, display.textContent.length-1) + button.id;
					}
					else{
						display.textContent += button.id;
            wasLastNumFloat = isFloat;
					}
					wasLastOperator = true;
          isFloat = false;
				}
				else{
					wasLastOperator = false;
					display.textContent += button.id;
				}
			}
		}
	});
});
