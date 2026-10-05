#!/usr/bin/env python3
"""Generate a branded 1200x630 Open Graph image for deeroot.dev (Daniel Emerle)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630

BG_TOP = (10, 10, 26)
BG_MID = (26, 26, 46)
BG_BOT = (22, 33, 62)
ACCENT_BLUE = (74, 144, 217)
ACCENT_INDIGO = (111, 107, 255)
ACCENT_PINK = (255, 107, 157)
TEXT_PRIMARY = (255, 255, 255)
TEXT_SECONDARY = (160, 160, 176)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

img = Image.new("RGB", (W, H), BG_TOP)
px = img.load()
for y in range(H):
    if y < H * 0.5:
        t = y / (H * 0.5)
        r = int(BG_TOP[0] + (BG_MID[0] - BG_TOP[0]) * t)
        g = int(BG_TOP[1] + (BG_MID[1] - BG_TOP[1]) * t)
        b = int(BG_TOP[2] + (BG_MID[2] - BG_TOP[2]) * t)
    else:
        t = (y - H * 0.5) / (H * 0.5)
        r = int(BG_MID[0] + (BG_BOT[0] - BG_MID[0]) * t)
        g = int(BG_MID[1] + (BG_BOT[1] - BG_MID[1]) * t)
        b = int(BG_MID[2] + (BG_BOT[2] - BG_MID[2]) * t)
    for x in range(W):
        px[x, y] = (r, g, b)

glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([W * 0.70 - 180, H * 0.20 - 180, W * 0.70 + 180, H * 0.20 + 180], fill=(ACCENT_BLUE[0], ACCENT_BLUE[1], ACCENT_BLUE[2], 95))
gd.ellipse([W * 0.15 - 140, H * 0.85 - 140, W * 0.15 + 140, H * 0.85 + 140], fill=(ACCENT_PINK[0], ACCENT_PINK[1], ACCENT_PINK[2], 72))
gd.ellipse([W * 0.92 - 120, H * 0.92 - 120, W * 0.92 + 120, H * 0.92 + 120], fill=(ACCENT_INDIGO[0], ACCENT_INDIGO[1], ACCENT_INDIGO[2], 60))
glow = glow.filter(ImageFilter.GaussianBlur(90))
img = Image.alpha_composite(img.convert("RGBA"), glow)

bars = Image.new("RGBA", (W, H), (0, 0, 0, 0))
bd = ImageDraw.Draw(bars)
x = int(W * 0.32)
ww = 34
while x < W * 0.98:
    bd.rectangle([x, 0, x + ww, H], fill=(245, 245, 245, 8))
    x += ww + 10
bars = bars.filter(ImageFilter.GaussianBlur(2))
img = Image.alpha_composite(img, bars)

draw = ImageDraw.Draw(img)

tile_pad = 72
tile_size = 168
tx0, ty0 = tile_pad, (H - tile_size) // 2
tx1, ty1 = tx0 + tile_size, ty0 + tile_size
radius = 38
tile = Image.new("RGBA", (tile_size, tile_size), (0, 0, 0, 0))
td = ImageDraw.Draw(tile)
for yy in range(tile_size):
    t = yy / tile_size
    r = int(ACCENT_BLUE[0] + (ACCENT_INDIGO[0] - ACCENT_BLUE[0]) * t)
    g = int(ACCENT_BLUE[1] + (ACCENT_INDIGO[1] - ACCENT_BLUE[1]) * t)
    b = int(ACCENT_BLUE[2] + (ACCENT_INDIGO[2] - ACCENT_BLUE[2]) * t)
    td.line([(0, yy), (tile_size, yy)], fill=(r, g, b, 255))
mask = Image.new("L", (tile_size, tile_size), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, tile_size - 1, tile_size - 1], radius=radius, fill=255)
img.paste(tile, (tx0, ty0), mask)

f_d = font(FONT_BOLD, 110)
d_text = "D"
bbox = draw.textbbox((0, 0), d_text, font=f_d)
dw = bbox[2] - bbox[0]
dh = bbox[3] - bbox[1]
draw.text((tx0 + (tile_size - dw) / 2 - bbox[0], ty0 + (tile_size - dh) / 2 - bbox[1] - 6), d_text, font=f_d, fill=(255, 255, 255, 255))
draw.ellipse([tx0 + tile_size - 44, ty0 + 22, tx0 + tile_size - 22, ty0 + 44], fill=ACCENT_PINK)

tx = tx0 + tile_size + 56
f_eye = font(FONT_BOLD, 30)
draw.text((tx, ty0 - 6), "PORTFOLIO  \u00b7  deeroot.dev", font=f_eye, fill=(ACCENT_BLUE[0], ACCENT_BLUE[1], ACCENT_BLUE[2], 230))
f_name = font(FONT_BOLD, 96)
draw.text((tx - 4, ty0 + 34), "Daniel Emerle", font=f_name, fill=TEXT_PRIMARY + (255,))
f_tag = font(FONT_REG, 40)
draw.text((tx, ty0 + 150), "Developer  \u2022  Creator  \u2022  Piano Enthusiast", font=f_tag, fill=TEXT_SECONDARY + (255,))

chip_text = "https://deeroot.dev"
f_chip = font(FONT_REG, 30)
cb = draw.textbbox((0, 0), chip_text, font=f_chip)
cw = cb[2] - cb[0]
ch = cb[3] - cb[1]
cpx = tile_pad
cpy = H - 94
padx, pady = 26, 16
chip = Image.new("RGBA", (cw + padx * 2, ch + pady * 2), (255, 255, 255, 18))
cmask = Image.new("L", (cw + padx * 2, ch + pady * 2), 0)
ImageDraw.Draw(cmask).rounded_rectangle([0, 0, cw + padx * 2 - 1, ch + pady * 2 - 1], radius=30, fill=255)
img.paste(chip, (cpx, cpy), cmask)
draw.text((cpx + padx, cpy + pady - 2), chip_text, font=f_chip, fill=TEXT_SECONDARY + (255,))

out = Image.new("RGB", (W, H), BG_TOP)
out.paste(img, (0, 0), img)
out.save("/workspace/project/deeroot-dev/static/og.png", "PNG", optimize=True)
print("Wrote static/og.png", W, "x", H)