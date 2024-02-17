const readline = require('readline');
const TicTactician=require('./TicTactician')
const game=require('./game')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
];

let computerToPlay = true;
let computerSign = " ";

async function main() {
    while (true) {
        if (isBoardEmpty(board)) {
            await askForPlayerChoice();
        }
        printBoard();
        if (computerToPlay) {
            console.log("cm")
            let best= TicTactician.findBestMove(board,computerSign)
            board[best.row][best.col]=computerSign
            if (game.checkWin(computerSign,board)) {
                console.log('I won! You are weak!')
                printBoard()
                emptyBoard()
                continue;
            }
        } else {
            await askPlayerMove();
            if (game.checkWin(computerSign === "X" ? "O" : "X",board)) {
                console.log('You won! Congratulations!')
                printBoard()
                emptyBoard()
                continue
            }
        }
        if (game.isBoardFull(board)) {
            console.log('Draw')
            printBoard()
            emptyBoard()
            continue
        }
        computerToPlay=!computerToPlay
    }
    
}

async function askForPlayerChoice() {
    return new Promise((resolve, reject) => {
        rl.question('Enter 1 to play first or enter 2 to play second: ', (number) => {
            if (number == 1) {
                computerToPlay = false
                computerSign = "O"
            } else if (number == 2) {
                computerToPlay = true
                computerSign = "X"
            } else {
                console.log('Invalid input. Please enter 1 or 2.')
                return askForPlayerChoice()
            }
            console.log(`You chose to play as ${computerSign}`)
            resolve()
        });
    });
}

async function askPlayerMove() {
    return new Promise((resolve, reject) => {
        rl.question('What is your move? (e.g., A1, B2, C3): ', (move) => {
            let x = -1;
            let y = -1;
            switch (move[0].toLowerCase()) {
                case 'a':
                    x = 0;
                    break;
                case 'b':
                    x = 1;
                    break;
                case 'c':
                    x = 2;
                    break;
            }
            y = parseInt(move[1]) - 1;
            if (!(x <= 2 && x >= 0 && y <= 2 && y >= 0)) {
                console.log('Invalid input.');
                resolve(askPlayerMove());
            } else if (!isLegalInput(x, y)) {
                console.log('Invalid input. This square is not empty!');
                resolve(askPlayerMove());
            } else {
                board[x][y] = computerSign === "X" ? "O" : "X";
                resolve();
            }
        });
    });
}

function printBoard() {
    console.log("  1 | 2 | 3 ");
    console.log(" -----------");
    console.log("A " + board[0].join(" | "));
    console.log("  -----------");
    console.log("B " + board[1].join(" | "));
    console.log("  -----------");
    console.log("C " + board[2].join(" | "));
}

function isBoardEmpty() {
    return board.every(row => row.every(cell => cell === " "));
}

function emptyBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = " ";
        }
    }
}

function isLegalInput(x, y) {
    return board[x][y] == " ";
}


main();
