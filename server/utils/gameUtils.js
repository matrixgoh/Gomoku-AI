// Type definitions for the server
export const Player = {
  X: 'X',
  O: 'O',
  NULL: null
};

export const PlayerType = {
  HUMAN: 'human',
  CLASSIC: 'classic',
  GEMINI: 'gemini'
};

// Utility function to validate move coordinates
export const isValidMove = (row, col, board, size) => {
  if (row < 0 || row >= size || col < 0 || col >= size) {
    return false;
  }
  const index = row * size + col;
  return board[index] === null;
};

// Convert 2D coordinates to 1D index
export const coordsToIndex = (row, col, size) => {
  return row * size + col;
};

// Convert 1D index to 2D coordinates
export const indexToCoords = (index, size) => {
  return {
    row: Math.floor(index / size),
    col: index % size
  };
};

/**
 * Dynamically generates winning conditions for a square board.
 * @param {number} size - The size of the board (e.g., 15 for 15x15).
 * @param {number} inARow - The number of pieces needed to win (e.g., 5 for Gomoku).
 * @returns {number[][]} An array of winning condition arrays.
 */
export function generateWinningConditions(size, inARow) {
    const conditions = [];
    
    // Rows
    for (let r = 0; r < size; r++) {
        for (let c = 0; c <= size - inARow; c++) {
            const row = [];
            for (let i = 0; i < inARow; i++) { 
                row.push(r * size + c + i); 
            }
            conditions.push(row);
        }
    }
    
    // Columns
    for (let c = 0; c < size; c++) {
        for (let r = 0; r <= size - inARow; r++) {
            const col = [];
            for (let i = 0; i < inARow; i++) { 
                col.push((r + i) * size + c); 
            }
            conditions.push(col);
        }
    }
    
    // Diagonal (top-left to bottom-right)
    for (let r = 0; r <= size - inARow; r++) {
        for (let c = 0; c <= size - inARow; c++) {
            const diag = [];
            for (let i = 0; i < inARow; i++) { 
                diag.push((r + i) * size + (c + i)); 
            }
            conditions.push(diag);
        }
    }
    
    // Diagonal (top-right to bottom-left)
    for (let r = 0; r <= size - inARow; r++) {
        for (let c = size - 1; c >= inARow - 1; c--) {
            const diag = [];
            for (let i = 0; i < inARow; i++) { 
                diag.push((r + i) * size + (c - i)); 
            }
            conditions.push(diag);
        }
    }
    
    return conditions;
}

// Check if there's a winner on the current board
export const checkWinner = (board, size, winConditionLength = 5) => {
    const winningConditions = generateWinningConditions(size, winConditionLength);
    
    for (const winCondition of winningConditions) {
        const firstCell = board[winCondition[0]];
        if (firstCell && winCondition.every(index => board[index] === firstCell)) {
            return {
                winner: firstCell,
                winningLine: winCondition
            };
        }
    }
    
    // Check for draw
    if (!board.includes(null)) {
        return { winner: 'Draw', winningLine: [] };
    }
    
    return { winner: null, winningLine: [] };
};