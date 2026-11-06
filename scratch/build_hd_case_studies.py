import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

font_bold_path = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
font_reg_path = '/System/Library/Fonts/Supplemental/Arial.ttf'

def get_fonts(title_size=56, desc_size=28, sub_size=38, tag_size=24):
    f_title = ImageFont.truetype(font_bold_path, title_size)
    f_desc = ImageFont.truetype(font_reg_path, desc_size)
    f_sub = ImageFont.truetype(font_bold_path, sub_size)
    f_tag = ImageFont.truetype(font_bold_path, tag_size)
    return f_title, f_desc, f_sub, f_tag

def wrap_text(text, font, max_width, draw):
    lines = []
    for paragraph in text.split('\n'):
        if not paragraph.strip():
            lines.append('')
            continue
        words = paragraph.split()
        cur = []
        for w in words:
            test = ' '.join(cur + [w])
            bbox = draw.textbbox((0, 0), test, font=font)
            if bbox[2] - bbox[0] <= max_width:
                cur.append(w)
            else:
                lines.append(' '.join(cur))
                cur = [w]
        if cur:
            lines.append(' '.join(cur))
    return lines

def enhance_img(crop, target_w):
    cw, ch = crop.size
    target_h = int(target_w * (ch / cw))
    scaled = crop.resize((target_w, target_h), Image.Resampling.LANCZOS)
    enh = ImageEnhance.Sharpness(scaled).enhance(1.4)
    enh = ImageEnhance.Contrast(enh).enhance(1.04)
    return enh

W = 1600
PAD = 70
INNER_W = W - (PAD * 2)
dummy = ImageDraw.Draw(Image.new('RGB', (10, 10)))

