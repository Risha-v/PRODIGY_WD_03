const gameOptions = document.querySelector('.game-options');
const difficultyOptions = document.querySelector('.difficulty-options');

let isComputerGame = false;
let difficulty = 'easy';

gameOptions.addEventListener('click', handleGameOption);
difficultyOptions.addEventListener('click', handleDifficultyOption);

function handleGameOption(e) {
  const target = e.target;
  if (target.id === 'playCPU') {
    isComputerGame = true;
    difficultyOptions.style.display = 'block';
    gameOptions.style.display = 'none';
  } else if (target.id === 'playFriend') {
    isComputerGame = false;
    window.location.href = 'assets/player.html';
  }
}

function handleDifficultyOption(e) {
  const target = e.target;
  if (target.id === 'easy') {
      difficulty = 'easy';
      window.location.href = 'assets/basic.html';
  } else if (target.id === 'hard') {
      difficulty = 'hard';
      window.location.href = 'assets/hard.html';
  }
}