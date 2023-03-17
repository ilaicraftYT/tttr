const Board = require("../src/board")

const board = new Board()

// helper function to format the board data for printing
function formatData(data) {
  let output = ""
  for (let row of data) {
    output += "|"
    for (let cell of row) {
      if (cell === null) {
        output += "   |"
      } else if (cell === 0) {
        output += " O |"
      } else {
        output += " X |"
      }
    }
    output += "\n"
  }
  return output
}

// make some moves and print the board and the winner after each move
board.makeMove(1, 1)
console.log(board.checkGameOver())

console.log(formatData(board.data))

board.makeMove(0, 5)
console.log(board.checkGameOver())

console.log(formatData(board.data))

board.makeMove(1, 9)
console.log(board.checkGameOver())

console.log(formatData(board.data))

board.makeMove(0, 6)
console.log(board.checkGameOver())

console.log(formatData(board.data))

board.makeMove(1, 2)
console.log(board.checkGameOver())

console.log(formatData(board.data))

board.makeMove(0, 3)
console.log(board.checkGameOver())

console.log(formatData(board.data))

board.makeMove(1, 7)
console.log(board.checkGameOver())

console.log(formatData(board.data))

board.makeMove(0, 8)
console.log(board.checkGameOver())

console.log(formatData(board.data))

board.makeMove(1, 4)
console.log(board.checkGameOver())

console.log(formatData(board.data))