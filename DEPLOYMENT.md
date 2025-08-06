# BreatheFlow Deployment Guide

## Domain: https://equanimity.foundation/

### Quick Deploy

#### 1. Build the Application
```bash
npm run build
```

#### 2. Start Production Server
```bash
npm start
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Domain Configuration
DOMAIN=https://equanimity.foundation
BASE_URL=https://equanimity.foundation

# Optional: Database Configuration
# DATABASE_URL=your_database_url_here

# Optional: Security
# SESSION_SECRET=your_session_secret_here
```

## Deployment Options

### Option 1: Traditional VPS/Server

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd BreatheFlow
   ```

2. **Install dependencies**
   ```bash
   npm install --production
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Set up process manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name "breatheflow"
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx (recommended)**
   ```nginx
   server {
       listen 80;
       server_name equanimity.foundation www.equanimity.foundation;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 2: Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t breatheflow .
docker run -p 5000:5000 breatheflow
```

### Option 3: Cloud Platforms

#### Railway
1. Connect your GitHub repository
2. Set environment variables in Railway dashboard:
   - `DOMAIN=https://equanimity.foundation`
   - `NODE_ENV=production`
3. Deploy automatically
4. Configure custom domain in Railway settings

#### Render
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Set environment variables
5. Configure custom domain in Render dashboard

#### Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Set environment variables
5. Configure custom domain in Vercel dashboard

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist/public`
4. Set environment variables
5. Configure custom domain in Netlify dashboard

## SSL Certificate Setup

### Let's Encrypt (Recommended)
```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d equanimity.foundation -d www.equanimity.foundation

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare (Alternative)
1. Add domain to Cloudflare
2. Update nameservers
3. Enable SSL/TLS encryption mode: "Full (strict)"
4. Configure DNS records

## Production Checklist

- [ ] Environment variables configured
- [ ] Application built (`npm run build`)
- [ ] Static files served correctly
- [ ] API endpoints working
- [ ] Audio files accessible
- [ ] SSL certificate configured for equanimity.foundation
- [ ] Domain DNS configured
- [ ] Process manager configured (PM2, Docker, etc.)
- [ ] Monitoring/logging set up
- [ ] Backup strategy in place
- [ ] CDN configured (optional)
- [ ] Error tracking set up (Sentry, etc.)

## File Structure After Build

```
dist/
├── index.js          # Server bundle
├── public/           # Built client files
│   ├── index.html
│   ├── assets/
│   └── audio/        # Your breathing audio files
└── public/           # Static assets
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change PORT environment variable
   - Check for other processes using the port

2. **Audio files not loading**
   - Ensure files are in `client/public/audio/`
   - Check file permissions
   - Verify file names: `inhale.wav`, `exhale.wav`

3. **Build errors**
   - Run `npm run check` to check TypeScript
   - Ensure all dependencies are installed

4. **Performance issues**
   - Enable gzip compression
   - Use CDN for static assets
   - Implement caching headers

5. **Domain issues**
   - Verify DNS records point to your server
   - Check SSL certificate is valid
   - Ensure firewall allows traffic on port 80/443

## Security Considerations

- Use HTTPS in production (required for equanimity.foundation)
- Set secure session cookies
- Implement rate limiting
- Regular dependency updates
- Environment variable security
- Enable security headers

## Monitoring

- Set up application monitoring (New Relic, DataDog, etc.)
- Configure error tracking (Sentry)
- Set up health check endpoints
- Monitor server resources
- Set up uptime monitoring

## Backup Strategy

- Database backups (if applicable)
- Audio file backups
- Configuration backups
- Regular deployment backups
