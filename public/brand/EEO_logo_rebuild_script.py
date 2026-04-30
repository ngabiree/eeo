from PIL import Image, ImageDraw, ImageFilter, PngImagePlugin
import numpy as np, cv2, scipy.ndimage as ndi

orig_path = "EEO_logo_image_Apr-29, 2026, 03_02_16 PM.png"
star_path = "Imana Star Image Feb 12, 2026, 01_38_40 AM.png"
donor_path = "a_clean_vector_illustration_style_circular_emblem.png"

orig = Image.open(orig_path).convert("RGBA")
star_src = Image.open(star_path).convert("RGBA")
donor = Image.open(donor_path).convert("RGBA")
W, H = orig.size

arr = np.array(star_src)
alpha = arr[:, :, 3]
mask = alpha > 20
labels, n = ndi.label(mask)
areas = np.bincount(labels.ravel())
keep_labels = [i for i, a in enumerate(areas) if i != 0 and a > 10000]
keep = np.isin(labels, keep_labels)
keep_dil = ndi.binary_dilation(keep, iterations=3)
arr_clean = arr.copy()
arr_clean[~keep_dil, 3] = 0
ys, xs = np.where(arr_clean[:, :, 3] > 0)
bbox = (int(xs.min()), int(ys.min()), int(xs.max() + 1), int(ys.max() + 1))
star_clean = Image.fromarray(arr_clean).crop(bbox)

donor2048 = donor.resize((W, H), Image.Resampling.LANCZOS)
donor_arr = np.array(donor2048.convert("RGB"))
mask_star = np.zeros((H, W), dtype=np.uint8)
mask_img = Image.fromarray(mask_star)
d = ImageDraw.Draw(mask_img)
d.ellipse((865, 185, 1185, 445), fill=255)
mask_star = np.array(mask_img)
mask_star[:170, :] = 0
mask_star[455:, :] = 0
donor_bg_arr = cv2.inpaint(donor_arr, mask_star, 5, cv2.INPAINT_TELEA)
donor_bg = Image.fromarray(donor_bg_arr).convert("RGBA")
donor_bg.putalpha(donor2048.getchannel("A"))

repair_mask = np.zeros((H, W), dtype=np.uint8)
mask_img = Image.fromarray(repair_mask)
d = ImageDraw.Draw(mask_img)
d.ellipse((820, 205, 1230, 505), fill=255)
repair_mask = np.array(mask_img)
repair_mask[:190, :] = 0
repair_mask[500:, :] = 0
repair_mask_pil = Image.fromarray(repair_mask).filter(ImageFilter.GaussianBlur(20))
base = Image.composite(donor_bg, orig, repair_mask_pil)

star_resized = star_clean.resize((226, 207), Image.Resampling.LANCZOS)
fixed = base.copy()
fixed.alpha_composite(star_resized, (906, 218))
fixed.convert("RGB").save("EEO_logo_fixed_cream_master.png", optimize=True)

img = np.array(fixed.convert("RGBA"))
rgb = img[:, :, :3].astype(np.float32)
hsv = cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2HSV)
S = hsv[:, :, 1].astype(np.float32)
V = hsv[:, :, 2].astype(np.float32)

border = np.zeros((H, W), dtype=bool)
border[:150, :] = True
border[-150:, :] = True
border[:, :150] = True
border[:, -150:] = True
cands = border & (S < 35) & (V > 210)
bg = np.median(rgb[cands], axis=0)

delta = np.linalg.norm(rgb - bg, axis=2)
alpha_strength = np.maximum.reduce([
    (delta - 35) / 45,
    (S - 35) / 55,
    (190 - V) / 80
])
alpha_strength = np.clip(alpha_strength, 0, 1)

gray = cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2GRAY)
edges = cv2.Canny(gray, 50, 150)
ed = ndi.binary_dilation(edges > 0, iterations=2)
alpha_strength = np.maximum(alpha_strength, ed.astype(np.float32) * 0.75)

alpha_strength = alpha_strength ** 0.9
alpha_strength[alpha_strength < 0.07] = 0

transparent_arr = img.copy()
transparent_arr[:, :, 3] = (alpha_strength * 255).astype(np.uint8)
transparent = Image.fromarray(transparent_arr, "RGBA")
transparent.save("EEO_logo_fixed_transparent_master.png", optimize=True)
