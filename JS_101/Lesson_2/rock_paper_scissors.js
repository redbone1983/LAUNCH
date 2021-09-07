/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const readline = require('readline-sync');

let choices = '';
let gameCount = 1;
let humanPoints = 0;
let computerPoints = 0;
let champion = false;

// Set up game constants
const VALID_CHOICES = [
  'r', 
  'p', 
  's',
  'sp',
  'l'
];

const wins = [
  'sp',
  'pr',
  'rs',
  'rl',
  'sps',
  'sl',
  'lp',
  'psp',
  'spr'
];

const randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);

const prompt = str => console.log(`==> ${str}`);
let playGame = true;

const displayWinner = (human, computer) => {
  // Assign ordered choices to empty string
  choices += human;
  choices += computer;

  if (human === computer) {
    return 'IT IS A TIE!';
  } else if (wins.includes(choices)) {
    humanPoints += 1;
    
    return 'HUMAN WINS!';
  } else if (!wins.includes(choices) && human !== computer && human !== 'x') {
    computerPoints += 1;
    
    return 'COMPUTER WINS!';
  }
};

let greeting = '*******************************************\nWELCOME TO ROCK, PAPER, SCISSORS, SPOCK, LIZARD!\n*******************************************\nBest out of 5 games is crowned Champion!\n*******************************************';

const gameGreeting = msg => console.log(msg);

// // Start Main Game Loop
while (playGame) {
  if (gameCount === 1) {
    gameGreeting(greeting);
  }

  prompt(`GAME ${gameCount} STARTS NOW`);
  prompt('*******************************************');
  prompt('Please choose: r for rock, p for paper, s for scissors, sp for spock, l for lizard or x to exit game.');
  
  let humanChoice = readline.question().toLowerCase();
  let computerChoice = VALID_CHOICES[randomIndex];
  console.clear();

  if (humanChoice.toLowerCase() === 'x') {
    break;
  }

    // Start validation loop
    while (true) {
      if (VALID_CHOICES.includes(humanChoice)) {
        gameCount += 1;
        console.clear();
        break;
      } else {
        prompt("Please enter a valid input.");
        humanChoice = readline.question().toLowerCase();
      }
  }
  
  prompt(`You chose ${humanChoice}, computer chose ${computerChoice}`);

  prompt('*******************************************');
  prompt(displayWinner(humanChoice, computerChoice));
  choices = '';

  if (gameCount === 6 && humanPoints > computerPoints) {
    champion = true;
    prompt("Human reigns supreme!");
    gameCount = 1;
  } else if (gameCount === 6 && computerPoints > humanPoints) {
    champion = true;
    prompt("Computer reigns supreme!");
    gameCount = 1;
  } 

  prompt('*******************************************');
  prompt(`Current Score is You: ${humanPoints} & Computer: ${computerPoints}.`);
  prompt('*******************************************');

  
  if (champion) {
    prompt('Would you like to play again? (y/n)');
    let answer = readline.question().toLowerCase();

    while (answer[0] !== 'n' && answer[0] !== 'y') {
      prompt('Please enter "y" or "n".');
      answer = readline.question().toLowerCase();
    }

    if (answer[0] === 'y') {
      champion = false;
      humanPoints = 0;
      computerPoints = 0;
    } else {
      playGame = false;
    }
  } 
}