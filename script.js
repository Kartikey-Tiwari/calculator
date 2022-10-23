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
			return add(a, b); break;
		case '-':
			return subtract(a, b); break;
		case '*':
			return multiply(a, b); break;
		case '/':
			return divide(a,b); break;
		case '%':
			return a/100; break;
		default:
			return "oops";
	}
}

let curResult = 0;
let wasLastOperator = false;
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
	button.addEventListener('click', (event) => {
		if (button.id==='all-clear'){
			display.textContent = '0'
			curResult = 0;
		}
		else if (button.id==='clear'){
			if (display.textContent.length === 1){
				display.textContent = '0';
			}
			else {
				display.textContent = display.textContent.slice(0, display.textContent.size-1);
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
					}
					wasLastOperator = true;
				}
				else{
					wasLastOperator = false;
					display.textContent += button.id;
				}
			}
		}
	});
});
