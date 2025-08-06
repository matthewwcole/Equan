#!/bin/bash

# BreatheFlow Deployment Script for equanimity.foundation

echo "🚀 Starting BreatheFlow deployment for equanimity.foundation..."

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

# Set environment variables for equanimity.foundation
export DOMAIN=https://equanimity.foundation
export NODE_ENV=production

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

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

# Check if audio files exist
if [ ! -f "client/public/audio/inhale.wav" ] || [ ! -f "client/public/audio/exhale.wav" ]; then
    echo "⚠️  Warning: Custom audio files not found. Using default audio."
fi

echo "✅ Build completed successfully!"
echo ""
echo "🌐 Domain: https://equanimity.foundation"
echo ""
echo "🎯 To start the production server:"
echo "   npm start"
echo ""
echo "🐳 To deploy with Docker:"
echo "   docker build -t breatheflow ."
echo "   docker run -p 5000:5000 breatheflow"
echo ""
echo "📋 Production checklist for equanimity.foundation:"
echo "   - [ ] Environment variables configured"
echo "   - [ ] SSL certificate configured"
echo "   - [ ] DNS records configured"
echo "   - [ ] Process manager configured (PM2, Docker, etc.)"
echo "   - [ ] Monitoring/logging set up"
echo "   - [ ] CDN configured (optional)"
echo ""
echo "🔒 SSL Certificate Setup:"
echo "   - Let's Encrypt: sudo certbot --nginx -d equanimity.foundation"
echo "   - Cloudflare: Enable SSL/TLS encryption mode 'Full (strict)'"
echo ""
echo "📊 Monitoring:"
echo "   - Health check: https://equanimity.foundation/api/health"
echo "   - Set up uptime monitoring"
echo "   - Configure error tracking (Sentry)"
