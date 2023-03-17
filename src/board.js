/**
 * A basic board, the first-step for using the engine
 * @constructor
 */
class Board {
    constructor() {
        /**
         * The corresponding turn, 0 means O and 1 means X
         * Automatically re-assigned, don't move the value by your own
         * @private
         * @type {number}
         */
        this._turn = 1

        /**
         * The data shown in arrays.
         * 0 means O and 1 means X.
         * @private
         */
        this.data = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]

        /**
         * If the game is over
         * @type {Boolean}
         */
        this.gameOver = false
    }

    /**
     * Makes a move on the board.
     * @param {number} player The player that moves. 0 means O and 1 means X
     * @param {number} cell The cell, cells are numbered from 1-9.
     * @param {Boolean} check Check at the end of the turn if the game is over (recommended and by default). If not true, then you should check it manually via checkGameOver() at the end of the turn:
     */
    makeMove(player, cell, check = true) {
        if (this.gameOver) throw new InvalidMovement("Game is already over.")

        if (player !== 0 && player !== 1) throw new InvalidMovement("The player is neither 0 (O) or 1 (X).")
        if (cell < 1 || cell > 9) throw new InvalidMovement("Invalid cell. Cells are numbered from 1 to 9.")

        //console.debug(`${player} played on ${cell}`)
        if (player !== this._turn) throw new InvalidMovement(`Is not the turn of that player. Got ${player}, expected ${this.__turn}`)

        const parsedCell = this._parseCell(cell)
        if (typeof parsedCell == "number") throw new InvalidMovement("This cell is already occupied.")

        this.data[parsedCell.row][parsedCell.col] = this._turn // set value

        const nextTurn = this._turn == 0 ? 1 : 0
        this._turn = nextTurn// next turn

        check ? this.checkGameOver() : null
    }

    /**
     * Checks if the game is over (tie, win by row, by column or by diagonal).
     * Returns "tie" if there's a tie, the winner or null if the game can continue.
     * @returns {number|string|null}
     */
    checkGameOver() {
        const checkRow = (row) => {
            const first = this.data[row][0]
            if (first === null) {
                return null
            }
            for (let i = 1; i < 3; i++) {
                if (this.data[row][i] !== first) {
                    return null
                }
            }
            return first
        }
        const checkColumn = (col) => {
            const first = this.data[0][col]
            if (first === null) {
                return null
            }
            for (let i = 1; i < 3; i++) {
                if (this.data[i][col] !== first) {
                    return null
                }
            }
            return first
        }
        const checkDiagonal = () => {
            const center = this.data[1][1]
            if (center === null) {
                return null
            }
            if (this.data[0][0] === center && center === this.data[2][2]) {
                return center
            }
            if (this.data[0][2] === center && center === this.data[2][0]) {
                return center
            }
            return null
        }
        // check rows
        for (let row = 0; row < 3; row++) {
            const winner = checkRow(row)
            if (winner !== null) {
                this.gameOver = true
                return winner
            }
        }
        // check columns
        for (let col = 0; col < 3; col++) {
            const winner = checkColumn(col)
            if (winner !== null) {
                this.gameOver = true
                return winner
            }
        }
        // check diagonal
        const winner = checkDiagonal()
        if (winner !== null) {
            this.gameOver = true
            return winner
        }
        // check for tie
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.data[row][col] === null) {
                    // there is at least one empty cell, the game is not over
                    return null
                }
            }
        }
        // all cells are occupied, it's a tie
        this.gameOver = true
        return "tie"
    }

    /**
     * Parses a cell from 1-9 to actual board data.
     * Used internally, do not pass it to cell from makeMove.
     * @param {number} cell The cell from 1-9.
     * @private
     */
    _parseCell(cell) {
        let row = 0
        let col = 0

        if (cell <= 3) row = 0
        else if (cell <= 6) row = 1
        else row = 2

        if (cell <= 3) {
            row = 0;
            col = cell - 1;
        } else if (cell <= 6) {
            row = 1;
            col = cell - 4;
        } else {
            row = 2;
            col = cell - 7;
        }

        // console.debug(`Parsed cell ${cell} as row ${row} col ${col}`)

        return {
            row,
            col,
            value: this.data[row][col]
        }
    }
}

class InvalidMovement extends Error {
    constructor() {
        super()
        this.name = "InvalidMovementError"
    }
}

module.exports = Board;