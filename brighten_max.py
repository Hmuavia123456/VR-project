#!/usr/bin/env python3
"""
Make image FULLY bright - complete daytime look, no darkness at all
"""
from PIL import Image, ImageEnhance

input_file = "/mnt/d/projects/vr-project/public/360-neuer-zollhof.jpg"
output_file = "/mnt/d/projects/vr-project/public/360-neuer-zollhof-day.jpg"

print(f"Loading image: {input_file}")

# Open image
img = Image.open(input_file)

# MAXIMUM brightness increase - completely remove darkness
enhancer = ImageEnhance.Brightness(img)
img_bright = enhancer.enhance(2.5)  # 150% brightness increase - VERY BRIGHT!

# High contrast for clarity
enhancer = ImageEnhance.Contrast(img_bright)
img_contrast = enhancer.enhance(1.4)  # 40% contrast increase

# Vibrant colors
enhancer = ImageEnhance.Color(img_contrast)
img_final = enhancer.enhance(1.5)  # 50% saturation increase

# Save with high quality
img_final.save(output_file, 'JPEG', quality=95, optimize=True)

print(f"✓ Image is now FULLY BRIGHT - darkness removed!")
print(f"  Output: {output_file}")

import os
print(f"  Size: {os.path.getsize(output_file) / (1024*1024):.1f} MB")
