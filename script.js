const gameBoard = (() => {
  function Space(grid, marker) {
    this.grid = grid
    this.marker = marker
  }

  Space.prototype.assignMarker = function(marker) {
    this.marker = marker;
  }

  var a1 = new Space("a1", "X");
  var a2 = new Space("a2", "O");
  var a3 = new Space("a3", "");
  var b1 = new Space("b1", "");
  var b2 = new Space("b2", "");
  var b3 = new Space("b3", "X");
  var c1 = new Space("c1", "O");
  var c2 = new Space("c2", "X");
  var c3 = new Space("c3", "");

  var spaces = [a1, a2, a3, b1, b2, b3, c1, c2, c3]

  const placement = (grid, marker) => eval(grid).assignMarker(marker);

  const spaceList = () => spaces.forEach(space => console.log(space));

  const spaceListNaked = () => spaces.forEach(space => console.log(String(space.grid)));

  const boardUpdate = () => spaces.forEach(space => document.getElementById(space.grid).innerHTML = space.marker);

  return {
    placement,
    spaceList,
    spaceListNaked,
    boardUpdate
  };
  

})()

const displayController = (() => {
  
  // gameBoard.spaceList().forEach(element => document.getElementById(element).addEventListener('click', console.log('click')));
  gameBoard.boardUpdate()
  gameBoard.spaceListNaked()
})()