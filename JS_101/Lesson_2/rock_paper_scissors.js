/* eslint-disable no-console */
// Keep your functions simple; they should perform one logical task — no more, no less.

const readline = require('readline-sync');

const GAME = {
  "champion": false,
  "choices": '',
  "count": 1,
  "play": true,
  "state": 'Current'
};

const HUMAN = {
  "choice": '',
  "score": 0
};

const COMPUTER = {
  "choice": '',
  "score": 0
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
  
// const randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);

const prompt = str => console.log(`==> ${str}`);

const TALLY_SCORE = winner => {
  winner.score += 1;
  return winner;
};

const reset_round = () => {
  HUMAN.choice = '';
  COMPUTER.choice = '';
  GAME.choices = '';
};

const RESET_GAME = () => {
  GAME.play = true;
  GAME.count = 1;
  GAME.champion = false;
  GAME.state = 'Current';
  HUMAN.choice = '';
  HUMAN.score = 0;
  COMPUTER.choice = '';
  COMPUTER.score = 0;
};


const REVERSE_CHOICES = (choice1, choice2) => {
  GAME.choices = choice2;
  GAME.choices += choice1;

  return GAME.choices;
};

const HUMAN_CHOICE = () => {
  prompt('Please choose: r for rock, p for paper, s for scissors, sp for spock, l for lizard or x to exit game.');
  HUMAN.choice = readline.question().toLowerCase();
  console.clear();
  
  return HUMAN.choice;
};

const COMPUTER_CHOICE = () => {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  COMPUTER.choice = VALID_CHOICES[randomIndex];
  console.clear();

  return COMPUTER.choice;
};

const DETERMINE_WINNER = (humanChoice, compChoice) => {
  // Assign ordered choices to empty string
  GAME.choices += humanChoice;
  GAME.choices += compChoice;
  
  if (humanChoice === compChoice) {
    return 'tie';
  } 
  
  if (Object.keys(WINS).includes(GAME.choices)) {
    return HUMAN;
  } 
  
  if (!Object.keys(WINS).includes(GAME.choices) && humanChoice !== compChoice && humanChoice !== 'x') {
    return COMPUTER;
  }
};

const DISPLAY_WINNER = winner => {
  switch (winner) {
    case HUMAN: prompt(`${WEAPONS[HUMAN.choice]} ${WINS[GAME.choices]} ${WEAPONS[COMPUTER.choice]}!`);
      break;
    case COMPUTER: prompt(`${WEAPONS[COMPUTER.choice]} ${WINS[REVERSE_CHOICES(HUMAN.choice, COMPUTER.choice)]} ${WEAPONS[HUMAN.choice]}`);
      console.log(`REVERSE_CHOICES returns: ${REVERSE_CHOICES(HUMAN.choice, COMPUTER.choice)}`);
      break;
    case 'tie': prompt('IT IS A TIE.');
      break;
    default: 
      break;
  }
};

let greeting = '*******************************************\nWELCOME TO ROCK, PAPER, SCISSORS, SPOCK, LIZARD!\n*******************************************\nBest out of 5 games is crowned Champion!\n*******************************************';

const GAME_GREETING = msg => console.log(msg);

// // Start Main Game Loop
while (GAME.play) {
  reset_round();
  if (GAME.count === 1) {
    GAME_GREETING(greeting);
  }

  prompt(`GAME ${GAME.count} STARTS NOW`);
  prompt('*******************************************');
  
  let human = HUMAN_CHOICE();
  let computer = COMPUTER_CHOICE();
  console.clear();
  
  if (human.toLowerCase() === 'x') {
    break;
  }

    // Start validation loop
    while (true) {
      if (VALID_CHOICES.includes(human)) {
        GAME.count += 1;
        console.clear();
        break;
      } else {
        human = HUMAN_CHOICE();
      }
  }
  
  prompt(`You chose ${human}, computer chose ${computer}`);

  prompt('*******************************************');
  let currentWinner = DETERMINE_WINNER(human, computer);
  DISPLAY_WINNER(currentWinner);
  TALLY_SCORE(currentWinner);
  
  reset_round();

  if (GAME.count >= 6 && HUMAN.score > COMPUTER.score) {
    GAME.champion = true;
    prompt('*******************************************');
    prompt("Human reigns supreme!");
    GAME.count = 1;
    GAME.state = 'FINAL';
  } else if (GAME.count >= 6 && COMPUTER.score > HUMAN.score) {
    GAME.champion = true;
    prompt('*******************************************');
    prompt("Computer reigns supreme!");
    GAME.count = 1;
    GAME.state = 'FINAL';
  } 

  prompt('*******************************************');
  prompt(`${GAME.state} Score is HUMAN: ${HUMAN.score} & COMPUTER: ${COMPUTER.score}.`);
  prompt('*******************************************');

  
  if (GAME.champion) {
    prompt('Would you like to play again? (y/n)');
    let answer = readline.question().toLowerCase();

    while (answer[0] !== 'n' && answer[0] !== 'y' && answer[0] !== 'x') {
      prompt('Please enter "y" or "n".');
      answer = readline.question().toLowerCase();
    }

    if (answer[0] === 'y') {
      RESET_GAME();
      console.clear();
    } else {
      GAME.play = false;
    }
  } 
}