#!/bin/bash

# BreatheFlow Netlify Deployment Script

echo "🚀 Starting BreatheFlow deployment for Netlify..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type check
echo "🔍 Running type check..."
npm run check

if [ $? -ne 0 ]; then
    echo "❌ Type check failed. Please fix the errors before deploying."
    exit 1
fi

# Build the application for Netlify
echo "🔨 Building application for Netlify..."
npm run build:netlify

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

# Check if audio files exist
if [ ! -f "client/public/audio/inhale.wav" ] || [ ! -f "client/public/audio/exhale.wav" ]; then
    echo "⚠️  Warning: Custom audio files not found. Using default audio."
fi

# Check if Netlify CLI is installed
if command -v netlify &> /dev/null; then
    echo ""
    echo "✅ Build completed successfully!"
    echo ""
    echo "🌐 Ready for Netlify deployment to: https://equanimity.foundation"
    echo ""
    echo "🚀 To deploy with Netlify CLI:"
    echo "   netlify deploy --prod"
    echo ""
    echo "🌍 Or deploy via Netlify Dashboard:"
    echo "   1. Push code to GitHub"
    echo "   2. Connect repository in Netlify"
    echo "   3. Set build command: npm run build:netlify"
    echo "   4. Set publish directory: dist/public"
    echo ""
else
    echo ""
    echo "✅ Build completed successfully!"
    echo ""
    echo "🌐 Ready for Netlify deployment to: https://equanimity.foundation"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Push your code to GitHub"
    echo "   2. Go to netlify.com and create a new site"
    echo "   3. Connect your GitHub repository"
    echo "   4. Set build command: npm run build:netlify"
    echo "   5. Set publish directory: dist/public"
    echo "   6. Add environment variables if needed"
    echo "   7. Deploy!"
    echo ""
    echo "💡 Optional: Install Netlify CLI for command-line deployment:"
    echo "   npm install -g netlify-cli"
    echo ""
fi

echo "📋 Netlify configuration:"
echo "   - Build command: npm run build:netlify"
echo "   - Publish directory: dist/public"
echo "   - Functions directory: netlify/functions"
echo ""
echo "📊 API Endpoints after deployment:"
echo "   - GET /api/health - Health check"
echo "   - GET /api/techniques - Breathing techniques"
echo "   - GET /api/session-stats - Session statistics"
echo "   - GET /api/settings - User settings"
echo ""
echo "🔒 Custom domain setup (equanimity.foundation):"
echo "   - Add domain in Netlify dashboard"
echo "   - Configure DNS records"
echo "   - SSL certificate will be automatic"
