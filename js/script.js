'use strict';

// VARIABLES

var output = document.getElementById('output');
var resultOutput = document.getElementById('result');

var newGame = document.getElementById('newGame');
var roundsInfo = document.getElementById('roundsInfo');

var names = {
  1: 'ROCK',
  2: 'PAPER',
  3: 'SCISSORS'
};

var params = {
  winsNumber: [0,0],
  rounds: undefined,
  canPlay: false,
  progress: []
}

// START NEW GAME

newGame.addEventListener('click', function() {
  resultOutput.innerHTML = '';
  output.innerHTML = '';
  params.winsNumber = [0, 0];
  params.rounds = parseInt(window.prompt('Enter number of rounds to win'));
  roundsInfo.innerHTML = 'Win ' + params.rounds + ' rounds to win the game';
  params.canPlay = true;
});


// BUTTONS EVENTS

var buttons = document.querySelectorAll('.player-move');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(event) {
    var move = parseInt(event.target.getAttribute('data-move'));
    playerMove(move);
  })
};


// COMPUTER RANDOM CHOICE

function computerMove() {
  var computerChoice = Math.floor((Math.random() * 3) + 1);
  return computerChoice;
};

// COMPARE CHOICES

function playerMove(playerChoice) {
  if (!params.canPlay) {
    output.innerHTML = 'Please press the new game button!'  + '<br><br>' + output.innerHTML
    return;
  }

  else {
    var winner;
    var computerChoice = computerMove();

    if (playerChoice == computerChoice) {
      output.innerHTML = 'DRAW';
      winner = 'draw';
    }
    else if (playerChoice == 1 && computerChoice == 3 || playerChoice == 2 && computerChoice == 1 || playerChoice == 3 && computerChoice == 2) {
      winner = 'player';
    }
    else {
      winner = 'computer';
    }
    resultInfo(winner, computerChoice, playerChoice);
    result(winner, computerChoice, playerChoice);
  }
};

// SHOW RESULTS

function resultInfo(winner, computerChoice, playerChoice) {

  if (winner == 'player') {
    output.innerHTML = 'YOU WON you played ' + names[playerChoice] + ', computer played ' + names[computerChoice];
  }
  else if (winner = 'computer') {
    output.innerHTML = 'YOU LOSE you played ' + names[playerChoice] + ', computer played ' + names[computerChoice];
  }
};

// SHOW INFO ABOUT WINNER

function result(winner, computerChoice, playerChoice) {
  if (winner == 'player') {
    params.winsNumber[0] += 1;
  }
  else if (winner = 'computer') {
    params.winsNumber[1] += 1;
  }

  var playerWins = params.winsNumber[0];
  var computerWins = params.winsNumber[1];

  params.progress.push({
    playerChoice: playerChoice,
    computerChoice: computerChoice,
    winner: winner,
    playerWins: playerWins,
    computerWins: computerWins
  });

  checkWinner();

  resultOutput.innerHTML = 'Player ' + params.winsNumber[0] + ' - ' + params.winsNumber[1] + ' Computer';
};

function checkWinner() {
  if (params.winsNumber[0] == params.rounds || params.winsNumber[1] == params.rounds) {
    if (params.winsNumber[0] == params.rounds) {
      document.querySelector('.modal .content p').innerHTML = 'YOU WON THE ENTIRE GAME !!!';
    }
    else if (params.winsNumber[1] == params.rounds) {
      document.querySelector('.modal .content p').innerHTML = 'COMPUTER WON THE ENTIRE GAME !!!';
    }

    for (var i = 0; i < params.progress.length; i++) {
      var round = params.progress[i];
      var row = document.createElement('tr');
      var strHtml = `<td> ${i+1} </td>
      <td> ${names[round.playerChoice]} </td>
      <td> ${names[round.computerChoice]} </td>
      <td> ${round.winner} </td>
      <td> ${round.playerWins} - ${round.computerWins} </td>`

      row.innerHTML = strHtml;
      document.querySelector('table').appendChild(row);
      console.log(params.progress[i]);
    }

    showModal();
    params.canPlay = false;
  }
};

// MODAL

var modals = document.querySelectorAll('.modal');

var showModal = function(){
  for (var i = 0; i < modals.length; i++) {
    modals[i].classList.remove('show');
  };
	document.querySelector('#modal-show').classList.add('show');
	document.querySelector('#modal-overlay').classList.add('show');
};


var hideModal = function(event){
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for (var i = 0; i < closeButtons.length; i++){
	closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}
