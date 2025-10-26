# Gomoku AI Server

A Node.js backend server for the Gomoku AI game that provides AI move calculation services and serves the React frontend.

## Features

- **Gemini AI Integration**: Uses Google's Gemini AI for intelligent gameplay
- **Classic AI**: Implements a heuristic-based AI for offline gameplay
- **REST API**: Clean API endpoints for AI move calculations
- **Static File Serving**: Serves the built React client application
- **Move Validation**: Server-side validation of all moves
- **Error Handling**: Comprehensive error handling and fallbacks

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key (optional, for Gemini AI features)

### Installation

1. **Install server dependencies:**
   ```bash
   npm install
   ```

2. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   cd ../server
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=3001
   ```

4. **Build and start:**
   ```bash
   # Build client and copy to server
   npm run build
   
   # Start the server
   npm start
   ```

5. **Open the game:**
   Navigate to http://localhost:3001

### Development Mode

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status
- `GET /api/ai/status` - AI services availability

### AI Move Calculation
- `POST /api/ai/classic` - Get move from classic AI
- `POST /api/ai/gemini` - Get move from Gemini AI

#### Request Format
```json
{
  "board": [null, "X", "O", ...],
  "size": 15,
  "aiPlayer": "X"
}
```

#### Response Format
```json
{
  "success": true,
  "move": {
    "row": 7,
    "col": 7
  },
  "thought": "Strategic reasoning for the move",
  "aiType": "gemini"
}
```

## Project Structure

```
server/
├── server.js              # Main server entry point
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── routes/
│   └── ai.js             # AI endpoint routes
├── services/
│   ├── classicAiService.js   # Classic AI implementation
│   └── geminiService.js      # Gemini AI integration
├── utils/
│   └── gameUtils.js          # Game logic utilities
└── public/                   # Static files (built client)
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | No* | - |
| `PORT` | Server port | No | 3001 |
| `NODE_ENV` | Environment mode | No | development |

\* Required for Gemini AI functionality. Classic AI works without it.

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build client and copy to public directory
- `npm run build:client` - Build client only
- `npm run setup` - Install dependencies for both server and client

## Game Rules

Gomoku is played on a 15×15 board where players alternate placing black (X) and white (O) pieces. The objective is to be the first to form an unbroken line of five pieces horizontally, vertically, or diagonally.

## AI Implementations

### Classic AI
- Uses heuristic-based evaluation
- Considers offensive and defensive moves
- Evaluates potential winning patterns
- Works offline without external APIs

### Gemini AI
- Powered by Google's Gemini 2.5 Flash model
- Analyzes board state strategically
- Provides reasoning for each move
- Requires valid API key

## Error Handling

The server includes comprehensive error handling:
- Invalid move validation
- API key validation for Gemini
- Graceful fallbacks when services fail
- Detailed error messages in development mode

## Security Considerations

- API keys are stored server-side only
- Move validation prevents cheating
- CORS configured for client access
- Input validation on all endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the API status at `/api/ai/status`
2. Review server logs for error details
3. Ensure environment variables are properly set
4. Verify network connectivity for Gemini AI features