# ---------------------------------------------------------
# 1. AMIT TANDON
# ---------------------------------------------------------
def build_amit():
    src_p = '/Users/rohan/.gemini/antigravity/brain/ea8b6f20-c1e5-43fc-8e54-1ab2c424c68c/.user_uploaded/media_1793903678860_e19e178e.jpg'
    src = Image.open(src_p).convert('RGB')
    bg = (16, 42, 34)
    f_title, f_desc, f_sub, f_tag = get_fonts(56, 28, 38, 24)

    title = 'Amit Tandon (Stand-up Comedian)'
    desc = (
        'I designed the official poster for Amit Tandon\'s HALWA Tour — a global stand-up comedy\n'
        'tour spanning the UK, Europe, Australia, New Zealand, and Dubai.\n\n'
        'The creative direction blends bold retro typography, vibrant travel visuals, and a\n'
        'friendly, clean aesthetic that mirrors Amit\'s relatable humor. The design features\n'
        'iconic landmarks, flight paths, and a warm, textured background to reflect the show\'s\n'
        'international journey and cultural connections.\n\n'
        'This poster served as the primary creative across digital and venue promotions,\n'
        'setting the tone for the tour\'s branding.'
    )

    p1 = enhance_img(src.crop((0, 97, 209, 316)), INNER_W)
    p2 = enhance_img(src.crop((0, 328, 209, 476)), INNER_W)
    p3 = enhance_img(src.crop((0, 508, 209, 650)), INNER_W)
    p4 = enhance_img(src.crop((0, 666, 209, 825)), INNER_W)
    p5 = enhance_img(src.crop((0, 856, 209, 965)), INNER_W)

    desc_lines = wrap_text(desc, f_desc, INNER_W, dummy)
    line_h = 42
    y_header = PAD + 75 + (len(desc_lines) * line_h) + 50

    total_h = y_header + p1.height + 40 + p2.height + 60 + 55 + p3.height + 40 + p4.height + 60 + 55 + p5.height + PAD

    canvas = Image.new('RGB', (W, total_h), bg)
    draw = ImageDraw.Draw(canvas)

    y = PAD
    draw.text((PAD, y), title, font=f_title, fill=(255, 255, 255))
    y += 80
    for l in desc_lines:
        draw.text((PAD, y), l, font=f_desc, fill=(210, 230, 222))
        y += line_h
    y += 50

    canvas.paste(p1, (PAD, y))
    y += p1.height + 40

    canvas.paste(p2, (PAD, y))
    y += p2.height + 60

    draw.text((PAD, y), 'For Bangalore Promotional Banner', font=f_sub, fill=(255, 255, 255))
    y += 55

    canvas.paste(p3, (PAD, y))
    y += p3.height + 40

    canvas.paste(p4, (PAD, y))
    y += p4.height + 60

    draw.text((PAD, y), 'Published at Phoenix Mall Bangalore', font=f_sub, fill=(255, 255, 255))
    y += 55

    canvas.paste(p5, (PAD, y))

    canvas.save('assets/projects/halwa-tour-casestudy-hd.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('assets/projects/halwa-tour-casestudy.jpg', 'JPEG', quality=90, optimize=True)
    print('Amit Tandon completed:', canvas.size)

# ---------------------------------------------------------
# 2. KUMAR VISHWAS
# ---------------------------------------------------------
def build_kumar():
    src_p = '/Users/rohan/.gemini/antigravity/brain/ea8b6f20-c1e5-43fc-8e54-1ab2c424c68c/.user_uploaded/media_1793904082548_c8575613.jpg'
    src = Image.open(src_p).convert('RGB')
    bg = (0, 52, 60)
    f_title, f_desc, f_sub, f_tag = get_fonts(56, 28, 38, 24)

    title = 'Kavi Sammelan ft. Dr. Kumar Vishwas'
    desc = (
        'Designed this vibrant poster for an upcoming Kavi Sammelan featuring the legendary\n'
        'Dr. Kumar Vishwas. I went with a retro-inspired look using bold colors, vintage\n'
        'textures, and expressive typography to reflect the energy of poetic storytelling.\n\n'
        'It was an honor to craft the visual identity for such a culturally rich event —\n'
        'blending tradition with modern design aesthetics.'
    )

    p1 = enhance_img(src.crop((0, 165, 341, 455)), INNER_W)
    p2 = enhance_img(src.crop((0, 498, 341, 695)), INNER_W)
    p3 = enhance_img(src.crop((0, 746, 341, 980)), INNER_W)

    desc_lines = wrap_text(desc, f_desc, INNER_W, dummy)
    line_h = 42
    y_header = PAD + 75 + (len(desc_lines) * line_h) + 50

    total_h = y_header + 55 + p1.height + 60 + 55 + p2.height + 60 + 55 + p3.height + PAD

    canvas = Image.new('RGB', (W, total_h), bg)
    draw = ImageDraw.Draw(canvas)

    y = PAD
    draw.text((PAD, y), title, font=f_title, fill=(255, 255, 255))
    y += 80
    for l in desc_lines:
        draw.text((PAD, y), l, font=f_desc, fill=(200, 230, 232))
        y += line_h
    y += 50

    draw.text((PAD, y), 'Mall Promotional Banner', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p1, (PAD, y))
    y += p1.height + 60

    draw.text((PAD, y), 'Bookmyshow Banner', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p2, (PAD, y))
    y += p2.height + 60

    draw.text((PAD, y), 'Social Media Suite', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p3, (PAD, y))

    canvas.save('assets/projects/dr-kumar-vishwas-case-study-hd.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('assets/projects/dr-kumar-vishwas-case-study.jpg', 'JPEG', quality=90, optimize=True)
    print('Kumar Vishwas completed:', canvas.size)

# ---------------------------------------------------------
# 3. DR. PAL
# ---------------------------------------------------------
def build_pal():
    src_p = '/Users/rohan/.gemini/antigravity/brain/ea8b6f20-c1e5-43fc-8e54-1ab2c424c68c/.user_uploaded/media_1793904082522_b54c8c7c.jpg'
    src = Image.open(src_p).convert('RGB')
    bg = (10, 10, 10)
    f_title, f_desc, f_sub, f_tag = get_fonts(56, 28, 38, 24)

    title = 'Dr. Pal — Podcast Branding'
    desc = (
        'I had the opportunity to lead the visual branding for Dr. Pal\'s podcast series —\n'
        'a knowledge-driven content channel that exploded in popularity.\n\n'
        'Designed the complete visual identity for Dr. Pal\'s podcast across YouTube and\n'
        'Spotify. This included the channel banner, episode thumbnails, and Spotify cover art.\n\n'
        'The cohesive design helped the channel gain 1M+ subscribers and over 50M views\n'
        'in just 4 months, driving massive engagement and recognition.'
    )

    p1 = enhance_img(src.crop((0, 260, 366, 355)), INNER_W)
    p2 = enhance_img(src.crop((0, 396, 366, 685)), INNER_W)
    p3 = enhance_img(src.crop((0, 766, 366, 955)), INNER_W)

    desc_lines = wrap_text(desc, f_desc, INNER_W, dummy)
    line_h = 42
    y_header = PAD + 75 + (len(desc_lines) * line_h) + 50

    total_h = y_header + 55 + p1.height + 60 + 55 + p2.height + 60 + 55 + p3.height + PAD

    canvas = Image.new('RGB', (W, total_h), bg)
    draw = ImageDraw.Draw(canvas)

    y = PAD
    draw.text((PAD, y), title, font=f_title, fill=(255, 255, 255))
    y += 80
    for l in desc_lines:
        draw.text((PAD, y), l, font=f_desc, fill=(215, 215, 220))
        y += line_h
    y += 50

    draw.text((PAD, y), 'YouTube Channel Banner', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p1, (PAD, y))
    y += p1.height + 60

    draw.text((PAD, y), 'Viral Thumbnails Architecture', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p2, (PAD, y))
    y += p2.height + 60

    draw.text((PAD, y), 'Spotify Audio Creative & Guest Covers', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p3, (PAD, y))

    canvas.save('assets/projects/dr-pal-case-study-hd.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('assets/projects/dr-pal-case-study.jpg', 'JPEG', quality=90, optimize=True)
    print('Dr Pal completed:', canvas.size)

# ---------------------------------------------------------
# 4. HIMEYA
# ---------------------------------------------------------
def build_himeya():
    src_p = '/Users/rohan/.gemini/antigravity/brain/ea8b6f20-c1e5-43fc-8e54-1ab2c424c68c/.user_uploaded/media_1793904082522_1d2eb64a.jpg'
    src = Image.open(src_p).convert('RGB')
    bg = (34, 32, 38)
    f_title, f_desc, f_sub, f_tag = get_fonts(56, 28, 38, 24)

    title = 'Himēya — Conscious Living'
    desc = (
        'Comprehensive digital visual campaign and on-premise retail presentation for Himēya — an\n'
        'international sustainable luxury home textiles and conscious lifestyle brand.\n\n'
        'Executed multi-platform visual storytelling across organic kids bedding, summer pool towel\n'
        'collections, festive moments, and dual-sided vertical illuminated lightbox store banners\n'
        'showcasing tactile elegance, thread-count perfection, and mindful craft in premium stores.'
    )

    p1 = enhance_img(src.crop((0, 126, 360, 345)), INNER_W)
    p2 = enhance_img(src.crop((0, 355, 360, 575)), INNER_W)
    p3 = enhance_img(src.crop((0, 668, 360, 950)), INNER_W)

    desc_lines = wrap_text(desc, f_desc, INNER_W, dummy)
    line_h = 42
    y_header = PAD + 75 + (len(desc_lines) * line_h) + 50

    total_h = y_header + 55 + p1.height + 60 + 55 + p2.height + 60 + 55 + p3.height + PAD

    canvas = Image.new('RGB', (W, total_h), bg)
    draw = ImageDraw.Draw(canvas)

    y = PAD
    draw.text((PAD, y), title, font=f_title, fill=(255, 255, 255))
    y += 80
    for l in desc_lines:
        draw.text((PAD, y), l, font=f_desc, fill=(220, 215, 225))
        y += line_h
    y += 50

    draw.text((PAD, y), 'Social Media Campaign & Device Mockups', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p1, (PAD, y))
    y += p1.height + 60

    draw.text((PAD, y), 'Editorial Lifestyle & Product Grid', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p2, (PAD, y))
    y += p2.height + 60

    draw.text((PAD, y), 'Retail Store Illuminated Lightbox', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p3, (PAD, y))

    canvas.save('assets/projects/himeya-case-study-hd.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('assets/projects/himeya-case-study.jpg', 'JPEG', quality=90, optimize=True)
    print('Himeya completed:', canvas.size)

# ---------------------------------------------------------
# 5. ROCK PAPER RUM
# ---------------------------------------------------------
def build_rum():
    src_p = '/Users/rohan/.gemini/antigravity/brain/ea8b6f20-c1e5-43fc-8e54-1ab2c424c68c/.user_uploaded/media_1793904082520_a9c647d1.jpg'
    src = Image.open(src_p).convert('RGB')
    bg = (10, 24, 40)
    f_title, f_desc, f_sub, f_tag = get_fonts(56, 28, 38, 24)

    title = 'Rock Paper Rum — Craft Spirits'
    desc = (
        'Experiential brand identity, outdoor festival collateral, and social media creative suite\n'
        'for Rock Paper Rum — an artisanal Indian craft rum brand redefining urban cocktail\n'
        'and festival culture.\n\n'
        'Crafted high-impact festival setups, viral social cutdowns, and handcrafted easel exhibition\n'
        'collateral for Viva Carnival.'
    )

    p1 = enhance_img(src.crop((0, 216, 380, 435)), INNER_W)
    p2 = enhance_img(src.crop((0, 501, 380, 650)), INNER_W)
    p3 = enhance_img(src.crop((0, 746, 380, 990)), INNER_W)

    desc_lines = wrap_text(desc, f_desc, INNER_W, dummy)
    line_h = 42
    y_header = PAD + 75 + (len(desc_lines) * line_h) + 50

    total_h = y_header + 55 + p1.height + 60 + 55 + p2.height + 60 + 55 + p3.height + PAD

    canvas = Image.new('RGB', (W, total_h), bg)
    draw = ImageDraw.Draw(canvas)

    y = PAD
    draw.text((PAD, y), title, font=f_title, fill=(255, 255, 255))
    y += 80
    for l in desc_lines:
        draw.text((PAD, y), l, font=f_desc, fill=(205, 220, 235))
        y += line_h
    y += 50

    draw.text((PAD, y), 'Bar Counter For Outdoor Event', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p1, (PAD, y))
    y += p1.height + 60

    draw.text((PAD, y), 'Social Media Post Series & Story Carousel', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p2, (PAD, y))
    y += p2.height + 60

    draw.text((PAD, y), 'Poster For Event — Viva Carnival', font=f_sub, fill=(255, 255, 255))
    y += 55
    canvas.paste(p3, (PAD, y))

    canvas.save('assets/projects/rock-paper-rum-case-study-hd.jpg', 'JPEG', quality=95, optimize=True)
    canvas.save('assets/projects/rock-paper-rum-case-study.jpg', 'JPEG', quality=90, optimize=True)
    print('Rock Paper Rum completed:', canvas.size)

if __name__ == '__main__':
    build_amit()
    build_kumar()
    build_pal()
    build_himeya()
    build_rum()
    print('All 5 HD case study presentations built with 100% precision!')
