class Board {
  constructor() {
    this.rows = 6;
    this.columns = 7;
    this.spaces = this.createSpaces();
  }
  


  /** 
   * Generates 2D array of spaces. 
   * @return  {Array}     An array of space objects
   */
  createSpaces() {
    const spacesArray = [];
    for (let x = 0; x < this.columns; x++) {
      const column = [];

      for (let y = 0; y < this.rows; y++) {
        const newSpace = new Space(x, y);
        column.push(newSpace);
      }

      spacesArray.push(column);
    }
     
    return spacesArray;
  }


  /**
   * Draws the HTML of the board.
   */
  //version with for...of
  drawHTMLBoard() {
    for (const column of this.spaces) {
      for (const space of column) {
        space.drawSVGSpace();
      }
    }
  }



  //version with double for loop
  // drawHTMLBoard() {
  //   for (let x = 0; x < this.spaces.length; x++) {
      
  //     for (let y = 0; y < this.spaces[x].length; y++) {
  //       this.spaces[x][y].drawSVGSpace();
  //     }
      
  //   }
  // }
  



}