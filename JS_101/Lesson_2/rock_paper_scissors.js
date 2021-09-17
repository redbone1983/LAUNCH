/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

const readline = require('readline-sync');

const GAME = {
  "champion": '',
  "choices": '',
  "count": 1,
  "play": true,
  "state": 'Current'
};

const HUMAN = {
  "champion": false,
  "choice": '',
  "name": 'HUMAN',
  "score": 0
};

const COMPUTER = {
  "champion": false,
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
  "lp": 'DEVOURS',
  "lsp": 'POISONS',
  "pr": 'COVERS',
  "psp": 'DISPROVES',
  "rl": 'CRUSHES',
  "rs": 'BREAKS',
  "sl": 'DECAPITATES',
  "sp": 'CUTS',
  "spr": 'VAPORIZES',
  "sps": 'SMASHES'
};

const WEAPONS = {
  'l': 'LIZARD',
  'p': 'PAPER',
  'r': 'ROCK', 
  's': 'SCISSORS',
  'sp': 'SPOCK'
};

const prompt = str => console.log(`----------------------------------------\n${str}\n----------------------------------------`);

const resetChoices = () => {
  GAME.choices = '';
  HUMAN.choice = '';
  COMPUTER.choice = '';
};

const resetGame = () => {
  GAME.play = true;
  GAME.champion = '';
  GAME.count = 1;
  GAME.state = 'Current';
  console.clear();
};

const resetPlayer = player => {
  player.champion = false;
  player.choice = '';
  player.score = 0;
};

const reverseChoices = (choice1, choice2) => {
  GAME.choices = choice2;
  GAME.choices += choice1;

  return GAME.choices;
};

const getName = () => {
  prompt(`PLEASE ENTER YOUR NAME.`);
  HUMAN.name = readline.question().toUpperCase();
  console.clear();

  return HUMAN.name;
};

const getHumanChoice = () => {
  prompt(`Please choose: "r" for ROCK, "p" for PAPER, "s" for SCISSORS, "sp" for SPOCK, "l" for LIZARD.`);
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

// eslint-disable-next-line consistent-return
const determineWinner = (player1, player2) => {
  GAME.choices += player1;
  GAME.choices += player2;

  if (player1 === player2) {
    return 'tie';
  } 
  
  if (Object.keys(WINS).includes(GAME.choices)) {
    return HUMAN;
  } 
  
  if (!Object.keys(WINS).includes(GAME.choices) && player1 !== player2) {
    return COMPUTER;
  } 
};

const displayWinner = winner => {
  switch (winner) {
    case HUMAN: 
      return prompt(`${WEAPONS[HUMAN.choice]} ${WINS[GAME.choices]} ${WEAPONS[COMPUTER.choice]}!`);
    case COMPUTER: 
      return prompt(`${WEAPONS[COMPUTER.choice]} ${WINS[reverseChoices(HUMAN.choice, COMPUTER.choice)]} ${WEAPONS[HUMAN.choice]}`);
    case 'tie': 
      return prompt('IT IS A TIE.');
    default: 
      break;
  }
};

// eslint-disable-next-line no-return-assign
const tallyScore = player => player.score += 1;

let greeting = `WELCOME TO ROCK, PAPER, SCISSORS, SPOCK, LIZARD!`;
let shortRules = `BEST OUT OF 5 ROUNDS IS CROWNED CHAMPION!`;
let gameRulesPrompt = `Press "Y" for game rules. Press "N" to continue game.`;
let longRules = ` SCISSORS CUTS PAPER\n PAPER COVERS ROCK\n ROCK CRUSHES LIZARD\n LIZARD POISONS SPOCK\n SPOCK SMASHES SCISSORS\n SCISSORS DECAPITATES LIZARD\n LIZARD EATS PAPER\n PAPER DISPROVES SPOCK\n SPOCK VAPORIZES ROCK\n ROCK CRUSHES SCISSORS`;

let continueGame = false;

// Start Main Game Loop
while (GAME.play) {
  resetChoices();

  if (GAME.count === 1 && !continueGame) {
    getName();
    prompt(`Hi, ${HUMAN.name}!`);
    prompt(greeting);
    prompt(shortRules);

    if (readline.keyInYNStrict(`${gameRulesPrompt}`)){
      console.clear();
      prompt(`${longRules}`);
    } else {
      console.clear();
      prompt(`GAME ${GAME.count} STARTS NOW`);
    } 
  }  
  
  let human = getHumanChoice();
  let computer = getComputerChoice();
  console.clear();

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
 
  prompt(`YOU CHOSE ${WEAPONS[human]}. COMPUTER CHOSE ${WEAPONS[computer]}.`);

  let currentWinner = determineWinner(human, computer);
  if (currentWinner !== 'tie') {
    tallyScore(currentWinner);
  }

  displayWinner(currentWinner);

  if (currentWinner !== 'tie' && !GAME.champion) {
    prompt(`${currentWinner.name} WINS ROUND ${GAME.count - 1}!`);
  } 

  resetChoices();

  if (GAME.count > 5 && HUMAN.score !== COMPUTER.score && currentWinner !== 'tie') {
    if (HUMAN.score > COMPUTER.score) {
      GAME.champion = HUMAN.name;
    } else if (COMPUTER.score > HUMAN.score) {
      GAME.champion = COMPUTER.name;
    } 
  }

  if (GAME.champion) {
    GAME.state = 'FINAL';
    prompt(`${GAME.state} SCORE IS ${HUMAN.name}: ${HUMAN.score} & COMPUTER: ${COMPUTER.score}.`);
    prompt(`${GAME.champion} IS THE CHAMPION!`);
    prompt('Would you like to play again? (y/n)');
    let answer = readline.question().toLowerCase();
  
    while (answer[0] !== 'n' && answer[0] !== 'y') {
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

  prompt(`${GAME.state} SCORE IS ${HUMAN.name}: ${HUMAN.score} & COMPUTER: ${COMPUTER.score}.`);
}

console.clear();
prompt(`Thanks for playing ROCK, PAPER, SCISSORS, SPOCK, LIZARD ${HUMAN.name}! GOODBYE!`);