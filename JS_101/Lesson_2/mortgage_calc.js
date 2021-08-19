const readline = require('readline-sync');
let runProgram = true;

const prompt = msg => console.log(`=> ${msg}`);

const validNumCheck = num => {
  return num.trim() === '' ||
  Number(num) < 0   ||
  Number.isNaN(Number(num));
}

prompt(`Welcome to the mortgage calculator!`);

while (runProgram) {
  prompt(`Please enter the loan amount.`);
  let loanAmount = readline.question();
  while(validNumCheck(loanAmount)){
    prompt('Please enter a postive number.');
    loanAmount = readline.question();
  }

  prompt(`Please enter the interest rate.`);
  prompt("(Example: 5 for 5% or 2.5 for 2.5%)");
  let interestRate = readline.question();

  while(validNumCheck(interestRate)){
    prompt('Please enter a postive number.');
    interestRate = readline.question();
  }
  
  prompt(`Please enter the yearly loan duration.`);
  let loanDuration = readline.question();
  
  while(validNumCheck(loanDuration)){
    prompt('Please enter a postive number.');
    loanDuration = readline.question();
  }


let annualInterestRate = Number(interestRate) / 100;  
let monthlyInterestRate = annualInterestRate / 12;
let monthlyLoanDuration = Number(loanDuration) * 12;

let monthlyPayment = Number(loanAmount) * (monthlyInterestRate / (1 - (1 + monthlyInterestRate)** -monthlyLoanDuration));
prompt(`Your monthly payment is: $${monthlyPayment.toFixed(2)}`);

prompt("Another calculation?");
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] === 'n') {
    runProgram = false;
  }
}


















