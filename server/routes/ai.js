import express from 'express';
import { getClassicAIMove } from '../services/classicAiService.js';
import { getGeminiAIMove } from '../services/geminiService.js';
import { isValidMove } from '../utils/gameUtils.js';

const router = express.Router();

// Validation middleware for AI move requests
const validateMoveRequest = (req, res, next) => {
    const { board, size, aiPlayer } = req.body;
    
    // Validate required fields
    if (!Array.isArray(board)) {
        return res.status(400).json({ error: 'Board must be an array' });
    }
    
    if (typeof size !== 'number' || size <= 0) {
        return res.status(400).json({ error: 'Size must be a positive number' });
    }
    
    if (aiPlayer !== 'X' && aiPlayer !== 'O') {
        return res.status(400).json({ error: 'aiPlayer must be "X" or "O"' });
    }
    
    // Validate board size matches expected size
    if (board.length !== size * size) {
        return res.status(400).json({ 
            error: `Board length ${board.length} does not match expected size ${size * size}` 
        });
    }
    
    // Validate board contents
    const validValues = ['X', 'O', null];
    for (let i = 0; i < board.length; i++) {
        if (!validValues.includes(board[i])) {
            return res.status(400).json({ 
                error: `Invalid board value at index ${i}: ${board[i]}` 
            });
        }
    }
    
    next();
};

// Classic AI move endpoint
router.post('/classic', validateMoveRequest, async (req, res) => {
    try {
        const { board, size, aiPlayer } = req.body;
        
        const result = getClassicAIMove(board, size, aiPlayer);
        
        if (!result) {
            return res.status(400).json({ 
                error: 'No valid moves available',
                move: null,
                thought: 'The board is full or no valid moves found.'
            });
        }
        
        // Validate the returned move
        const { move } = result;
        if (!isValidMove(move.row, move.col, board, size)) {
            return res.status(500).json({ 
                error: 'AI generated an invalid move',
                move: null,
                thought: 'Internal error: AI suggested an invalid position.'
            });
        }
        
        res.json({
            success: true,
            move: result.move,
            thought: result.thought,
            aiType: 'classic'
        });
        
    } catch (error) {
        console.error('Error in classic AI endpoint:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'AI calculation failed'
        });
    }
});

// Gemini AI move endpoint
router.post('/gemini', validateMoveRequest, async (req, res) => {
    try {
        const { board, size, aiPlayer } = req.body;
        
        // Check if Gemini API key is configured
        if (!process.env.GEMINI_API_KEY) {
            return res.status(503).json({ 
                error: 'Gemini AI service not configured',
                message: 'GEMINI_API_KEY environment variable not set'
            });
        }
        
        const result = await getGeminiAIMove(board, size, aiPlayer);
        
        if (!result) {
            return res.status(400).json({ 
                error: 'No valid moves available',
                move: null,
                thought: 'The board is full or no valid moves found.'
            });
        }
        
        // Validate the returned move
        const { move } = result;
        if (!isValidMove(move.row, move.col, board, size)) {
            return res.status(500).json({ 
                error: 'AI generated an invalid move',
                move: null,
                thought: 'Internal error: AI suggested an invalid position.'
            });
        }
        
        res.json({
            success: true,
            move: result.move,
            thought: result.thought,
            aiType: 'gemini'
        });
        
    } catch (error) {
        console.error('Error in Gemini AI endpoint:', error);
        res.status(500).json({ 
            error: 'Gemini AI service error',
            message: process.env.NODE_ENV === 'development' ? error.message : 'AI calculation failed'
        });
    }
});

// Test endpoint to validate AI service availability
router.get('/status', (req, res) => {
    const status = {
        classic: 'available',
        gemini: process.env.GEMINI_API_KEY ? 'available' : 'not-configured'
    };
    
    res.json({
        status,
        timestamp: new Date().toISOString()
    });
});

export default router;