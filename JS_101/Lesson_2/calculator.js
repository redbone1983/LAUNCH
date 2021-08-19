const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
let programState = true;
let langOutput;

// Calculator Refactor
const message = (message, lang = "en") => MESSAGES[lang][message];

// Add a Distinctive Prompt
const prompt = str => console.log(`==> ${str}`);
// Switch Statement
// Validating User input

prompt(message("welcome"));

const invalidNumber = num => {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}

prompt('Please select your language: 1) English, 2) French, 3) Spanish');
let language = readline.question();


switch (language) {
  case '1':
    langOutput = 'en'
    break;
  case '2':
    langOutput = 'fr'
    break;
  case '3':
    langOutput = 'sp'
    break;
}

while (programState) {
// Ask the user for the first number
console.log(`Language selected is ${langOutput}`);
prompt(MESSAGES[langOutput]['numOne']);
let number1 = readline.question();
// number1 = Number(number1);

while (invalidNumber(number1)) {
  prompt("Hmm... that doesn't look like a valid number.");
  number1 = readline.question();
}

number1 = Number(number1);

// Ask the user for the second number
prompt(MESSAGES[langOutput]['numTwo']);
let number2 = readline.question();
// number2 = Number(number2);

while (invalidNumber(number2)) {
  prompt("Hmm... that doesn't look like a valid number.");
  number2 = readline.question();
}

number2 = Number(number2);

// Ask the user for the operation to perform
prompt(MESSAGES[langOutput]['operation']);
let operation = readline.question();

while (!['1', '2', '3', '4'].includes(operation)) {
  prompt('Must choose 1, 2, 3 or 4');
  operation = readline.question();
}

// Perform the operation on the two numbers
let output;
switch (operation) {
  case '1':
    output = number1 + number2;
    break;
  case '2':
    output = number1 - number2;
    break;
  case '3':
    output = number1 * number2;
    break;
  case '4':
    output = number1 / number2;
    break;
}

// Print the results to the terminal
prompt(`The result is: ${output}`);

let userInput;
prompt(MESSAGES[langOutput]['runProgram']);
userInput = readline.question();
if (userInput === 'N' || userInput === 'n') {
  programState = false;
} 
                                           
}




// Asking the user for another calculation Currently, our calculator asks the user for two numbers and an operation and then exits after displaying the result. Wouldn't it be nice if we could ask the user if they wanted to perform another calculation and start a new calculation when they respond with yes?

// Extracting messages in the program to a configuration file.

// There are several messages sprinkled throughout the program. Can we move them into some configuration file and access them by key? That would let us manage the messages more easily, and we could even internationalize the messages.

// Internationalization Your calculator program is a hit, and it's being used all over the world! The problem is, not everyone speaks English. You now need to internationalize the messages in your calculator. You've already done the hard work of extracting all the messages to a configuration file. Now, all you have to do is send that configuration file to translators and call the right translation in your code.



