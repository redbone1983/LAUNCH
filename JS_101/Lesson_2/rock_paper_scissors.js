/* eslint-disable no-console */
// Keep your functions simple; they should perform one logical task — no more, no less.

const readline = require('readline-sync');

// Set up game constants
const GAME = {
  "champion": false,
  "choices": '',
  "count": 1,
  "play": true,
  "state": 'Current'
};

const HUMAN = {
  "choice": '',
  "name": 'HUMAN',
  "score": 0
};

const COMPUTER = {
  "choice": '',
  "name": 'COMPUTER',
  "score": 0
};

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
  
const prompt = str => console.log(`${str}\n----------------------------------------`);

const resetRound = () => {
  GAME.choices = '';
  HUMAN.choice = '';
  COMPUTER.choice = '';
};

const resetGame = () => {
  GAME.play = true;
  GAME.count = 1;
  GAME.champion = false;
  GAME.state = 'Current';
  console.clear();
};

const resetPlayer = player => {
  player.choice = '';
  player.score = 0;

  return player;
};

const reverseChoices = (choice1, choice2) => {
  GAME.choices = choice2;
  GAME.choices += choice1;

  return GAME.choices;
};

const getName = () => {
  prompt(`\n----------------------------------------\nPLEASE ENTER YOUR NAME.`);
  HUMAN.name = readline.question();
  console.clear();

  return HUMAN.name;
};

const getHumanChoice = () => {
  prompt(`Please choose: "r" for ROCK, "p" for PAPER, "s" for SCISSORS, "sp" for SPOCK, "l" for LIZARD or "x" to EXIT GAME.`);
  HUMAN.choice = readline.question().toLowerCase();
  console.clear();
  
  return HUMAN.choice;
};

const getComputerChoice = () => {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  COMPUTER.choice = VALID_CHOICES[randomIndex];
  console.clear();

  return COMPUTER.choice;
};

const determineWinner = (player1, player2) => {
  GAME.choices += player1;
  GAME.choices += player2;
  let gameResults = null;
  
  if (player1 === player2) {
    gameResults = 'tie';
  } 
  
  if (Object.keys(WINS).includes(GAME.choices)) {
    gameResults = HUMAN;
  } 
  
  if (!Object.keys(WINS).includes(GAME.choices) && player1 !== player2 && player1 !== 'x') {
    gameResults = COMPUTER;
  }

  return gameResults;
};

const displayWinner = winner => {
  let winnerMessage = '';
  switch (winner) {
    case HUMAN: 
      winnerMessage = `${WEAPONS[HUMAN.choice]} ${WINS[GAME.choices]} ${WEAPONS[COMPUTER.choice]}!`;
      break;
    case COMPUTER: 
      winnerMessage = `${WEAPONS[COMPUTER.choice]} ${WINS[reverseChoices(HUMAN.choice, COMPUTER.choice)]} ${WEAPONS[HUMAN.choice]}`;
      break;
    case 'tie': 
      winnerMessage = 'IT IS A TIE.';
      break;
    default: 
      break;
  }

  prompt(winnerMessage);
};

const tallyScore = player => player.score += 1;

let greeting = `WELCOME TO ROCK, PAPER, SCISSORS, SPOCK, LIZARD!\n-----------------------------------------\nBEST OUT OF 5 IS CROWNED CHAMPION!`;

let continueGame = false;

// Start Main Game Loop
while (GAME.play) {
  let humanName = '';
  resetRound();

  if (GAME.count === 1 && continueGame !== true) {
    humanName = getName();
    prompt(`Hi, ${humanName}!`);
    prompt(greeting);
  } 

  prompt(`GAME ${GAME.count} STARTS NOW`);
  
  let human = getHumanChoice();
  let computer = getComputerChoice();
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
        human = getHumanChoice();
      }
    } 
 
  prompt(`You chose ${WEAPONS[human]}, computer chose ${WEAPONS[computer]}`);

  let currentWinner = determineWinner(human, computer);
  displayWinner(currentWinner);
  tallyScore(currentWinner);
  
  if (currentWinner !== 'tie' && GAME.champion === false) {
    prompt(`${currentWinner.name} WINS ROUND ${GAME.count - 1}!`);
  } 

  resetRound();

  prompt(`${GAME.state} Score is ${HUMAN.name}: ${HUMAN.score} & COMPUTER: ${COMPUTER.score}.`);

    if (GAME.count > 5 && HUMAN.score !== COMPUTER.score) {
      GAME.champion = true;
    }
    
    if (GAME.champion) {
      GAME.state = 'FINAL';
      prompt(`${currentWinner.name} IS THE CHAMPION!`);
    } 

    if (GAME.state === 'FINAL') {
    prompt('Would you like to play again? (y/n)');
    let answer = readline.question().toLowerCase();
  
    while (answer[0] !== 'n' && answer[0] !== 'y' && answer[0] !== 'x') {
      prompt('Please enter "y" or "n"');
      answer = readline.question().toLowerCase();
    }
    
    if (answer[0] === 'y') {
      resetGame();
      resetPlayer(HUMAN);
      resetPlayer(COMPUTER);
      continueGame = true;
    } else {
      GAME.play = false;
    }
  }
}