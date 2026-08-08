import os
import subprocess
from PIL import Image

# 1. Create favicon.svg
favicon_svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170" width="100%" height="100%">
  <style>
    path { fill: #1d1d1f; }
    @media (prefers-color-scheme: dark) {
      path { fill: #ffffff; }
    }
  </style>
  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.9-14.4-6.08-3.38-2.73-7.3-7.42-11.77-14.07-5.87-8.68-10.45-18.42-13.73-29.21-3.29-10.8-4.93-21.16-4.93-31.09 0-14.56 3.69-26.68 11.07-36.36 7.38-9.68 16.71-14.6 28-14.74 4.8 0 10.22 1.25 16.27 3.75 6.05 2.5 10.15 3.75 12.3 3.75 1.84 0 5.86-1.22 12.06-3.67 6.2-2.45 11.45-3.6 15.77-3.44 8.78.36 16.5 3.49 23.16 9.38 6.66 5.89 11.13 13.43 13.41 22.61-7.79 4.71-11.62 11.39-11.51 20.03.12 7.74 3.03 14.15 8.72 19.24 5.69 5.09 12.44 8.01 20.25 8.76-1.57 4.72-3.61 9.5-6.14 14.36zM119.22 31.96c0 5.48-1.98 10.6-5.94 15.36-3.96 4.76-8.8 7.6-14.52 8.52-.36-.6-.54-1.3-.54-2.1 0-5.26 2.06-10.37 6.18-15.34 4.12-4.97 9.1-7.77 14.94-8.4.12.65.18 1.3.18 1.96z"/>
</svg>"""

with open("favicon.svg", "w", encoding="utf-8") as f:
    f.write(favicon_svg_content)

# 2. Create assets/logo.svg (White silhouette for dark nav & standalone logo use)
logo_svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170" width="100%" height="100%">
  <path fill="currentColor" d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.9-14.4-6.08-3.38-2.73-7.3-7.42-11.77-14.07-5.87-8.68-10.45-18.42-13.73-29.21-3.29-10.8-4.93-21.16-4.93-31.09 0-14.56 3.69-26.68 11.07-36.36 7.38-9.68 16.71-14.6 28-14.74 4.8 0 10.22 1.25 16.27 3.75 6.05 2.5 10.15 3.75 12.3 3.75 1.84 0 5.86-1.22 12.06-3.67 6.2-2.45 11.45-3.6 15.77-3.44 8.78.36 16.5 3.49 23.16 9.38 6.66 5.89 11.13 13.43 13.41 22.61-7.79 4.71-11.62 11.39-11.51 20.03.12 7.74 3.03 14.15 8.72 19.24 5.69 5.09 12.44 8.01 20.25 8.76-1.57 4.72-3.61 9.5-6.14 14.36zM119.22 31.96c0 5.48-1.98 10.6-5.94 15.36-3.96 4.76-8.8 7.6-14.52 8.52-.36-.6-.54-1.3-.54-2.1 0-5.26 2.06-10.37 6.18-15.34 4.12-4.97 9.1-7.77 14.94-8.4.12.65.18 1.3.18 1.96z"/>
</svg>"""

os.makedirs("assets", exist_ok=True)
with open("assets/logo.svg", "w", encoding="utf-8") as f:
    f.write(logo_svg_content)

# 3. Create html file to render high-res PNG for apple-touch-icon and favicon PNGs
touch_icon_html = """<!DOCTYPE html>
<html>
<head>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: 512px;
    height: 512px;
    background: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    width: 320px;
    height: 320px;
  }
</style>
</head>
<body>
""" + logo_svg_content + """
</body>
</html>
"""

with open("temp_touch_icon.html", "w", encoding="utf-8") as f:
    f.write(touch_icon_html)

# Render screenshot via Edge
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--window-size=512,512",
    "--screenshot=temp_512.png",
    os.path.abspath("temp_touch_icon.html")
]
subprocess.run(cmd, check=True)

# Generate apple-touch-icon.png and favicon PNGs & favicon.ico
if os.path.exists("temp_512.png"):
    img512 = Image.open("temp_512.png").convert("RGBA")
    
    # apple-touch-icon.png (180x180)
    touch_img = img512.resize((180, 180), Image.Resampling.LANCZOS)
    touch_img.save("apple-touch-icon.png", "PNG")

    # favicon-32x32.png
    fav32 = img512.resize((32, 32), Image.Resampling.LANCZOS)
    fav32.save("favicon-32x32.png", "PNG")

    # favicon-16x16.png
    fav16 = img512.resize((16, 16), Image.Resampling.LANCZOS)
    fav16.save("favicon-16x16.png", "PNG")

    # favicon.ico with multi-sizes (16, 32, 48, 64, 128)
    ico_sizes = [(16,16), (32,32), (48,48), (64,64), (128,128)]
    img512.save("favicon.ico", format="ICO", sizes=ico_sizes)

    print("Successfully created favicon.ico, favicon.svg, apple-touch-icon.png, and assets/logo.svg!")

# Cleanup
if os.path.exists("temp_touch_icon.html"):
    os.remove("temp_touch_icon.html")
if os.path.exists("temp_512.png"):
    os.remove("temp_512.png")
