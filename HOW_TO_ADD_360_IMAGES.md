# 🌍 How to Add 360° Images to Your Project

## Quick Guide: 3 Easy Steps

### Step 1: Download 360° Images

**Best Free Sources:**
1. **Poly Haven** (Recommended): https://polyhaven.com/hdris
2. **Flickr Equirectangular**: https://www.flickr.com/groups/equirectangular/
3. **Pixexid 360**: https://pixexid.com/search/360

### Step 2: Save to Project

Save downloaded images to your `/public` folder:
```
/public/360-your-image-name.jpg
```

**Naming Convention:**
- Use descriptive names: `360-venice-sunset.jpg`
- Keep lowercase with hyphens
- Prefix with `360-` for easy identification

### Step 3: Add to Explore Page

Open `/src/app/explore/page.js` and add your tour:

```javascript
{
  id: 43, // Next available ID
  title: 'Venice Sunset Paradise',
  description: 'Beautiful Venice canal at golden hour in 360°',
  image: '/360-venice-sunset.jpg',  // ← Your downloaded image
  url: '/360-venice-sunset.jpg',    // ← Same image
  type: 'photo',
  category: 'featured-tours',  // or 'most-liked', 'collections'
  user: { name: 'Venice Tours', initials: 'VT', color: 'bg-blue-700' },
  stats: { reactions: 1500, views: 75000 },
},
```

### Step 4: Test It!

```bash
npm run dev
```

Visit: http://localhost:3000/explore

---

## 📦 Recommended Image Specs

### For Web Performance:
- **Resolution**: 2K (2048×1024) to 4K (4096×2048)
- **Format**: JPG (best compatibility)
- **File Size**: Under 5MB per image
- **Aspect Ratio**: 2:1 (equirectangular)

### Quality Levels:
- **Low**: 1K (1024×512) - Fast loading, lower quality
- **Medium**: 2K (2048×1024) - Good balance ⭐
- **High**: 4K (4096×2048) - Best quality, slower loading
- **Ultra**: 8K+ (8192×4096) - Overkill for web

---

## 🎨 Best Free 360° Image Collections

### 1. Poly Haven (100% Free, No Attribution)
**Link:** https://polyhaven.com/hdris

**Best Collections:**
- **Outdoor:** https://polyhaven.com/hdris/outdoor
- **Indoor:** https://polyhaven.com/hdris/indoor
- **Urban:** https://polyhaven.com/hdris/urban
- **Nature:** https://polyhaven.com/hdris/nature

**Example Downloads:**
```
Venice Sunset: https://polyhaven.com/a/venice_sunset
Dikhololo Night: https://polyhaven.com/a/dikhololo_night
Photo Studio: https://polyhaven.com/a/photo_studio_loft_hall
Abandoned Warehouse: https://polyhaven.com/a/abandoned_warehouse_04
```

### 2. Flickr Equirectangular
**Link:** https://www.flickr.com/groups/equirectangular/pool/

**Search Tips:**
1. Use filter: "Any license" → "Creative Commons"
2. Look for high resolution (Original size)
3. Check license before downloading

### 3. Pixexid 360°
**Link:** https://pixexid.com/search/360

- Free for commercial use
- No attribution required
- Direct download

### 4. 360 Cities (Free Low-Res)
**Link:** https://www.360cities.net/

- World's largest 360° collection
- Free low-res downloads
- Perfect for testing

---

## 🚀 Advanced: Multi-Scene Tours

Want to create tours with multiple scenes? Here's how:

```javascript
{
  id: 44,
  title: 'Complete Venice Tour',
  description: 'Multi-scene Venice walkthrough with 5 viewpoints',
  image: '/360-venice-canal.jpg',
  type: 'tour',  // ← Note: 'tour' instead of 'photo'
  category: 'featured-tours',
  user: { name: 'Venice Explorer', initials: 'VE', color: 'bg-purple-700' },
  stats: { reactions: 2500, views: 125000 },
  scenes: [  // ← Multiple scenes!
    {
      id: 'scene-1',
      title: 'Grand Canal',
      description: 'Main waterway of Venice',
      url: '/360-venice-canal.jpg',
      thumbnail: '/360-venice-canal.jpg',
      type: 'photo',
    },
    {
      id: 'scene-2',
      title: 'St. Mark\'s Square',
      description: 'Historic piazza',
      url: '/360-venice-square.jpg',
      thumbnail: '/360-venice-square.jpg',
      type: 'photo',
    },
    {
      id: 'scene-3',
      title: 'Rialto Bridge',
      description: 'Famous bridge',
      url: '/360-venice-bridge.jpg',
      thumbnail: '/360-venice-bridge.jpg',
      type: 'photo',
    },
  ]
},
```

---

## 📝 Image License Guide

### ✅ Safe to Use (Free for Commercial):
- **CC0 (Public Domain)** - No attribution needed
- **CC BY** - Attribution required
- **Poly Haven** - 100% free, CC0

### ⚠️ Check Before Using:
- **CC BY-NC** - Non-commercial only
- **CC BY-SA** - Share-alike required
- **All Rights Reserved** - Need permission

---

## 🔥 Pro Tips

1. **Download 2K or 4K** - Best balance for web
2. **Use JPG format** - Best browser compatibility
3. **Compress images** - Use tools like TinyPNG
4. **Test loading speed** - Keep under 5MB per image
5. **Consistent naming** - Use `360-` prefix

---

## 🎯 Example Workflow

```bash
# 1. Download image from Poly Haven
wget https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/venice_sunset.jpg

# 2. Rename and move to public folder
mv venice_sunset.jpg /mnt/d/projects/vr-project/public/360-venice-sunset.jpg

# 3. Add to explore page (edit /src/app/explore/page.js)
# 4. Test: npm run dev
# 5. Build: npm run build
```

---

## 🌟 Recommended First Downloads

Start with these stunning free panoramas:

1. **Venice Sunset** - https://polyhaven.com/a/venice_sunset
2. **Dikhololo Night** - https://polyhaven.com/a/dikhololo_night
3. **Abandoned Warehouse** - https://polyhaven.com/a/abandoned_warehouse_04
4. **Autumn Park** - https://polyhaven.com/a/autumn_park
5. **Tokyo Street** - Search on Flickr Equirectangular

---

## ❓ Need Help?

If images appear distorted or cut:
- Make sure they are **equirectangular** format (2:1 aspect ratio)
- Check resolution is at least 2048×1024
- Verify file format is JPG or PNG

Happy exploring! 🚀
