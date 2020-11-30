var gameBoard = (function() {
  class Space {
    constructor(grid, marker) {
      this.grid = grid;
      this.marker = marker;
    }
    assignMarker(marker) {
      this.marker = marker;
    }
  }

  
  var a1 = new Space("a1", "");
  var a2 = new Space("a2", "");
  var a3 = new Space("a3", "");
  var b1 = new Space("b1", "");
  var b2 = new Space("b2", "");
  var b3 = new Space("b3", "");
  var c1 = new Space("c1", "");
  var c2 = new Space("c2", "");
  var c3 = new Space("c3", "");

  var spaces = [a1, a2, a3, b1, b2, b3, c1, c2, c3];
  var step = 0;

  const placement = (grid, marker) => eval(grid).assignMarker(marker);

  function spaceList() {
    spacesArray = []
    spaces.forEach(space => spacesArray.push(space));
    console.log(spacesArray)
    return spacesArray
  }

  const boardUpdate = () => spaces.forEach(space => document.getElementById(space.grid).innerHTML = space.marker);

  function nextTurn() {
    step++;
  }
  
  function checkWin() {
    const letters = ["X", "O"];
    var outcome = false;
    letters.forEach(letter => {
      if ((a1.marker === letter && a2.marker === letter && a3.marker === letter)  || 
      (b1.marker === letter && b2.marker === letter && b3.marker === letter) ||
      (c1.marker === letter && c2.marker === letter && c3.marker === letter) ||
      (a1.marker === letter && b1.marker === letter && c1.marker === letter) ||
      (a2.marker === letter && b2.marker === letter && c2.marker === letter) ||
      (a3.marker === letter && b3.marker === letter && c3.marker === letter) ||
      (a1.marker === letter && b2.marker === letter && c3.marker === letter) ||
      (a3.marker === letter && b2.marker === letter && c1.marker === letter))
      {
        document.getElementById("message-board-message").innerHTML = `${currentTurn} wins!!!`
        outcome = true;
      } else if (step == 8 && outcome == false) {
        document.getElementById("message-board-message").innerHTML = `It's a tie!!!`
        outcome = true;
      }
    });
    return outcome;
  }

  function whoseTurn() {
    if (step % 2 == 0) {
      currentTurn = "X";
    } else {
      currentTurn = "O";
    }
    document.getElementById("message-board-message").innerHTML = `Your Turn, ${currentTurn}`
    return currentTurn;
  }
  return {
    placement,
    spaceList,
    boardUpdate,
    nextTurn,
    whoseTurn,
    checkWin
  };
  

})()

const flowController = (function() {

})

const displayController = (function() {

  function placeMarker(grid) {
    document.getElementById(grid).removeEventListener('click', function() {placeMarker(element.grid)});
    gameBoard.placement(grid, gameBoard.whoseTurn());
    gameBoard.boardUpdate();
    if (gameBoard.checkWin() == false) {
      gameBoard.nextTurn();
      console.log(gameBoard.whoseTurn())}
  }

  function addListener(element) {
    if (element.marker == "") {
      document.getElementById(element.grid).addEventListener('click', function() { if (element.marker == "") {placeMarker(element.grid)}});
    }
  }

  gameBoard.boardUpdate()
  gameBoard.whoseTurn()
  gameBoard.spaceList().forEach(element => addListener(element)) 
  
})()
