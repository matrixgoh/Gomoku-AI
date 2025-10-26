import { BoardState, ActivePlayer } from '../types';

const API_BASE = process.env.API_URL || '/api';

export const getClassicAIMove = async (board: BoardState, size: number, aiPlayer: ActivePlayer): Promise<{ move: { row: number, col: number }, thought: string } | null> => {
    try {
        const response = await fetch(`${API_BASE}/ai/classic`, {
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
            console.error('Classic AI API error:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success && data.move) {
            return {
                move: data.move,
                thought: data.thought || "A calculated move based on board heuristics."
            };
        } else {
            console.error('Invalid response from Classic AI API:', data);
            return null;
        }

    } catch (error) {
        console.error('Error calling Classic AI API:', error);
        return null;
    }
};
