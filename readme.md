## Connect  4
Or Four in a row, as it's also called. I did this as a practice workshop after taking the Object-Oriented JavaScript course, and really liked it. Had a lot of hair-pulling moments as well. It takes a while and quite a few cups of coffee/tea to rewire your brain into tackling and solving problems in a different way.
![Screenshot of the game after a few moves](docs/pic1.png)

### How it works
It's structured around five classes: Game, Board, Player, Space and Token; and the board is drawn with SVG.

The entry point is **app.js**, here I initialize global variables, event handlers for the keyboard presses and a new instance of the Game class.

The new **Game** instance does a lot. It initializes the **Players** (two at the moment), creates a new **Board** and draws it in the screen (when the user presses the 'Start Game' button), and handles the logic flow of the game: handles the input, checks for win conditions, and updates the state of the game upon each turn.

Each **Player** object contains an array of **Token** objects (one half of the total spaces of the board), which are initialized in the constructor, differentiating from played and unused ones, and has a bit of helper methods for checking if the player has any unused token left, and returning it.

Each **Token** object has a unique id, keeps track of which player it belongs to, whether it has been played or not, and its location in the board. The methods handle the drawing of the token (inserting a DOM node in the correct place) and left, right and drop movements.

The **Board** object draws the HTML of the board and maintains an array of the total spaces.

There's 42 **Space**s (6 * 7 board), and each one has an unique id too (thus being able to match it to a particular token). When a token is dropped in a particular space, the space gets associated with that token. The SVG for each space is drawn with the *drawSVGSpace* method.

### Some afterthoughts

The most challenging parts for me:

 - The conceptualization of the overall code. The five classes are a solution of the instructor of the course, in my initial planning I had most of the ideas right but merged the Player and Token classes together, and wasn't really sure how to handle the spaces in the board. Without this help I'd have frozen for a long time, not knowing where to start.
 - The check for winning states, specially the diagonal lines. I struggled a bit with this, trying to do it in an efficient way.

In the final testing stage I found an annoying issue, but it gave me the biggest Aha! moment as well: in Firefox, the movement of the token was off. Way off. It seems no other student really noticed it (Chrome is omnipresent I guess), and I had no help at all about how to handle this.

### A wild bug appears!

The active token is moved with the moveRight and moveLeft methods, which calculate the positioning using the offsetLeft property of the token. This prop returns the distance in pixels from the left edge of the element to the left edge of the first positioned parent. In this case, the parent of the token element is the game-board-underlay div.

  

However, the value returned by offsetLeft is different in Chrome and Firefox: in the former, the border of the parent isn't included in the calculation, and in the latter it is. The original code had the Chrome behavior in mind, but in the cross-browser testing stage the issue became evident: in Firefox the moveRight method placed the token 16 pixels more to the right than it should, starting an accumulation of errors across succesive movements that would allow the token to be placed way off the board area.

  

I researched the issue, not knowing at first where the issue was, until a found [a related report in the Mozilla tracker](https://bugzilla.mozilla.org/show_bug.cgi?id=481076).

  

I struggled a bit thinking how to handle the solution: I first thought of changing the way the movement was calculated (dropping the offsetLeft property). Or maybe, adding a browser detection that would branch the movement calculation in two different ways? Then another idea came to me, perhaps I could fix this just changing the styles?

  

Since the left border of the parent element was transparent and only used as a spacer, I decided to remove the left border of game-board-underlay, and achieve the same effect giving the token an initial left offset of 16px. This way, the 16px left spacing is still enforced (with an offset property rather than a border) and the offsetLeft property reports the same values across the two browsers. The move methods work correctly as well.
