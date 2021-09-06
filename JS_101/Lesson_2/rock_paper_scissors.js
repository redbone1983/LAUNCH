/* eslint-disable no-console */
const readline = require('readline-sync');

let choices = '';

const VALID_CHOICES = [
  'r', 
  'p', 
  's'
];

// Set up game constants
const wins = [
  'sp',
  'pr',
  'rs'
];
const randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
// Initialize level 1 variables

const prompt = str => console.log(`==> ${str}`);

// // Start Main Game Loop
while (true) {

  prompt('Please choose: p for paper, r for rock, s for scissors.');
  let humanChoice = readline.question();
  let computerChoice = VALID_CHOICES[randomIndex];

    // Start validation loop
    while (true) {
      if (VALID_CHOICES.includes(humanChoice)) {
        break;
      } else {
        prompt("Please enter a valid input.");
      }
    }

  prompt(`You chose ${humanChoice}, computer chose ${computerChoice}`);

  // Assign ordered choices to empty string
  choices += humanChoice;
  choices += computerChoice;

  if (wins.includes(choices)) {
    prompt('Human wins!');
  } else if (humanChoice === computerChoice) {
    prompt('You have tied!');
  } else {
    prompt('Computer wins!');
  }

  break;
}