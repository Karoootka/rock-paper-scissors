'use strict';

// VARIABLES

var output = document.getElementById('output');
var resultOutput = document.getElementById('result');

var newGame = document.getElementById('newGame');
var start = document.getElementById('start');
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
  progress: [],
  playerName: ''
}

// START NEW GAME

newGame.addEventListener('click', function() {
  document.querySelector('input[name="firstname"]').value = '';
  document.querySelector('input[name="rounds"]').value = '';
  showModal('#modal-new-game');
});

start.addEventListener('click', function(event) {
  event.preventDefault();
  resultOutput.innerHTML = '';
  output.innerHTML = '';
  params.winsNumber = [0, 0];
  params.rounds = document.querySelector('input[name="rounds"]').value;
  params.playerName = document.querySelector('input[name="firstname"]').value;
  roundsInfo.innerHTML = 'Win ' + params.rounds + ' rounds to win the game';
  params.canPlay = true;
  params.progress = [];
  removeElementsByClass('clear');
  document.querySelector('#modal-overlay').classList.remove('show');
});

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
};


// ROCK PAPER SCISSORS - BUTTONS EVENTS

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
    showModal('#modal-warning');
    document.querySelector('#modal-warning .content p').innerHTML = 'Please press the NEW GAME button!';
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
      winner = params.playerName;
    }
    else {
      winner = 'computer';
    }
    resultInfo(winner, computerChoice, playerChoice);
    result(winner, computerChoice, playerChoice);
  }
};

// SHOW ROUND RESULTS

function resultInfo(winner, computerChoice, playerChoice) {
  if (winner == params.playerName) {
    output.innerHTML = params.playerName + ' WON - ' + params.playerName + ' played ' + names[playerChoice] + ', computer played ' + names[computerChoice];
  }
  else if (winner = 'computer') {
    output.innerHTML = params.playerName + ' LOST - ' + params.playerName + ' played ' + names[playerChoice] + ', computer played ' + names[computerChoice];
  }
};

// AFTER ROUND

function result(winner, computerChoice, playerChoice) {
  if (winner == params.playerName) {
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
  resultOutput.innerHTML = params.playerName + ' ' + params.winsNumber[0] + ' - ' + params.winsNumber[1] + ' Computer';
};


// CHECK WINNER & PRINT INFO INTO MODAL TABLE

function checkWinner() {
  if (params.winsNumber[0] == params.rounds || params.winsNumber[1] == params.rounds) {
    if (params.winsNumber[0] == params.rounds) {
      document.querySelector('#modal-show .content p').innerHTML = params.playerName + ' WON THE ENTIRE GAME !';
    }
    else if (params.winsNumber[1] == params.rounds) {
      document.querySelector('#modal-show .content p').innerHTML = 'COMPUTER WON THE ENTIRE GAME !';
    }

    for (var i = 0; i < params.progress.length; i++) {
      var round = params.progress[i];
      var row = document.createElement('tr');
      row.classList.add('clear');
      var strHtml = `<td> ${i+1} </td>
      <td> ${names[round.playerChoice]} </td>
      <td> ${names[round.computerChoice]} </td>
      <td> ${round.winner} </td>
      <td> ${round.playerWins} - ${round.computerWins} </td>`

      row.innerHTML = strHtml;
      document.querySelector('table').appendChild(row);
      console.log(params.progress[i]);
    }

    showModal('#modal-show');
    params.canPlay = false;
  }
};

// MODALS

var modals = document.querySelectorAll('.modal');

var showModal = function(idModal){
  for (var i = 0; i < modals.length; i++) {
    modals[i].classList.remove('show');
  };
	document.querySelector(idModal).classList.add('show');
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
