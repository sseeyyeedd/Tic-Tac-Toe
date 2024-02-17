const game=require('./game')
function minimax(board, depth, currentPlayer) {
    let maximizingPlayer = (currentPlayer === "X"); // Dynamically determine the maximizing player
    let opponentPlayer = (currentPlayer === "X" ? "O" : "X"); // Determine the opponent player

    if (game.checkWin("X", board)) {
        return 100 - depth; // If AI wins, return positive score
    } else if (game.checkWin("O", board)) {
        return -100 + depth; // If player wins, return negative score
    } else if (game.isBoardFull(board)) {
        return 0; // If it's a draw, return 0
    }

    if (maximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === " ") {
                    board[i][j] = currentPlayer;
                    let score = minimax(board, depth + 1, opponentPlayer);
                    board[i][j] = " "; // Undo the move
                    bestScore = Math.max(bestScore, score);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === " ") {
                    board[i][j] = currentPlayer;
                    let score = minimax(board, depth + 1, opponentPlayer);
                    board[i][j] = " "; // Undo the move
                    bestScore = Math.min(bestScore, score);
                }
            }
        }
        return bestScore;
    }
}

function findBestMove(board, currentPlayer) {
    let bestMove = { row: -1, col: -1 };
    let bestScore = -Infinity;
    let opponentPlayer = (currentPlayer === "X" ? "O" : "X"); // Determine the opponent player
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === " ") {
                board[i][j] = currentPlayer;
                let score = minimax(board, 0, opponentPlayer);
                board[i][j] = " "; // Undo the move
                if (score > bestScore) {
                    bestScore = score;
                    bestMove.row = i;
                    bestMove.col = j;
                }
            }
        }
    }
    return bestMove;
}

module.exports = {
    findBestMove,
    
};
