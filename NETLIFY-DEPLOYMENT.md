# BreatheFlow Netlify Deployment Guide

## Quick Netlify Deployment

### Option 1: Deploy via Netlify Dashboard

1. **Push your code to GitHub**
2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
3. **Configure build settings**:
   - Build command: `npm run build:netlify`
   - Publish directory: `dist/public`
   - Functions directory: `netlify/functions`
4. **Set environment variables**:
   - `NODE_ENV=production`
   - `DOMAIN=https://equanimity.foundation` (if using custom domain)
5. **Deploy!** - Netlify will automatically build and deploy

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Build the application**:
   ```bash
   npm run build:netlify
   ```

4. **Deploy**:
   ```bash
   # Deploy to preview
   netlify deploy
   
   # Deploy to production
   netlify deploy --prod
   ```

## Custom Domain Setup (equanimity.foundation)

### Step 1: Configure Domain in Netlify
1. Go to your site settings in Netlify
2. Click "Domain management"
3. Click "Add custom domain"
4. Enter `equanimity.foundation`
5. Follow the DNS configuration instructions

### Step 2: Configure DNS Records
Point your domain to Netlify by adding these DNS records:

**A Records:**
```
Name: @
Value: 75.2.60.5

Name: www
Value: CNAME to your-site-name.netlify.app
```

**Or use Netlify DNS:**
1. Change nameservers to Netlify's
2. Netlify will automatically configure DNS

### Step 3: SSL Certificate
- Netlify automatically provides SSL certificates via Let's Encrypt
- No additional configuration needed
- Certificate auto-renews

## Configuration Files

The following files have been created for Netlify deployment:

### `netlify.toml`
```toml
[build]
  publish = "dist/public"
  command = "npm run build:netlify"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Netlify Functions
- `netlify/functions/health.ts` - Health check endpoint
- `netlify/functions/techniques.ts` - Breathing techniques API
- `netlify/functions/session-stats.ts` - Session statistics API
- `netlify/functions/settings.ts` - User settings API

## API Endpoints (Netlify Functions)

After deployment, your API will be available at:
- `GET /api/health` - Health check
- `GET /api/techniques` - Get all breathing techniques
- `GET /api/techniques/:id` - Get specific technique
- `GET /api/session-stats` - Get session statistics
- `POST /api/session-stats` - Save session statistics
- `GET /api/settings` - Get user settings
- `PATCH /api/settings` - Update user settings

## Environment Variables

Set these in your Netlify dashboard under Site settings → Environment variables:

```
NODE_ENV=production
DOMAIN=https://equanimity.foundation
```

## File Structure

```
BreatheFlow/
├── netlify.toml                 # Netlify configuration
├── netlify/
│   └── functions/              # Serverless functions
│       ├── health.ts
│       ├── techniques.ts
│       ├── session-stats.ts
│       └── settings.ts
├── client/                     # React frontend
│   ├── public/
│   │   └── audio/             # Your breathing audio files
│   └── src/
└── dist/public/               # Built static files (after build)
```

## Audio Files

Your custom breathing audio files (`inhale.wav` and `exhale.wav`) will be automatically included in the deployment. Make sure they're in `client/public/audio/`.

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Netlify site connected to repository
- [ ] Build command set to `npm run build:netlify`
- [ ] Publish directory set to `dist/public`
- [ ] Environment variables configured
- [ ] Custom domain configured (if using equanimity.foundation)
- [ ] DNS records configured
- [ ] SSL certificate active (automatic)
- [ ] Audio files included in build

## Testing After Deployment

1. **Visit your site**: `https://your-site-name.netlify.app` or `https://equanimity.foundation`
2. **Test API endpoints**:
   ```bash
   curl https://equanimity.foundation/api/health
   curl https://equanimity.foundation/api/techniques
   ```
3. **Test application features**:
   - Breathing techniques load
   - Audio settings work
   - Session tracking works
   - Mobile responsiveness

## Troubleshooting

### Build Failures
1. Check build logs in Netlify dashboard
2. Ensure all dependencies are in `package.json`
3. Verify build command is correct

### Function Errors
1. Check function logs in Netlify dashboard
2. Verify function syntax and imports
3. Check environment variables

### Domain Issues
1. Verify DNS configuration
2. Check domain propagation: `nslookup equanimity.foundation`
3. Ensure SSL certificate is active

### Audio Issues
1. Verify audio files are in `client/public/audio/`
2. Check file permissions and formats
3. Test audio files locally first

## Limitations

**Note**: Netlify Functions have some limitations compared to a traditional server:
- Functions are stateless (no persistent memory between requests)
- 10-second timeout limit
- Cold start delays
- Limited to specific runtimes

For production use with persistent data, consider:
- Adding a database (MongoDB Atlas, Supabase, etc.)
- Using Netlify Identity for user management
- Implementing proper state management

## Support

- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Netlify Community**: [community.netlify.com](https://community.netlify.com)
- **Function Logs**: Available in Netlify dashboard
