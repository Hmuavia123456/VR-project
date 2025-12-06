# Development Guide

## Starting the Development Server

### Normal Start
```bash
npm run dev
```
Server will start on `http://localhost:3000`

### If Lock Error Occurs

If you see this error:
```
⨯ Unable to acquire lock at .next/dev/lock, is another instance of next dev running?
```

**Solution 1: Clean Start (Recommended)**
```bash
npm run dev:clean
```
This will automatically remove the lock file and start fresh.

**Solution 2: Manual Cleanup**
```bash
# Stop all running Next.js processes
pkill -f "next dev"

# Remove lock file
rm -rf .next/dev

# Start server
npm run dev
```

**Solution 3: Complete Clean**
```bash
npm run clean
npm run dev
```

## Common Issues

### Port Already in Use
If port 3000 is already in use, Next.js will automatically use port 3001.

### Lock File Issue
This happens when:
- Previous dev server didn't shut down properly
- Multiple `npm run dev` commands were run simultaneously
- IDE or terminal was force-closed while server was running

**Always use `Ctrl+C` to stop the dev server properly**

## Project Structure

```
vr-project/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── explore/        # Tours explore page
│   │   │   └── page.js
│   │   └── about/          # About page
│   └── components/         # React components
│       └── TourViewer.js   # 360° tour viewer (mobile responsive)
├── public/                 # Static assets (360° images)
├── .next/                  # Next.js build output (auto-generated)
└── package.json
```

## Mobile Responsive Features

The `TourViewer` component is now fully mobile responsive:
- Bottom sheet description panel on mobile
- Thumbnail strip (horizontal on mobile, vertical on desktop)
- Touch-friendly zoom controls
- No overlapping elements
- Proper z-index hierarchy

## Testing Mobile View

1. Open browser DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Select a mobile device (iPhone, Samsung, etc.)
4. Navigate to Explore page and open any tour
5. Test description panel, thumbnails, and zoom controls
