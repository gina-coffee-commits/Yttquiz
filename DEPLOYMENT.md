# Deployment Guide - Netlify

## Quick Start

### 1. Connect to Netlify

#### Option A: Using Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

#### Option B: Using GitHub Integration
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your GitHub repository
5. Accept default settings (publish directory: `.`)
6. Deploy

#### Option C: Manual Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the project folder
3. Your site will be live instantly

### 2. Custom Domain Setup
In Netlify dashboard:
- Domain settings → Add custom domain
- Update DNS records at your registrar
- Enable SSL (automatic with Let's Encrypt)

## Environment Variables

Set these in Netlify Dashboard (Site settings → Environment):

```
REACT_APP_API_ENDPOINT = https://your-api.com/api/quiz-submit
REACT_APP_PDF_URL = https://your-cdn.com/bali-ytt-guide.pdf
REACT_APP_BOOKING_URL = https://calendly.com/your-name
```

## Email Integration

### Option 1: Netlify Function + SendGrid
1. Set up SendGrid API key in environment variables
2. Update `.netlify/functions/quiz-submit.js`

### Option 2: Zapier Integration
1. Create Zapier webhook
2. Update `script.js` with webhook URL
3. Set up action in Zapier (email to Mailchimp, etc.)

### Option 3: ConvertKit Integration
```javascript
// Update in script.js
const CONVERTKIT_FORM_ID = 'your_form_id';
const CONVERTKIT_FORM_URL = `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`;
```

## File Structure

```
Yttquiz/
├── index.html              # Main HTML file
├── script.js               # Quiz logic
├── styles.css              # Styling
├── netlify.toml            # Netlify configuration
├── package.json            # Project metadata
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── .netlify/functions/     # Netlify serverless functions
│   └── quiz-submit.js      # Handle form submissions
└── DEPLOYMENT.md           # This file
```

## Testing Before Deploy

1. Test locally:
```bash
npm run serve
# Visit http://localhost:8000
```

2. Test all quiz flows:
   - Complete quiz with different answers
   - Test email validation
   - Verify PDF download link
   - Check consultation booking flow

3. Test on mobile devices
4. Check browser console for errors

## Production Checklist

- [ ] All links updated (PDF, booking calendar, API endpoints)
- [ ] Environment variables configured in Netlify
- [ ] SSL certificate enabled
- [ ] Custom domain configured
- [ ] Analytics/tracking code added (if needed)
- [ ] Email service integration tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed
- [ ] Accessibility audit performed
- [ ] Performance optimized

## Monitoring

1. Set up Netlify analytics (free)
2. Configure error tracking (Sentry optional)
3. Monitor form submissions in email service dashboard
4. Set up alerts for deployment failures

## Troubleshooting

### Site not loading
- Check that publish directory is set to `.` (root)
- Verify netlify.toml exists in root
- Check build logs in Netlify dashboard

### Forms not submitting
- Verify API endpoint in environment variables
- Check browser console for CORS errors
- Ensure function is deployed (check `Functions` tab)

### Styling not showing
- Hard refresh browser (Cmd/Ctrl + Shift + R)
- Clear browser cache
- Check CSS file is being served

## Performance Optimization

The site is production-optimized with:
- ✅ Minified static assets
- ✅ Browser caching headers
- ✅ CDN delivery via Netlify
- ✅ Automatic gzip compression
- ✅ HTTP/2 push

## Support

For issues, check:
- [Netlify Docs](https://docs.netlify.com)
- [Netlify Community](https://community.netlify.com)
- GitHub Issues
