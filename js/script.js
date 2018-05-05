'use strict';

// VARIABLES

var output = document.getElementById('output');
var resultOutput = document.getElementById('result');

var rock = document.getElementById('btn-rock');
var paper = document.getElementById('btn-paper');
var scissors = document.getElementById('btn-scissors');

var winsNumber = [0, 0];

var newGame = document.getElementById('newGame');
var roundsInfo = document.getElementById('roundsInfo');
var rounds;
var canPlay = false;


// START NEW GAME

newGame.addEventListener('click', function() {
  resultOutput.innerHTML = '';
  output.innerHTML = '';
  winsNumber = [0, 0];
  rounds = parseInt(window.prompt('Enter number of rounds to win'));
  roundsInfo.innerHTML = 'Win ' + rounds + ' rounds to win the game';
  canPlay = true;
});

// BUTTONS EVENTS

rock.addEventListener('click', function() {
  playerMove(1);
});
paper.addEventListener('click', function() {
  playerMove(2);
});
scissors.addEventListener('click', function() {
  playerMove(3);
});


// COMPUTER RANDOM CHOICE

function computerMove() {
  var computerChoice = Math.floor((Math.random() * 3) + 1);
  return computerChoice;
};

// COMPARE CHOICES

function playerMove(player) {
  if (!canPlay) {
    output.innerHTML = 'Please press the new game button!'  + '<br><br>' + output.innerHTML
    return;
  }

  else {

    var winner;
    var computerChoice = computerMove();

    if (player == computerChoice) {
      output.innerHTML = 'DRAW';
    }
    else if (player == 1 && computerChoice == 3 || player == 2 && computerChoice == 1 || player == 3 && computerChoice == 2) {
      winner = 'playerWon';
      resultInfo(winner, computerChoice, player);
      result(winner);
    }
    else {
      winner = 'playerLoose';
      resultInfo(winner, computerChoice, player);
      result(winner);
    }
  }
};

// SHOW RESULTS

function resultInfo(winner, computerChoice, player) {
  var names = {
    1: 'ROCK',
    2: 'PAPER',
    3: 'SCISSORS'
  };

  if (winner == 'playerWon') {
    output.innerHTML = 'YOU WON you played ' + names[player] + ', computer played ' + names[computerChoice];
  }
  else if (winner = 'playerLoose') {
    output.innerHTML = 'YOU LOOSE you played ' + names[player] + ', computer played ' + names[computerChoice];
  }
};

// SHOW INFO ABOUT WINNER

function result(winner) {
  if (winner == 'playerWon') {
    winsNumber[0] += 1;
  }
  else if (winner = 'playerLoose') {
    winsNumber[1] += 1;
  }
  if (winsNumber[0] == rounds) {
    output.innerHTML = 'YOU WON THE ENTIRE GAME !!!'  + '<br><br>' + output.innerHTML;
    canPlay = false;
  }
  else if (winsNumber[1] == rounds) {
    output.innerHTML = 'COMPUTER WON THE ENTIRE GAME !!!'  + '<br><br>' + output.innerHTML;
    canPlay = false;
  }
  resultOutput.innerHTML = 'Player ' + winsNumber[0] + ' - ' + winsNumber[1] + ' Computer';
};
