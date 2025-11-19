# VirtualTours - Setup & Testing Instructions

## 🚀 Quick Start (Copy & Paste)

### Step 1: Ensure Dependencies are Installed
```bash
npm install
```

### Step 2: Download Sample 360° Images (Required for Testing)

You need to add actual 360° equirectangular images to test the viewer. Here are free sources:

**Option A: Download from Flickr**
1. Visit: https://www.flickr.com/groups/equirectangular/
2. Download 2-3 equirectangular images
3. Rename them to:
   - `360-hero.jpg` (for hero section)
   - `360-sample.jpg` (for tours)

**Option B: Use Free Stock Sites**
- Poly Haven: https://polyhaven.com/hdris (Download as JPG)
- HDRIHaven: https://hdrihaven.com/hdris

**Place images in `/public` folder:**
```bash
# Your images should be at:
# /public/360-hero.jpg
# /public/360-sample.jpg
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
```
http://localhost:3000
```

---

## 📋 Testing Checklist

### ✅ Homepage Test
- [ ] Hero section loads with 360° background
- [ ] Can drag/rotate the 360° view with mouse
- [ ] "Explore Tours" button works
- [ ] Features section displays properly
- [ ] Footer displays correctly

### ✅ Navigation Test
- [ ] Navbar is sticky on scroll
- [ ] All links work (Home, Explore, Pricing, About)
- [ ] Mobile menu opens/closes correctly (resize browser to mobile size)

### ✅ Explore Page Test
- [ ] Tour cards display in grid
- [ ] Search bar filters tours
- [ ] Category filters work
- [ ] Click on a tour card opens the 360° viewer
- [ ] In viewer: can drag to look around
- [ ] In viewer: can zoom with scroll
- [ ] In viewer: Next/Prev buttons work
- [ ] In viewer: Close button works
- [ ] Hotspots appear and show info on hover (if tour has hotspots)

### ✅ Pricing Page Test
- [ ] Monthly/Yearly toggle works
- [ ] Prices update correctly
- [ ] Comparison table displays
- [ ] "Get Started" buttons work

### ✅ About Page Test
- [ ] All sections render correctly
- [ ] Team cards display
- [ ] Stats animate on scroll

### ✅ Login/Register Test
- [ ] Forms validate inputs
- [ ] Error messages display for invalid inputs
- [ ] Submit redirects to Explore page
- [ ] User data stored in localStorage (check browser DevTools > Application > Local Storage)

### ✅ Responsive Design Test
Resize browser or use DevTools (F12) to test these sizes:
- [ ] Mobile: 375px width
- [ ] Tablet: 768px width
- [ ] Desktop: 1920px width

---

## 🛠️ Troubleshooting Common Issues

### Issue 1: Black screen or Three.js errors
**Cause**: Missing or invalid 360° image
**Solution**:
```bash
# 1. Check if images exist in /public
ls -la public/

# 2. Verify image format (must be JPG/PNG)
# 3. Check browser console (F12) for errors
# 4. Try a different 360° image
```

### Issue 2: "Module not found" errors
**Cause**: Missing dependencies
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: Port 3000 already in use
**Cause**: Another app is using port 3000
**Solution**:
```bash
# Kill the process using port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Issue 4: Images not loading
**Cause**: Incorrect path or CORS issue
**Solution**:
- Ensure images are in `/public` folder
- Paths must start with `/` (e.g., `/360-hero.jpg` not `./360-hero.jpg`)
- Check browser console for 404 errors

### Issue 5: Tailwind styles not applying
**Cause**: Tailwind config issue
**Solution**:
```bash
# Restart dev server
# Press Ctrl+C to stop, then:
npm run dev
```

---

## 🎯 Performance Testing

### Test Loading Speed
```bash
# Build for production
npm run build

# Start production server
npm start

# Open http://localhost:3000 and check:
# - Lighthouse score (Chrome DevTools > Lighthouse)
# - Should get 90+ on Performance
```

### Test 360° Viewer Performance
1. Open Explore page
2. Click on a tour
3. Check FPS (Chrome DevTools > Performance > Record)
4. Should maintain 60 FPS on modern hardware

---

## 📱 Mobile Testing

### Test on Real Device
1. Find your computer's IP address:
   ```bash
   # Linux/Mac
   ip addr show | grep inet
   # or
   ifconfig | grep inet
   ```

2. On your mobile device, open:
   ```
   http://YOUR_IP:3000
   ```

3. Test touch controls:
   - [ ] Swipe to rotate 360° view
   - [ ] Pinch to zoom
   - [ ] Mobile menu works

---

## 🚢 Production Deployment

### Deploy to Vercel (Easiest)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# Follow prompts, project will be live in ~30 seconds
```

### Build Locally for Other Hosts
```bash
# 1. Build
npm run build

# 2. Test production build locally
npm start

# 3. Upload .next folder + public folder + package.json to your host
# 4. Run "npm install --production" on server
# 5. Run "npm start" on server
```

---

## 📊 Project Stats

After running the project, here's what you should see:

| Metric | Expected Value |
|--------|---------------|
| Build time | < 60 seconds |
| Page load (Home) | < 2 seconds |
| FPS in 360 viewer | 60 FPS |
| Lighthouse Performance | 90+ |
| Mobile-friendly | ✅ Yes |
| Accessibility | 90+ |

---

## 🎨 Where to Find Free 360° Images

### For Testing:
1. **Poly Haven** - https://polyhaven.com/hdris
   - Free, high-quality HDRIs
   - Download as JPG (not EXR)

2. **Flickr Equirectangular Group** - https://www.flickr.com/groups/equirectangular/
   - Community-uploaded 360° photos
   - Check license before commercial use

3. **Pixexid** - https://pixexid.com/
   - Free 360° images
   - No attribution required

4. **360Cities** - https://www.360cities.net/
   - Browse for inspiration
   - Some free, some paid

### Creating Your Own:
- Use Google Street View app (iOS/Android)
- Use a 360° camera (Ricoh Theta, Insta360)
- Use panorama mode on smartphone and stitch with software

---

## ✉️ Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Review the Troubleshooting section above
3. Ensure all dependencies are installed
4. Try with a different 360° image
5. Check that Node.js version is 18+

---

**Happy building! 🚀**
