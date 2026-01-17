from PIL import Image
import os

files = ['assets/icon.png', 'assets/adaptive-icon.png', 'assets/favicon.png']

for f in files:
    if os.path.exists(f):
        try:
            img = Image.open(f)
            # Force convert to RGBA to ensure PNG compatibility
            img = img.convert("RGBA")
            img.save(f, 'PNG')
            print(f"Converted {f} to PNG")
        except Exception as e:
            print(f"Failed to convert {f}: {e}")
