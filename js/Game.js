class Game {
  constructor() {
  this.board = new Board();
  this.players = this.createPlayers();
  this.ready = false;
  }


  get activePlayer() {
    return this.players.find(elem => elem.active);
  }


  /** 
  * Creates two player objects
  * @return  {Array}    An array of two Player objects.
  */
  createPlayers() {
    const players = [];
    const player1 = new Player('Player 1', 1, '#e15258', true);
    const player2 = new Player('Player 2', 2, '#e59a13');
    players.push(player1, player2);
    return players;
  }


  /**
   * Gets game ready to play. 
   */
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }

  /**
   * Branches code, depending on what key player presses
   * @param   {Object}    e - Keydown event object
   */
  handleKeyDown(e) {
    if (this.ready) {
      
      if (e.key === 'ArrowLeft') {
        this.activePlayer.activeToken.moveLeft();
      } else if (e.key === 'ArrowRight') {
        this.activePlayer.activeToken.moveRight(this.board.columns);
      } else if (e.key === 'ArrowDown') {
        this.playToken();
      }
    }
  }



  /**
   * Identifies which space to drop the token into, and checks if the column is full already before dropping.
   */
  playToken() {
    let spaces = this.board.spaces;
    let activeToken = this.activePlayer.activeToken;
    let targetColumn = spaces[activeToken.columnLocation];
    
    const lastRow = this.board.rows - 1

    for (let row = lastRow; row >= 0; row--) {
      
      const space = targetColumn[row];
      
      if (space.token === null) {
        this.ready = false;
        this.activePlayer.activeToken.drop(space);
      }
      
    }
  }


  /**
   * Checks for a win
   * @param {object} target - The target space where the last token has been dropped
   */
  
}