# Equanimity Foundation Deployment Checklist

## Domain: https://equanimity.foundation/

### Pre-Deployment Setup

#### 1. Environment Configuration
Create `.env` file:
```env
PORT=5000
NODE_ENV=production
DOMAIN=https://equanimity.foundation
BASE_URL=https://equanimity.foundation
SESSION_SECRET=your_secure_session_secret_here
```

#### 2. DNS Configuration
- [ ] Point `equanimity.foundation` to your server IP
- [ ] Point `www.equanimity.foundation` to your server IP
- [ ] Configure A records for both domains
- [ ] Set up CNAME records if using CDN

#### 3. SSL Certificate
Choose one option:

**Option A: Let's Encrypt (Recommended)**
```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d equanimity.foundation -d www.equanimity.foundation
```

**Option B: Cloudflare**
- Add domain to Cloudflare
- Update nameservers
- Enable SSL/TLS encryption mode: "Full (strict)"

### Deployment Steps

#### 1. Build Application
```bash
./deploy-equanimity.sh
```

#### 2. Start Production Server
```bash
npm start
```

#### 3. Process Manager Setup (PM2)
```bash
npm install -g pm2
pm2 start dist/index.js --name "breatheflow-equanimity"
pm2 save
pm2 startup
```

#### 4. Nginx Configuration
Create `/etc/nginx/sites-available/equanimity.foundation`:
```nginx
server {
    listen 80;
    server_name equanimity.foundation www.equanimity.foundation;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name equanimity.foundation www.equanimity.foundation;
    
    ssl_certificate /etc/letsencrypt/live/equanimity.foundation/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/equanimity.foundation/privkey.pem;
    
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
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/equanimity.foundation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Post-Deployment Verification

#### 1. Health Check
```bash
curl https://equanimity.foundation/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-08-06T03:34:51.133Z",
  "version": "1.0.0"
}
```

#### 2. Application Features
- [ ] Homepage loads correctly
- [ ] Breathing techniques load
- [ ] Audio settings work
- [ ] Custom audio files play
- [ ] Session tracking works
- [ ] Mobile responsiveness

#### 3. Security Checks
- [ ] HTTPS redirects work
- [ ] SSL certificate is valid
- [ ] Security headers are present
- [ ] No mixed content warnings

### Monitoring Setup

#### 1. Uptime Monitoring
- Set up monitoring for https://equanimity.foundation
- Monitor API endpoints
- Set up alerts for downtime

#### 2. Error Tracking
- Configure Sentry for error tracking
- Set up log aggregation
- Monitor application performance

#### 3. Analytics
- Set up Google Analytics
- Configure privacy-compliant tracking
- Monitor user engagement

### Maintenance

#### 1. SSL Certificate Renewal
```bash
# Add to crontab for auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### 2. Application Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
npm run build
pm2 restart breatheflow-equanimity
```

#### 3. Backup Strategy
- [ ] Database backups (if applicable)
- [ ] Audio file backups
- [ ] Configuration backups
- [ ] Regular deployment backups

### Troubleshooting

#### Common Issues

1. **SSL Certificate Issues**
   ```bash
   sudo certbot certificates
   sudo certbot renew --dry-run
   ```

2. **Nginx Configuration**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **Application Issues**
   ```bash
   pm2 logs breatheflow-equanimity
   pm2 status
   ```

4. **DNS Issues**
   ```bash
   nslookup equanimity.foundation
   dig equanimity.foundation
   ```

### Performance Optimization

1. **Enable Gzip Compression**
   ```nginx
   gzip on;
   gzip_vary on;
   gzip_min_length 1024;
   gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
   ```

2. **Caching Headers**
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **CDN Setup (Optional)**
   - Configure Cloudflare or similar CDN
   - Set up asset optimization
   - Enable image optimization

### Support Contacts

- **Domain Registrar**: [Your registrar]
- **Hosting Provider**: [Your hosting provider]
- **SSL Certificate**: Let's Encrypt
- **Monitoring**: [Your monitoring service]

---

**Deployment Status**: Ready for production deployment to https://equanimity.foundation/
