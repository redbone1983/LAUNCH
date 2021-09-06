/* eslint-disable no-console */
const readline = require('readline-sync');

let choices = '';

// Set up game constants
const VALID_CHOICES = [
  'r', 
  'p', 
  's'
];

const wins = [
  'sp',
  'pr',
  'rs'
];

const randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);

const prompt = str => console.log(`==> ${str}`);
let playGame = true;

const displayWinner = (human, computer) => {
  // Assign ordered choices to empty string
  choices += human;
  choices += computer;

  if (wins.includes(choices)) {
    return 'Human wins!';
  } else if (human === computer) {
    return 'You have tied!';
  } 
    
return 'Computer wins!';
  
};

// // Start Main Game Loop
while (playGame) {

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

  prompt(displayWinner(humanChoice, computerChoice));

  prompt('Would you like to play again? (y/n)')
  let answer = readline.question().toLowerCase();
  
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  // eslint-disable-next-line curly
  if (answer[0] !== 'y') {
    playGame = false;
  }
}