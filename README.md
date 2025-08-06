# BreatheFlow 🌬️

A beautiful, interactive breathing exercise application with customizable audio guidance and real-time visualization.

## Features

- 🧘 **Multiple Breathing Techniques**: Deep Breathing, Box Breathing, 4-7-8 Technique
- 🎵 **Custom Audio Support**: Use your own breathing audio files or synthetic tones
- 📊 **Session Tracking**: Monitor your breathing sessions and progress
- 🎨 **Beautiful UI**: Modern, responsive design with dark mode support
- ⚡ **Real-time Visualization**: Animated breathing circle with phase indicators
- 🔊 **Audio Guidance**: Synchronized audio cues for inhale/exhale phases
- 📱 **Mobile Friendly**: Optimized for all device sizes

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to use the application locally.

For production deployment to https://equanimity.foundation/, see `EQUANIMITY-DEPLOYMENT.md`.

### Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Custom Audio Setup

1. **Place your audio files** in `client/public/audio/`:
   - `inhale.wav` - for inhale sounds
   - `exhale.wav` - for exhale sounds

2. **Enable custom audio** in the app settings
3. **The audio will automatically adjust** to match your breathing technique timing

## Deployment

### Option 1: Traditional Server

```bash
# Clone the repository
git clone <your-repo-url>
cd BreatheFlow

# Install dependencies
npm install --production

# Build the application
npm run build

# Start the server
npm start
```

### Option 2: Docker

```bash
# Build the Docker image
docker build -t breatheflow .

# Run the container
docker run -p 5000:5000 breatheflow
```

### Option 3: Cloud Platforms

#### Railway
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

#### Render
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`

#### Netlify (Recommended for equanimity.foundation)
1. Connect your GitHub repository
2. Set build command: `npm run build:netlify`
3. Set publish directory: `dist/public`
4. Functions directory: `netlify/functions`
5. See `NETLIFY-DEPLOYMENT.md` for detailed instructions

#### Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`

## Environment Variables

Create a `.env` file:

```env
PORT=5000
NODE_ENV=production
```

## API Endpoints

- `GET /api/techniques` - Get all breathing techniques
- `GET /api/techniques/:id` - Get specific technique
- `GET /api/session-stats` - Get session statistics
- `POST /api/session-stats` - Save session statistics
- `GET /api/settings` - Get user settings
- `PATCH /api/settings` - Update user settings
- `GET /api/health` - Health check endpoint

## Project Structure

```
BreatheFlow/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility libraries
│   │   └── pages/        # Page components
│   └── public/
│       └── audio/        # Custom breathing audio files
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage
├── shared/               # Shared types and schemas
└── dist/                 # Production build output
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Express.js, TypeScript
- **Audio**: Web Audio API
- **Build**: Vite, esbuild
- **Deployment**: Docker, PM2, Cloud platforms

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `./deploy.sh` - Automated deployment script

### Adding New Breathing Techniques

1. Add technique data to `server/storage.ts`
2. Update breathing patterns in `client/src/lib/breathing-patterns.ts`
3. Add animation classes in `client/src/index.css`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Create an issue on GitHub
- Check the deployment guide in `DEPLOYMENT.md`
- Review the troubleshooting section

---

Made with ❤️ for better breathing and mindfulness
