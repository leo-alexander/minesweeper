document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [{row: 0, col: 0, isMine: 0, hidden: true},
          {row: 0, col: 1, isMine: 0, hidden: true},
          {row: 0, col: 2, isMine: 0, hidden: true},
          {row: 1, col: 0, isMine: 0, hidden: true},
          {row: 1, col: 1, isMine: 0, hidden: true},
          {row: 1, col: 2, isMine: 0, hidden: true},
          {row: 2, col: 0, isMine: 0, hidden: true},
          {row: 2, col: 1, isMine: 0, hidden: true},
          {row: 2, col: 2, isMine: true, hidden: true}]
  }

function startGame () {
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener("click", checkForWin);
  document.addEventListener("oncontextmenu", checkForWin);
  lib.initBoard()
}

function checkForWin () {
  for (var i = 0; i < board.cells.length; i++)
    if (board.cells[i].isMine && board.cells[i].isMarked) {
      return;
    }
    if (!board.cells[i].isMine && board.cells[i].hidden) {
      return;
    }
    lib.displayMessage('You win!');
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
