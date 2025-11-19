# VirtualTours - 360° VR Tour Platform

A production-ready Next.js application for creating and viewing immersive 360° virtual tours. Built with React, Three.js (react-three-fiber), Tailwind CSS, and Framer Motion.

## ✨ Features

### Core Functionality
- **360° Photo Viewer** - Interactive sphere-mapped equirectangular images with mouse/touch controls
- **360° Video Support** - Immersive video playback in virtual environment
- **Interactive Hotspots** - Clickable information points within tours
- **Tour Gallery** - Browse, search, and filter tours
- **Responsive Design** - Works flawlessly on mobile, tablet, and desktop
- **VR Mode** - WebXR support for VR headsets (where available)

### Pages
- **Home** - Stunning hero with 360° background, features, and CTAs
- **Explore** - Tour gallery with filtering and search
- **Pricing** - Beautiful pricing cards with comparison table
- **About** - Company information and team
- **Login/Register** - Client-side authentication with validation

### UI/UX
- Modern, clean design with custom color palette
- Smooth animations with Framer Motion
- Accessible and keyboard-navigable
- Loading states and error handling
- Mobile-first responsive layout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add your 360° images**
   - Place 360° equirectangular images in `/public` folder
   - Recommended format: JPG (for photos) or MP4 (for videos)
   - Recommended resolution: 4096x2048 or 8192x4096 for best quality

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
vr-project/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.js         # About page
│   │   ├── explore/
│   │   │   └── page.js         # Tour gallery with viewer
│   │   ├── login/
│   │   │   └── page.js         # Login page
│   │   ├── pricing/
│   │   │   └── page.js         # Pricing plans
│   │   ├── register/
│   │   │   └── page.js         # Registration page
│   │   ├── layout.js           # Root layout with Navbar/Footer
│   │   ├── page.js             # Home page
│   │   └── globals.css         # Global styles & Tailwind
│   └── components/
│       ├── Footer.js           # Footer component
│       ├── Hero360.js          # 360° hero background
│       ├── Modal.js            # Reusable modal
│       ├── Navbar.js           # Navigation bar
│       ├── TourCard.js         # Tour thumbnail card
│       └── TourViewer.js       # Main 360° viewer component
├── public/
│   ├── 360-hero.jpg           # Hero 360° image
│   ├── 360-sample.jpg         # Sample tour image
│   └── 360-sample.mp4         # Sample tour video (optional)
├── tailwind.config.js         # Tailwind configuration
├── next.config.mjs            # Next.js configuration
└── package.json               # Dependencies
```

## 🎨 Customization Guide

### 1. Replace 360° Images

**For the hero section:**
1. Add your 360° equirectangular image to `/public` (e.g., `my-hero.jpg`)
2. Update `src/app/page.js`:
   ```jsx
   <Hero360 imageUrl="/my-hero.jpg" />
   ```

**For tours in Explore page:**
1. Add images to `/public`
2. Update the `tours` array in `src/app/explore/page.js`:
   ```jsx
   {
     id: 1,
     title: 'My Tour',
     url: '/my-tour-360.jpg',
     type: 'photo',
     // ... other fields
   }
   ```

### 2. Add New Tours

Edit `src/app/explore/page.js` and add to the `tours` array:

```javascript
{
  id: 7,
  title: 'Your Tour Name',
  description: 'Tour description',
  image: '/thumbnail.jpg',      // Thumbnail (regular image)
  url: '/360-image.jpg',         // 360° equirectangular image
  type: 'photo',                 // 'photo' or 'video'
  category: 'travel',            // Category for filtering
  tags: ['Tag1', 'Tag2'],        // Search tags
  hotspots: [                    // Optional interactive points
    {
      position: [100, 0, 0],     // 3D position [x, y, z]
      title: 'Point of Interest',
      description: 'Info about this spot',
    },
  ],
}
```

### 3. Add Hotspots to Tours

Hotspots are interactive 3D markers in the tour viewer. Position is `[x, y, z]`:
- Larger numbers = further from center
- Typical range: -200 to 200
- Example positions:
  - `[100, 0, 0]` - Right side
  - `[-100, 0, 0]` - Left side
  - `[0, 50, 0]` - Up
  - `[0, -50, 0]` - Down

```javascript
hotspots: [
  {
    position: [80, 10, -50],
    title: 'Kitchen',
    description: 'Modern kitchen with stainless appliances',
  },
  {
    position: [-80, 0, 30],
    title: 'Living Room',
    description: 'Spacious living area with natural light',
  },
]
```

### 4. Customize Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#YOUR_PRIMARY_COLOR',
    600: '#DARKER_SHADE',
  },
  accent: {
    500: '#YOUR_ACCENT_COLOR',
  },
}
```

### 5. Change Fonts

Edit `src/app/layout.js`:

```javascript
import { YourFont, YourDisplayFont } from "next/font/google";

const yourFont = YourFont({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with app router |
| **React 19** | UI library |
| **Three.js** | 3D rendering engine |
| **@react-three/fiber** | React renderer for Three.js |
| **@react-three/drei** | Useful helpers for R3F |
| **Framer Motion** | Animation library |
| **Tailwind CSS** | Utility-first CSS framework |

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
Build the project:
```bash
npm run build
npm start
```

## 🔧 Troubleshooting

### Issue: 360° images not loading
- **Solution**: Ensure images are in `/public` and paths start with `/`
- Check browser console for CORS errors
- Verify image format is JPG/PNG for photos, MP4 for videos

### Issue: Three.js errors on build
- **Solution**: Components using Three.js must be client-side rendered
- Use `'use client'` directive
- Use dynamic imports with `{ ssr: false }`

### Issue: Performance issues
- **Solution**: Optimize image sizes (use 4K instead of 8K if possible)
- Enable image compression
- Lazy load tours that aren't immediately visible

### Issue: VR mode not working
- **Solution**: WebXR requires:
  - HTTPS (or localhost for testing)
  - Compatible browser (Chrome/Edge on Android, Oculus Browser)
  - VR headset connected

## 🎯 Next Steps & Ideas

### Features to Add
- [ ] User authentication (backend integration)
- [ ] Tour creation/upload interface
- [ ] Analytics dashboard
- [ ] Social sharing
- [ ] Tour embedding
- [ ] Audio narration support
- [ ] Multi-scene tours (scene switching)
- [ ] Gyroscope support for mobile VR
- [ ] Thumbnail generation
- [ ] Tour ratings and comments

### Backend Integration
To add real backend:
1. Set up API routes in Next.js or external API
2. Replace localStorage with real authentication
3. Create database schema for tours, users, etc.
4. Add file upload for 360° images/videos
5. Implement payment processing for plans

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

- 360° sample images: [Flickr Equirectangular Group](https://www.flickr.com/groups/equirectangular/)
- Icons: Native emojis
- Fonts: Google Fonts (Inter, Playfair Display)

---

**Built with ❤️ using Next.js and React**
