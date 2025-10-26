import { BoardState, ActivePlayer } from '../types';

interface AIResponse {
    move: { row: number, col: number };
    thought: string;
}

const API_BASE = process.env.API_URL || '/api';

export const getAIMove = async (board: BoardState, size: number, aiPlayer: ActivePlayer): Promise<AIResponse | null> => {
    try {
        const response = await fetch(`${API_BASE}/ai/gemini`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                board,
                size,
                aiPlayer
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Gemini AI API error:', errorData);
            
            // If Gemini is not available, try fallback
            if (response.status === 503) {
                console.log('Gemini service not available, using fallback logic.');
                return getFallbackMove(board, size);
            }
            
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success && data.move) {
            return {
                move: data.move,
                thought: data.thought || "A strategic move."
            };
        } else {
            console.error('Invalid response from Gemini API:', data);
            return getFallbackMove(board, size);
        }

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return getFallbackMove(board, size);
    }
};

// Fallback function for when Gemini API fails
const getFallbackMove = (board: BoardState, size: number): AIResponse | null => {
    const availableMoves = board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
    if (availableMoves.length > 0) {
        const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        return {
            move: {
                row: Math.floor(randomIndex / size),
                col: randomIndex % size
            },
            thought: "I had a momentary lapse of judgment and chose a random spot."
        };
    }
    return null;
};
