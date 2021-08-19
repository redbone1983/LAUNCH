// Refactored Version

const readline = require('readline-sync');
const prompt = msg => console.log(`===> ${msg}`);

// *** Number Validation Function Here ***
const isNumberValid = num => num.trim() === '' || Number(num) < 0 || isNaN(Number(num));

prompt('Welcome to Mortgage Calculator.');

// Start Calculator Program
while (true) {
  prompt('*****************************');

  prompt('Please enter your Loan amount.');
  let loanAmount = readline.question();
  
  while (isNumberValid(loanAmount)){
    prompt('Please enter a postive number.');
    loanAmount = readline.question();
  }

  prompt('Please enter your yearly interest rate.');
  let interestRate = readline.question();

  while (isNumberValid(interestRate)){
    prompt('Please enter a postive number.');
    interestRate = readline.question();
  }
  
  prompt('Please enter your yearly loan duration');
  let loanDuration = readline.question();

  while (isNumberValid(loanDuration)){
    prompt('Please enter a postive number.');
    loanDuration = readline.question();
  }

  let annualInterestRate = Number(interestRate) / 100;
  let monthlyInterest = annualInterestRate / 12;
  let monthlyDuration = Number(loanDuration * 12); 

  // Calculate monthly payment
  let monthlyPayment = Number(loanAmount) * (monthlyInterest / (1 - Math.pow((1 + monthlyInterest), (-monthlyDuration))));

  prompt(`Your monthly payment is: $${monthlyPayment.toFixed(2)}`);

  prompt(`Would you like to preform another calculation? y or n`);
  let userInput = readline.question();
   while (userInput[0] !== 'y' && userInput[0] !== 'n') {
    prompt(`Please enter 'y' or 'n'.`);
    userInput = readline.question();
   }

  if (userInput.toLowerCase() === 'n') {
    prompt('Thanks for using the Mortgage Calculator. Goodbye!');
    break;
  }
  
}