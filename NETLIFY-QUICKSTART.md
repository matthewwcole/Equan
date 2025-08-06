# 🚀 Quick Netlify Deployment for BreatheFlow

## TL;DR - Deploy to Netlify in 5 Steps

1. **Push to GitHub** (if not already done)
2. **Go to [netlify.com](https://netlify.com)** → "Add new site" → "Import project"
3. **Connect your repo** and configure:
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `dist/public`
4. **Add environment variable** (optional):
   - `NODE_ENV=production`
5. **Deploy!** 🎉

## Custom Domain (equanimity.foundation)

After successful deployment:

1. **In Netlify Dashboard**:
   - Go to "Site settings" → "Domain management"
   - Click "Add custom domain"
   - Enter `equanimity.foundation`

2. **Configure DNS** (choose one):
   
   **Option A: Point to Netlify**
   ```
   A Record: @ → 75.2.60.5
   CNAME: www → your-site.netlify.app
   ```
   
   **Option B: Use Netlify DNS**
   - Change nameservers to Netlify's
   - Netlify handles everything automatically

3. **SSL Certificate**: Automatic via Let's Encrypt ✅

## What This Sets Up

✅ **Static Site**: Fast, global CDN  
✅ **Serverless Functions**: API endpoints at `/api/*`  
✅ **Custom Audio**: Your breathing files included  
✅ **HTTPS**: Automatic SSL certificate  
✅ **Auto-Deploy**: Updates on git push  

## Files Created for Netlify

- `netlify.toml` - Configuration
- `netlify/functions/` - API endpoints
- `deploy-netlify.sh` - Build script
- `NETLIFY-DEPLOYMENT.md` - Full guide

## Test After Deployment

Visit your site and check:
- ✅ Homepage loads
- ✅ Breathing techniques work  
- ✅ Audio settings functional
- ✅ Custom breathing audio plays
- ✅ API health check: `yoursite.com/api/health`

## Why Netlify?

- **Perfect for React apps** like BreatheFlow
- **Serverless functions** handle your API
- **Global CDN** for fast loading
- **Automatic HTTPS** and deployments
- **Great for static sites** with dynamic features

---

**Need help?** Check `NETLIFY-DEPLOYMENT.md` for detailed instructions.
