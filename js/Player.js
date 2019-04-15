class Player {
  constructor(name, id, color, active = false) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;
    this.tokens = this.createTokens(21);
  }

  /**
   * Gets tokens not played yet.
   * @return {array} Array of unused tokens.
   */
  get unusedTokens() {
    return this.tokens.filter(elem => !elem.dropped);
  }



  /**
   * Returns the first unused token in the unused tokens array. That'd be the active token to be played.
   * @return {object} First token in the array of unused tokens.
   */
  get activeToken() {
    return this.unusedTokens[0];
  }

  /**
   * Creates token objects for player
   * @param     {Number}    num - Integer of token objects to be created
   * @returns   {Array}     An array of the newly created token objects
   */
  createTokens(num) {
    const tokenArray = [];
    for (let i = 0; i < num; i++) {
      let newToken = new Token(i, this);
      tokenArray.push(newToken);
    }
    return tokenArray;
  }


  /**
 * Check if a player has any undropped tokens left
 * @return {Boolean} 
 */
  hasMoreTokens() {
    (this.unusedTokens.length === 0) ? false : true;
  }




}