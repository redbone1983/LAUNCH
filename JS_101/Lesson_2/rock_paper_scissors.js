/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
const readline = require('readline-sync');

let choices = '';
let gameCount = 1;
// let humanPoints = 0;
// let computerPoints = 0;
let champion = false;

let POINTS = {
  "computer": 0,
  "human": 0
};

// Set up game constants
const VALID_CHOICES = [
  'r', 
  'p', 
  's',
  'sp',
  'l'
];

const WINS = {
  "lp": 'devours',
  "lsp": 'poisons',
  "pr": 'covers',
  "psp": 'disproves',
  "rl": 'crushes',
  "rs": 'breaks',
  "sl": 'decapitates',
  "sp": 'cuts',
  "spr": 'vaporizes',
  "sps": 'smashes'
};

const WEAPONS = {
  'l': 'lizard',
  'p': 'paper',
  'r': 'rock', 
  's': 'scissor',
  'sp': 'spock'
};
  
const randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);

const prompt = str => console.log(`==> ${str}`);

let playGame = true;

const tallyPoints = (obj, winner) => {
  return obj[winner] += 1;
};

const reverseChoices = (choice1, choice2) => {
  return choice2 += choice1;
};

const determineWinner = (player1, player2) => {
  // Assign ordered choices to empty string
  choices += player1;
  choices += player2;
  
  if (player1 === player2) {
    return 'tie';
  } 
  
  if (Object.keys(WINS).includes(choices)) {
    prompt(`${WEAPONS[player1]} ${WINS[choices]} ${WEAPONS[player2]}!`);
    return 'human';
  } 
  
  if (!Object.keys(WINS).includes(choices) && player1 !== player2 && player1 !== 'x') {
    prompt(`${WEAPONS[player2]} ${WINS[reverseChoices(player1, player2)]} ${WEAPONS[player1]}`);
    return 'computer';
  }
};

const displayWinner = winner => {
  switch (winner) {
    case 'human': prompt('HUMAN WINS!');
      break;
    case 'computer': prompt('COMPUTER WINS!');
      break;
    case 'tie': prompt('IT IS A TIE.');
      break;
    default: 
      break;
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
        prompt('Please choose: r for rock, p for paper, s for scissors, sp for spock, l for lizard or x to exit game.');
        humanChoice = readline.question().toLowerCase();
      }
  }
  
  prompt(`You chose ${humanChoice}, computer chose ${computerChoice}`);

  prompt('*******************************************');
  let currentWinner = determineWinner(humanChoice, computerChoice);
  displayWinner(currentWinner);
  tallyPoints(POINTS, currentWinner);
  
  // Reset choices
  choices = '';
  let gameState = 'Current';

  if (gameCount === 6 && POINTS.human > POINTS.computer) {
    champion = true;
    prompt('*******************************************');
    prompt("Human reigns supreme!");
    gameCount = 1;
    gameState = 'FINAL';
  } else if (gameCount === 6 && POINTS.computer > POINTS.human) {
    champion = true;
    prompt('*******************************************');
    prompt("Computer reigns supreme!");
    gameCount = 1;
    gameState = 'FINAL';
  } 

  prompt('*******************************************');
  prompt(`${gameState} Score is HUMAN: ${POINTS.human} & COMPUTER: ${POINTS.computer}.`);
  prompt('*******************************************');

  
  if (champion) {
    prompt('Would you like to play again? (y/n)');
    let answer = readline.question().toLowerCase();

    while (answer[0] !== 'n' && answer[0] !== 'y' && answer[0] !== 'x') {
      prompt('Please enter "y" or "n".');
      answer = readline.question().toLowerCase();
    }

    if (answer[0] === 'y') {
      champion = false;
      POINTS.human = 0;
      POINTS.computer = 0;
      console.clear();
    } else {
      playGame = false;
    }
  } 
}