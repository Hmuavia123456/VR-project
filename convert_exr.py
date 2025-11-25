#!/usr/bin/env python3
"""
Convert EXR image to JPG format for web browser compatibility
"""
import sys

try:
    from PIL import Image
    import numpy as np

    # Read EXR file
    input_file = "/mnt/d/projects/vr-project/cobblestone_street_night_4k.exr"
    output_file = "/mnt/d/projects/vr-project/public/360-cobblestone-night.jpg"

    print(f"Converting {input_file}...")

    # Open EXR image
    img = Image.open(input_file)

    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')

    # Save as high-quality JPG
    img.save(output_file, 'JPEG', quality=95, optimize=True)

    print(f"✓ Successfully converted to {output_file}")
    print(f"  Image size: {img.size}")

except ImportError as e:
    print(f"Error: PIL/Pillow not installed. Trying alternative method...")
    print(f"Details: {e}")
    sys.exit(1)
except Exception as e:
    print(f"Error converting image: {e}")
    sys.exit(1)
