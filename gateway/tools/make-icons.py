#!/usr/bin/env python3
"""Rasterizes the Gateway portal icon (src/icons/icon.svg) into PNG icons with supersampling.
Usage: python3 tools/make-icons.py"""
import math
from PIL import Image, ImageDraw

BG = (14, 12, 29)        # #0e0c1d
VIOLET = (143, 123, 255)  # #8f7bff
VIOLET_L = (183, 166, 255)  # #b7a6ff


def draw_icon(size: int) -> Image.Image:
    S = 4  # supersampling factor
    W = size * S
    img = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    u = W / 512.0  # scale unit

    # rounded-rect background
    d.rounded_rectangle([0, 0, W - 1, W - 1], radius=112 * u, fill=BG + (255,))

    # radial glow
    glow = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    steps = 48
    for i in range(steps, 0, -1):
        r = 220 * u * (i / steps)
        a = int(255 * 0.55 * (i / steps) ** 2)
        gd.ellipse([256 * u - r, 256 * u - r, 256 * u + r, 256 * u + r], fill=VIOLET + (a,))
    img = Image.alpha_composite(img, glow)
    d = ImageDraw.Draw(img)

    def ring(r, w, color, alpha=255, dash=None):
        if dash:
            dash_len, gap = dash
            c = 2 * math.pi * r * u
            period = (dash_len + gap) * u
            n = max(8, int(c / period))
            for k in range(n):
                a0 = 2 * math.pi * k / n
                a1 = a0 + 2 * math.pi * (dash_len / (dash_len + gap)) / n
                d.arc([256 * u - r * u, 256 * u - r * u, 256 * u + r * u, 256 * u + r * u],
                      math.degrees(a0), math.degrees(a1), fill=color + (alpha,), width=max(1, int(w * u)))
        else:
            d.ellipse([256 * u - r * u, 256 * u - r * u, 256 * u + r * u, 256 * u + r * u],
                      outline=color + (alpha,), width=max(1, int(w * u)))

    ring(176, 7, VIOLET, 242)
    ring(128, 5, VIOLET, 178)
    ring(80, 4, VIOLET, 128)
    ring(150, 4, VIOLET, 204, dash=(10, 26))
    ring(34, 6, VIOLET_L, 255)
    d.ellipse([256 * u - 10 * u, 256 * u - 10 * u, 256 * u + 10 * u, 256 * u + 10 * u], fill=VIOLET_L + (255,))

    return img.resize((size, size), Image.LANCZOS)


if __name__ == "__main__":
    import os
    out = os.path.join(os.path.dirname(__file__), "..", "src", "icons")
    for size, name in [(512, "icon-512.png"), (192, "icon-192.png"), (180, "apple-touch-icon.png")]:
        draw_icon(size).save(os.path.join(out, name))
        print("wrote", name)
