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
        activeToken.drop(space, () => {
          this.updateGameState(activeToken, space);
        });
        break;
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
    let win = false;

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

    // diagonal downwards
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y + 1].owner === owner &&
          this.board.spaces[x - 2][y + 2].owner === owner &&
          this.board.spaces[x - 3][y + 3].owner === owner) {
          win = true;
        }
      }
    }

    // diagonal upwards
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 3; y < this.board.rows; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y - 1].owner === owner &&
          this.board.spaces[x - 2][y - 2].owner === owner &&
          this.board.spaces[x - 3][y - 3].owner === owner) {
          win = true;
        }
      }
    }

    return win;
  }













  // checkForWin(target) {
  //   const owner = target.token.owner;
  //   let win = false;

  //   // vertical
  //   for (let x = 0; x < this.board.columns; x++) {
  //     for (let y = 0; y < this.board.rows - 3; y++) {
  //       if (this.board.spaces[x][y].owner === owner &&
  //         this.board.spaces[x][y + 1].owner === owner &&
  //         this.board.spaces[x][y + 2].owner === owner &&
  //         this.board.spaces[x][y + 3].owner === owner) {
  //         win = true;
  //       }
  //     }
  //   }

  //   // horizontal
  //   for (let x = 0; x < this.board.columns - 3; x++) {
  //     for (let y = 0; y < this.board.rows; y++) {
  //       if (this.board.spaces[x][y].owner === owner &&
  //         this.board.spaces[x + 1][y].owner === owner &&
  //         this.board.spaces[x + 2][y].owner === owner &&
  //         this.board.spaces[x + 3][y].owner === owner) {
  //         win = true;
  //       }
  //     }
  //   }

  //   // diagonal
  //   for (let x = 3; x < this.board.columns; x++) {
  //     for (let y = 0; y < this.board.rows - 3; y++) {
  //       if (this.board.spaces[x][y].owner === owner &&
  //         this.board.spaces[x - 1][y + 1].owner === owner &&
  //         this.board.spaces[x - 2][y + 2].owner === owner &&
  //         this.board.spaces[x - 3][y + 3].owner === owner) {
  //         win = true;
  //       }
  //     }
  //   }

  //   // diagonal
  //   for (let x = 3; x < this.board.columns; x++) {
  //     for (let y = 3; y < this.board.rows; y++) {
  //       if (this.board.spaces[x][y].owner === owner &&
  //         this.board.spaces[x - 1][y - 1].owner === owner &&
  //         this.board.spaces[x - 2][y - 2].owner === owner &&
  //         this.board.spaces[x - 3][y - 3].owner === owner) {
  //         win = true;
  //       }
  //     }
  //   }

  //   return win;
  // }


  // checkForWin(target) {
  //   const owner = target.owner;
  //   const rows = this.board.rows;
  //   const cols = this.board.columns;
  //   const targetCol = target.x;
  //   const targetRow = target.y;
  //   const spaces = this.board.spaces;
  //   let win = false;

  //   //vertical check, only in the same column where the last token was dropped
  //   for (let y = 0; y < rows - 3; y++) {
  //     if (spaces[targetCol][y].owner === owner &&
  //       spaces[targetCol][y + 1].owner === owner &&
  //       spaces[targetCol][y + 2].owner === owner &&
  //       spaces[targetCol][y + 3].owner === owner) {
  //       win = true;
  //     }
  //   }

  //   //horizontal check, only in the same row where the last token was dropped
  //   for (let x = 0; x < cols - 3; x++) {
  //     if (spaces[x][targetRow].owner === owner &&
  //       spaces[x + 1][targetRow].owner === owner &&
  //       spaces[x + 2][targetRow].owner === owner &&
  //       spaces[x + 3][targetRow].owner === owner) {
  //       win = true;
  //     }

  //   }

  //   //diagonal upwards check
  //   if (targetCol < cols - 3) {
  //     for (let y = targetRow; y >= rows - 3; y--) {
  //       if (spaces[targetCol][y].owner === owner &&
  //         spaces[targetCol + 1][y - 1].owner === owner &&
  //         spaces[targetCol + 2][y - 2].owner === owner &&
  //         spaces[targetCol + 3][y - 3].owner === owner) {
  //         win = true;
  //       }
  //     }
  //   }

  //   //diagonal downwards check
  //   if (targetCol > 2) {
  //     for (let y = targetRow; y < rows - 3; y++) {
  //       if (spaces[targetCol][y].owner === owner &&
  //         spaces[targetCol - 1][y + 1].owner === owner &&
  //         spaces[targetCol - 2][y + 2].owner === owner &&
  //         spaces[targetCol - 3][y + 3].owner === owner) {
  //         win = true;
  //       }
  //     }
  //   }

  //   return win;
  // }


  /** 
  * Switches active player. 
  */
  switchPlayers() {
    for (const player of this.players) {
      player.active = !player.active;
    }
  }


  /** 
  * Displays game over message.
  * @param {string} message - Game over message.      
  */
  gameOver(message) {
    const messageContainer = document.getElementById('game-over');
    messageContainer.textContent = message;
    messageContainer.style.display = 'block';
  }


  /** 
   * Updates game state after token is dropped. 
  * @param   {Object}  token  -  The token that's being dropped.
  * @param   {Object}  target -  Targeted space for dropped token.
  */
  updateGameState(token, target) {
    target.mark(token);

    if (!this.checkForWin(target)) {

      this.switchPlayers();

      if (this.activePlayer.hasMoreTokens()) {
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
      } else {
        this.gameOver(`It's a draw!`);
      }
    } else {
      this.gameOver(`${target.owner.name} wins!`);
    }




  }

}