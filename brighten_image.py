#!/usr/bin/env python3
"""
Brighten the 360 image to make it look like daytime
"""
try:
    from PIL import Image, ImageEnhance
    import os

    input_file = "/mnt/d/projects/vr-project/public/360-neuer-zollhof.jpg"
    output_file = "/mnt/d/projects/vr-project/public/360-neuer-zollhof-bright.jpg"

    print(f"Loading image: {input_file}")

    # Open image
    img = Image.open(input_file)

    # Increase brightness
    enhancer = ImageEnhance.Brightness(img)
    img_bright = enhancer.enhance(1.8)  # Increase brightness by 80%

    # Increase contrast slightly
    enhancer = ImageEnhance.Contrast(img_bright)
    img_final = enhancer.enhance(1.2)  # Increase contrast by 20%

    # Increase color saturation for more vibrant look
    enhancer = ImageEnhance.Color(img_final)
    img_final = enhancer.enhance(1.3)  # Increase saturation by 30%

    # Save with high quality
    img_final.save(output_file, 'JPEG', quality=95, optimize=True)

    print(f"✓ Successfully brightened image!")
    print(f"  Output: {output_file}")
    print(f"  Size: {os.path.getsize(output_file) / (1024*1024):.1f} MB")

except ImportError:
    print("Error: Pillow not installed. Installing...")
    import subprocess
    subprocess.run(["pip3", "install", "Pillow", "--break-system-packages", "--quiet"])
    print("Please run the script again.")
except Exception as e:
    print(f"Error: {e}")
