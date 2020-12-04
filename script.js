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

  document.getElementById('reset-board').addEventListener('click', function() {resetBoard()});
  document.getElementById('clear-names').addEventListener('click', function() {clearNames()});
  

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

  const placement = (grid, marker) => {
    if (flowController.isGameOver() == false) {
      eval(grid).assignMarker(marker);
    }
  }

  const clearSpaces = () => {
    spaces.forEach(space => space.assignMarker(""));
  }

  function spaceList() {
    spacesArray = []
    spaces.forEach(space => spacesArray.push(space));
    console.log(spacesArray)
    return spacesArray
  }

  function boardUpdate() {
    return spaces.forEach(space => document.getElementById(space.grid).innerHTML = space.marker);
  }

  function boardButtons() {
    spaces.forEach(space => document.getElementById(space.grid).addEventListener('click', function() { if (space.marker == "") {placement(space.grid, flowController.whoseTurn().marker); flowController.turnProcess() }}, true));
  };

  function resetBoard() {
    clearSpaces();
    boardUpdate();
    console.log('resetting')
  }

  function clearNames() {
    document.getElementById('playerX').value="";
    document.getElementById('playerO').value="";
  }

  return {
    spaceList,
    boardUpdate,
    boardButtons,
    resetBoard
  };

})();

const createPlayer = ({marker, name}) => ({
  marker,
  name,
});

const displayController = (function() {
  
  function display(msg) {
    document.getElementById("message-board-message").innerHTML = `${msg}`
  };

  return {
    display
  };
})();

const flowController = (function() {
  var gameOver = false;

  function step() {
    count = 0;
    gameBoard.spaceList().forEach(item => {
      if (item.marker != "") {count++}
    });
    return count;
  }
  
  function turnProcess() {
    if (gameOver == false) { gameBoard.boardUpdate(); }
    if (checkWin() == true) {gameOver = true};
    if (gameOver == false) {
      whoseTurn();
    }
  }
  
  function isGameOver() {
    if (gameOver == false) {return false} else {return true}
  }
  
  function whoseTurn() {
    if (step() % 2 == 0) {
      currentTurn = playerXobj;
    } else {
      currentTurn = playerOobj;
    }
    displayController.display(`Your Turn, ${currentTurn.name}`)
    return currentTurn;
  };

  function checkWin() {
    const letters = ["X", "O"];
    var outcome = false;
    var a1 = gameBoard.spaceList()[0];
    var a2 = gameBoard.spaceList()[1];
    var a3 = gameBoard.spaceList()[2];
    var b1 = gameBoard.spaceList()[3];
    var b2 = gameBoard.spaceList()[4];
    var b3 = gameBoard.spaceList()[5];
    var c1 = gameBoard.spaceList()[6];
    var c2 = gameBoard.spaceList()[7];
    var c3 = gameBoard.spaceList()[8];
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
        displayController.display(`${currentTurn.name} wins`)
        outcome = true;
      } else if (step() == 9 && outcome == false) {
        displayController.display(`It's a tie`)
        outcome = true;
      }
    });
    return outcome;
  }
  
  var buttonX = document.getElementById('saveX');
  var buttonO = document.getElementById('saveO');
  var playerXfield = document.getElementById('playerX').value;
  var playerOfield = document.getElementById('playerO').value;
  var callbackX = saveName('X', playerXfield);
  var callbackO = saveName('O', playerOfield);
  document.getElementById('reset-board').addEventListener('click', function() {
    getNames()
  });

  function isEmpty(str) {
    return (!str || 0 === str.length);
}

  function saveName(marker, name) {
    return function() {
      if (marker == 'X') {
        playerXobj = createPlayer({marker, name});
        buttonX.removeEventListener('click', callbackX);
        buttonX.disabled = true;
        document.getElementById('playerX').disabled = true;
      } else if (marker == 'O') {
        playerOobj = createPlayer({marker, name});
        buttonO.removeEventListener('click', callbackO);
        buttonO.disabled = true;
        document.getElementById('playerO').disabled = true;
      };
      if (isEmpty(playerXobj.name) && isEmpty(playerOobj.name)) {
        gameSequence();
      }
    };
  };

  function getNames() {
    playerXobj = null;
    playerOobj = null;
    displayController.display(`Enter player names`)
    document.getElementById('playerX').disabled = false;
    document.getElementById('playerO').disabled = false;
    buttonX.disabled = false;
    buttonO.disabled = false;
    buttonX.addEventListener('click', callbackX);
    buttonO.addEventListener('click', callbackO);
    gameOver = false;
  };

  function gameSequence() {
    gameBoard.boardUpdate(); 
    whoseTurn();
  }
  
  getNames();
  gameBoard.boardButtons();  

  return {
    turnProcess,
    whoseTurn,
    isGameOver,
    getNames
  }

})();