const gameBoard = (() => {
  class Space {
    constructor(grid, marker) {
      this.grid = grid;
      this.htmlElement = document.getElementById(`${grid}`)
      this.marker = marker;
    }
    assignMarker(marker) {
      this.marker = marker;
    }
  }

  var boardArray = []

  function buildBoard(num) {
    for (x = 0; x < num; x++) {
      boardArray.push(new Space(x, ""));
    }
    return boardArray;
  }

  let placement = function(ev) {
    boardArray[ev.target.id].assignMarker(flowController.whoseTurn());
    updateHTML(boardArray[ev.target.id].htmlElement, boardArray[ev.target.id].marker);
    this.removeEventListener('click', placement);
    flowController.nextTurn();
  }

  function boardListenersAdd(ary=boardArray) {
    ary.forEach(element => element.htmlElement.addEventListener('click', placement))
  }

  function boardListenersRemove(ary) {
    ary.forEach(element => element.htmlElement.removeEventListener('click', placement))
  }
  
  function clearBoard() {
    boardArray.forEach (element => element.assignMarker(""));
    boardArray.forEach (element => updateHTML(element.htmlElement, ""));
    boardListenersRemove(boardArray);
  }

  function getBoard() {
    return boardArray
  }

  function updateHTML(grid, marker) {
    document.getElementById(`${grid.id}`).innerHTML = marker
  }

  return {
    buildBoard,
    getBoard,
    clearBoard,
    boardListenersAdd
  };

})();

const displayController = (() => {
  var msg = "";

  function displayMessage(msg) {
    document.getElementById('message-board-message').innerHTML = msg
  }

  return {
    displayMessage
  }

})();

const flowController = (() => {
  var currentTurnX = true;
  var currentTurn;
  
  const playerFactory = (name, marker) => {
    return {name, marker}
  }

  var playerX = playerFactory("X", "X")
  var playerO = playerFactory("O", "O")

  let saveNames = (function(ev) {
    var validNames = false;
    var xName = document.getElementById('playerX');
    var oName = document.getElementById('playerO');
    xName !== "" ? playerX.name = xName : playerX.name = "X";
    oName !== "" ? playerO.name = oName : playerO.name = "O";
    gameBoard.boardListenersAdd()
    }
  );

  let clearNames = function(ev) {
    console.log(ev);
  };

  let resetBoard = function() {
    gameBoard.clearBoard();
    currentTurnX = true;
  };

  function addMessageBoardListners() {
    document.getElementById('save-names').addEventListener('click', saveNames)
    document.getElementById('reset-board').addEventListener('click', resetBoard)
    document.getElementById('clear-names').addEventListener('click', clearNames)
  }

  (function preGame() {
    displayController.displayMessage(`Enter Players' Names.`);
    addMessageBoardListners();
  })()
  
  function whoseTurn() {
    currentTurnX ? currentTurn = "X" : currentTurn = "O";
    return currentTurn;
  }
  
  function nextTurn() {
    currentTurnX = !currentTurnX
  }


  return {
    whoseTurn,
    nextTurn
  }
})();




board = gameBoard.buildBoard(9);