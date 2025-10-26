# Gomoku AI - Full Stack Application

A full-stack Gomoku (Five-in-a-Row) game with AI opponents including Google's Gemini AI and a classic heuristic-based AI.

## Project Structure

```
├── client/          # React frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Node.js backend server
│   ├── services/
│   ├── routes/
│   ├── utils/
│   └── package.json
└── README.md       # This file
```

## Quick Start

### Option 1: Automated Setup
```bash
# Run the setup script to install all dependencies
./setup.sh

# Or manually:
cd server && npm run setup
```

### Option 2: Manual Setup
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client  
npm install

# Return to server directory
cd ../server

# Copy environment template
cp .env.example .env

# Edit .env file and add your Gemini API key
nano .env  # or use your preferred editor

# Build and start
npm run build
npm start
```

### Option 3: Development Mode
```bash
# Terminal 1: Start the server
cd server
npm run dev

# Terminal 2: Start the client (in development)
cd client
npm run dev
```

## Environment Setup

1. **Get a Gemini API Key** (optional but recommended):
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy it to your `.env` file in the server directory

2. **Configure Environment**:
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3001
   NODE_ENV=development
   ```

## Game Features

- **15×15 Gomoku Board**: Classic game rules
- **Three Game Modes**:
  - Human vs Human
  - Human vs Classic AI
  - Human vs Gemini AI
- **Smart AI Opponents**:
  - Classic AI uses strategic heuristics
  - Gemini AI provides reasoning for moves
- **Real-time Gameplay**: Smooth, responsive interface
- **Score Tracking**: Keep track of wins
- **Sound Effects**: Audio feedback for moves

## Architecture

### Frontend (React + TypeScript)
- **Vite** for fast development and building
- **TypeScript** for type safety
- **Responsive Design** works on desktop and mobile
- **Component-based** architecture

### Backend (Node.js + Express)
- **RESTful API** for AI move calculations
- **Server-side validation** for game rules
- **Modular service architecture**
- **Error handling and fallbacks**

### AI Integration
- **Gemini AI**: Uses Google's latest language model
- **Classic AI**: Heuristic-based algorithm
- **Move validation**: Server-side validation prevents cheating

## Available Scripts

### Server Scripts
```bash
cd server

npm start          # Start production server
npm run dev        # Start development server
npm run build      # Build client and deploy to server
npm run setup      # Install dependencies for both client and server
```

### Client Scripts  
```bash
cd client

npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## API Documentation

### Endpoints
- `GET /api/health` - Health check
- `GET /api/ai/status` - AI service status
- `POST /api/ai/classic` - Get classic AI move
- `POST /api/ai/gemini` - Get Gemini AI move

### Request Format
```json
{
  "board": [null, "X", "O", null, ...],
  "size": 15,
  "aiPlayer": "X"
}
```

## Deployment

### Production Build
```bash
cd server
npm run build  # Builds client and copies to server/public
npm start      # Starts production server
```

### Docker (Optional)
```bash
# Build image
docker build -t gomoku-ai .

# Run container
docker run -p 3001:3001 -e GEMINI_API_KEY=your_key gomoku-ai
```

## Development Tips

1. **Client Development**: Run client in dev mode (`npm run dev`) for hot reloading
2. **API Testing**: Use `/api/ai/status` to check service availability  
3. **Debugging**: Check browser console and server logs for errors
4. **Environment**: Make sure `.env` is configured in server directory

## Troubleshooting

### Common Issues

1. **"Gemini service not configured"**
   - Add `GEMINI_API_KEY` to server/.env file
   - Classic AI will still work without it

2. **"API endpoint not found"**
   - Make sure server is running on port 3001
   - Check that client proxy is configured correctly

3. **"Module not found" errors**
   - Run `npm install` in both client and server directories
   - Clear node_modules and reinstall if needed

4. **Build fails**
   - Ensure all dependencies are installed
   - Check TypeScript errors in client code

### Performance
- Classic AI responds in ~100ms
- Gemini AI may take 1-3 seconds depending on network
- Board calculations are optimized for 15×15 grid

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for intelligent gameplay
- React and Vite communities for excellent tooling
- Contributors and testers