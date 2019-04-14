//Global variables and element selection

const beginButton = document.getElementById('begin-game');

// Initialize new Game

const game = new Game();


//EvListeners and interaction

/** 
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
beginButton.addEventListener('click', function() {
  game.startGame();
  this.style.display = 'none';
  document.getElementById('play-area').style.opacity = '1';
});

/**
 * Listens for keydowns and passes the event to the Game object
 */
document.addEventListener('keydown', function(evt){
  game.handleKeyDown(evt);
});