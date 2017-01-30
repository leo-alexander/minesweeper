document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
    cells:[]
  // cells: [{row: 0, col: 0, isMine: 0, hidden: true},
  //         {row: 0, col: 1, isMine: 0, hidden: true},
  //         {row: 0, col: 2, isMine: 0, hidden: true},
  //         {row: 1, col: 0, isMine: 0, hidden: true},
  //         {row: 1, col: 1, isMine: 0, hidden: true},
  //         {row: 1, col: 2, isMine: 0, hidden: true},
  //         {row: 2, col: 0, isMine: 0, hidden: true},
  //         {row: 2, col: 1, isMine: 0, hidden: true},
  //         {row: 2, col: 2, isMine: true, hidden: true}]
  }



function startGame () {
  newBoard();
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener("click", checkForWin);
  document.addEventListener("oncontextmenu", checkForWin);
  lib.initBoard()
  console.log(board)
}

function newBoard () {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var cell = newCell(i,j);
      board.cells.push(cell);
    }
  }
}

function newCell (i,j) {
  var cell = {
    row: i,
    col: j,
    isMine: genMine(),
    hidden: true,
  }
  return cell;
}

function genMine () {
  var num = Math.random();
  if (num < 0.24) {
    return true;
  }
  else {
    return false;
  }
}

function checkForWin () {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      console.log('Mine is not marked!');
      return;
    }
    if (!board.cells[i].isMine && board.cells[i].hidden) {
      console.log('Not mine and hidden!');
      return;
    }
  }
  lib.displayMessage('You win!');
  resetOption()
  }

function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  var a = 0;
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine === true) {
      a++;
    }
  }
  return a;
}

function resetOption() {
  document.getElementById("reset").innerHTML = "<button type='button'>Play Again?</button>";
  document.getElementById("reset").addEventListener("click", clearBoard);
}

function clearBoard() {
  var board = document.getElementsByClassName('board')[0];
  board.innerHTML = '';
  newBoard();
}
