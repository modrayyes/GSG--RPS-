const choicesArray = ['R', 'P', 'S'];
const defaultImgsArray = [
  'images/rock.png',
  'images/paper.png',
  'images/seissors.png'
];
const scndModeImgsArray = [
  'images/water.png',
  'images/wood.png',
  'images/fire.png'
];
var gameMode = defaultImgsArray;

var customButtonSrcArray = ['a', 'b', 'c'];

const playAgainButton = document.getElementById('play-again-button');
const changeModeButton = document.getElementById('game-mode');
const resultSection = document.getElementById('result-section');


playAgainButton.disabled = true;
playAgainButton.addEventListener(
  'click',
  reset('Final-Result', 'player01', 'comp01')
);
changeModeButton.addEventListener('click', change());

function addButton() {
  for (let i = 0; i < choicesArray.length; i++) {
    const btn = document.createElement('button');
    const img = document.createElement('img');
    btn.id = choicesArray[i];
    btn.classList.add('buttons', 'buttonWithImg');
    img.src = gameMode[i];
    img.id = gameMode[i] + '1';
    img.classList.add('header-img');
    btn.appendChild(img);
    document.getElementById('Top-buttons').appendChild(btn);
    btn.addEventListener('click', showPlayersChoices(i));
  }
}

function createFileInputs() {
  for (let i = 0; i < choicesArray.length; i++) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = (event) => {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file);
      newImgsArray = gameMode.slice();
      newImgsArray.splice(i, 1, imageURL);
      gameMode = newImgsArray;
      removeElementsById(['R', 'P', 'S']);
      addButton();
      document.getElementById('R').disabled = !playAgainButton.disabled;
      document.getElementById('P').disabled = !playAgainButton.disabled;
      document.getElementById('S').disabled = !playAgainButton.disabled;
              
    };
    input.id = choicesArray[i] + '1';
    const label = document.createElement('label');
    label.setAttribute('for', choicesArray[i] + '1');
    label.id = choicesArray[i] + '2';
    label.innerText = 'Upload image' + (i + 1) + '.     ';
    document.getElementById('inputFile').appendChild(input);
    document.getElementById('inputFile').appendChild(label);
  }
}

addButton();
createFileInputs();

function showPlayersChoices(i) {
  return function () {
    toggle(true, false);
    const playerImg = document.createElement('img');
    playerImg.src = gameMode[i];
    playerImg.classList.add('result-img', 'removable');
    playerImg.id = 'player01';
    document.getElementById('player-section').appendChild(playerImg);
    PlayerChoise = choicesArray[i];

    const computerImg = document.createElement('img');
    const random = [Math.floor(Math.random() * 3)];
    computerImg.src = gameMode[random];
    ComputerChoice = choicesArray[random];

    computerImg.classList.add('result-img', 'removable');
    computerImg.id = 'comp01';
    document.getElementById('computer-section').appendChild(computerImg);
    winner(PlayerChoise, ComputerChoice);
    resultSection.classList.add('middle-screen');
  document
    .getElementsByClassName('result-container')[0]
    .classList.add('result-container-height');
  };
}

function winner(PlayerChoise, ComputerChoice) {
  switch (PlayerChoise + ComputerChoice) {
    case 'RS':
    case 'PR':
    case 'SP':
      Wins();
      break;
    case 'RP':
    case 'PS':
    case 'SR':
      loses();
      break;
    case 'RR':
    case 'PP':
    case 'SS':
      draw();
      break;
  }
}

function showResult(resultMessage) {
  const FR = document.createElement('p');
  FR.classList.add('removable');
  FR.id = 'Final-Result';
  document.getElementById('result-section').appendChild(FR);
  FR.innerHTML = resultMessage;
}

function Wins() {
  showResult('You Won :)     ');
}

function loses() {
  showResult('computer Won :(');
}

function draw() {
  showResult("it's a draw    ");
}

function change() {
  return function () {
    if (gameMode === defaultImgsArray) {
      gameMode = scndModeImgsArray;
    } else {
      gameMode = defaultImgsArray;
    }

    removeElementsById(['R', 'P', 'S', 'Final-Result', 'player01', 'comp01']);
    addButton();
    playAgainButton.disabled = true;
    resultSection.classList.remove('middle-screen');
  };
}

function removeElementsById(idsArray = []) {
  idsArray.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  });
}

function reset(removableId1, removableId2, removableId3) {
  return function () {
    document.getElementById(removableId1).remove();
    document.getElementById(removableId2).remove();
    document.getElementById(removableId3).remove();
    toggle(false, true);
    resultSection.classList.remove('middle-screen');
  };
}
//  Disable or enable buttons
function toggle(ToF, xToF) {
  for (let x = 0; x < choicesArray.length; x++) {
    document.getElementById(choicesArray[x]).disabled = ToF;
    playAgainButton.disabled = xToF;
  }
}



