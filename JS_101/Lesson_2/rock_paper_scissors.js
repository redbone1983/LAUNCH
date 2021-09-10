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
  "name": 'HUMAN',
  "score": 0
};

const COMPUTER = {
  "choice": '',
  "name": 'COMPUTER',
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
  
const randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);

const prompt = str => console.log(`==> ${str}`);

const resetRound = () => {

  GAME.choices = '';
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

const humanChoice = () => {
  prompt('Please choose: r for rock, p for paper, s for scissors, sp for spock, l for lizard or x to exit game.');
  HUMAN.choice = readline.question().toLowerCase();
  console.clear();
  
  return HUMAN.choice;
};

const computerChoice = index => {
  COMPUTER.choice = VALID_CHOICES[index];
  console.clear();

  return COMPUTER.choice;
};

const determineWinner = (player1, player2) => {
  // Assign ordered choices to empty string
  GAME.choices += player1;
  GAME.choices += player2;
  
  if (player1 === player2) {
    return 'tie';
  } 
  
  if (Object.keys(WINS).includes(GAME.choices)) {
    return HUMAN;
  } 
  
  if (!Object.keys(WINS).includes(GAME.choices) && player1 !== player2 && player1 !== 'x') {
    return COMPUTER;
  }
};

const displayWinner = winner => {
  switch (winner) {
    case HUMAN: prompt(`${WEAPONS[HUMAN.choice]} ${WINS[GAME.choices]} ${WEAPONS[COMPUTER.choice]}!`);
      break;
    case COMPUTER: prompt(`${WEAPONS[COMPUTER.choice]} ${WINS[reverseChoices(HUMAN.choice, COMPUTER.choice)]} ${WEAPONS[HUMAN.choice]}`);
      break;
    case 'tie': prompt('IT IS A TIE.');
      break;
    default: 
      break;
  }
};

let greeting = '-----------------------------------------\nWELCOME TO ROCK, PAPER, SCISSORS, SPOCK, LIZARD!\n-----------------------------------------\nBest out of 5 games is crowned Champion!\n-----------------------------------------';

// // Start Main Game Loop
while (GAME.play) {
  resetRound();
  if (GAME.count === 1) {
    prompt(greeting);
  }

  prompt(`GAME ${GAME.count} STARTS NOW`);
  prompt('*******************************************');
  
  let human = humanChoice();
  let computer = computerChoice(randomIndex);
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
        human = humanChoice();
      }
  }
  
  prompt(`You chose ${WEAPONS[human]}, computer chose ${WEAPONS[computer]}`);

  prompt('*******************************************');
  let currentWinner = determineWinner(human, computer);
  displayWinner(currentWinner);
  currentWinner.score += 1;
  
  resetRound();

  if (HUMAN.score >= COMPUTER.score || COMPUTER.score >= HUMAN.score) {
    GAME.champion = true;

    if (currentWinner !== 'tie' && GAME.count <= 5) {
      prompt('-----------------------------------------');
      prompt(`${currentWinner.name} WINS THIS ROUND!`);
    }
   
    if (GAME.count > 5 && GAME.champion) {
      GAME.state = 'FINAL';
      prompt('-----------------------------------------');
      prompt(`${currentWinner.name} IS THE CHAMPION!`);
    } 

    prompt('-----------------------------------------');
    prompt(`${GAME.state} Score is HUMAN: ${HUMAN.score} & COMPUTER: ${COMPUTER.score}.`);
    prompt('*******************************************');
  }

  if (GAME.state === 'FINAL') {
    prompt('Would you like to play again? (y/n)');
    let answer = readline.question().toLowerCase();

    while (answer[0] !== 'n' && answer[0] !== 'y' && answer[0] !== 'x') {
      prompt('Please enter "y" or "n".');
      answer = readline.question().toLowerCase();
    }
    
    if (answer[0] === 'y') {
      resetGame();
      resetPlayer(HUMAN);
      resetPlayer(COMPUTER);
    } else {
      GAME.play = false;
    }
  }
}
 