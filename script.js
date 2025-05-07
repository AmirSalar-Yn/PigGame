'use strict';

const player1TotalScore = document.querySelector('#score--0');
const player2TotalScore = document.getElementById('score--1');
const btnNewGame = document.querySelector('.btn--new');
const btnHoldGame = document.querySelector('.btn--hold');
const btnRollDice = document.querySelector('.btn--roll');
const dicePic = document.querySelector('.dice');
const player1CurrentScore = document.getElementById('current--0');
const player2CurrentScore = document.getElementById('current--1');
const player0Background = document.querySelector('.player--0');
const player1Background = document.querySelector('.player--1');

let isPlaying, currentScore, activePlayer, totalScore;

//Starting Conditions
const init = function () {
  currentScore = 0;
  totalScore = [0, 0];
  activePlayer = 0;
  isPlaying = true;

  //set the scores to 0 on the UI
  player1CurrentScore.textContent = '0';
  player2CurrentScore.textContent = '0';
  player1TotalScore.textContent = '0';
  player2TotalScore.textContent = '0';

  //hide the dice from UI:
  dicePic.classList.add('hidden');

  player0Background.classList.add('player--active');
  player1Background.classList.remove('player--active');
  player0Background.classList.remove('player--winner');
  player1Background.classList.remove('player--winner');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Background.classList.toggle('player--active');
  player1Background.classList.toggle('player--active');
};

//rolling the dice logic:
btnRollDice.addEventListener('click', function () {
  if (isPlaying) {
    //generating random number:
    const diceValue = Math.trunc(Math.random() * 6) + 1;

    //show the dice to UI again according to dice value:
    dicePic.classList.remove('hidden');
    dicePic.src = `dice-${diceValue}.png`;

    // check for diceValue === 1
    if (diceValue !== 1) {
      //if not 1 add dice value to current score
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if 1 switch to player 2
      switchPlayer();
    }
  }
});

btnHoldGame.addEventListener('click', function () {
  if (isPlaying) {
    //add current score to the total score
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    //winning the game logic
    if (totalScore[activePlayer] >= 20) {
      isPlaying = false;
      //removing dice pic
      dicePic.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    //swtich to next player
    else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);
