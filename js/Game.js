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
   * @param {object} target The target space where the last token has been dropped
   * @return {boolean} Indicates whether a win has been found.
   */
  checkForWin(target) {
    const owner = target.owner;
    const rows = this.board.rows;
    const cols = this.board.columns;
    const targetCol = target.x;
    const targetRow = target.y;
    const spaces = this.board.spaces;
    const win = false;

    //vertical check, only in the same column where the last token was dropped
    for (let y = 0; y < rows - 3; y++) {
      if (spaces[targetCol][y].owner === owner &&
        spaces[targetCol][y + 1].owner === owner &&
        spaces[targetCol][y + 2].owner === owner &&
        spaces[targetCol][y + 3].owner === owner) {
          win = true;
      }
    }

    //horizontal check, only in the same row where the last token was dropped
    for (let x = 0; x < cols - 3; x++) {
      if (spaces[x][targetRow].owner === owner &&
        spaces[x + 1][targetRow].owner === owner &&
        spaces[x + 2][targetRow].owner === owner &&
        spaces[x + 3][targetRow].owner === owner) {
          win = true;
      }

    }

    //diagonal upwards check
    if (targetCol < cols - 3) {
      for (let y = targetRow; y >= rows - 3; y--) {
        if (spaces[targetCol][y].owner === owner &&
          spaces[targetCol + 1][y + 1].owner === owner &&
          spaces[targetCol + 2][y + 2].owner === owner &&
          spaces[targetCol + 3][y + 3].owner === owner) {
            win = true;
        }
      }
    }

    //diagonal downwards check
    if (targetCol > 2) {
      for (let y = targetRow; y < rows - 3; y++) {
        if (spaces[targetCol][y].owner === owner &&
          spaces[targetCol - 1][y + 1].owner === owner &&
          spaces[targetCol - 2][y + 2].owner === owner &&
          spaces[targetCol - 3][y + 3].owner === owner) {
            win = true;
        }
      }
    }





  }

}