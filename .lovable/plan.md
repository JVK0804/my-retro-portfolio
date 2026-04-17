
The user has uploaded three landmark photos and wants them converted into illustrations matching the site's existing aesthetic, then placed in the "Where I'm From" section of the About page (the `CitiesJourney` component).

**Current state:** `CitiesJourney.tsx` already references `landmark-vizag.png`, `landmark-hyderabad.png`, and `landmark-bloomington.png` from `@/assets`. These were generated previously. The user wants them replaced with new illustrations based on their actual reference photos.

**Site illustration style** (from existing assets / dark inverted treatment via `dark:invert`): line-art / monochrome ink illustrations on transparent background, hand-drawn feel, single color (works in both light and dark mode via invert).

### Plan

**1. Generate three new landmark illustrations** using AI image generation (Nano banana 2 — `google/gemini-3.1-flash-image-preview`) with each uploaded photo as the input reference. Style prompt:
- Monochrome black ink line illustration on pure white background
- Hand-drawn architectural sketch feel (loose, confident pen strokes)
- Transparent-friendly (white bg removable via `dark:invert`)
- Square 1:1 composition, centered subject
- Matches existing minimal aesthetic

Specific prompts per landmark:
- **Vizag** → Dolphin's Nose hill silhouette over the Bay of Bengal, with subtle ship and lighthouse hint, gentle wave lines
- **Hyderabad** → Charminar with its four minarets and central arch, intricate but loose linework
- **Bloomington** → Indiana University Sample Gates (twin stone arches with lanterns), framed by tree branches

**2. Save outputs** to:
- `src/assets/landmark-vizag.png`
- `src/assets/landmark-hyderabad.png`
- `src/assets/landmark-bloomington.png`

(Overwriting the existing placeholders — `CitiesJourney.tsx` already imports these exact paths, so no code changes needed.)

**3. Verify** the illustrations render correctly in both light and dark mode (the component uses `dark:invert` so the illustrations must be black-on-white).

### Files touched
- `src/assets/landmark-vizag.png` (overwrite)
- `src/assets/landmark-hyderabad.png` (overwrite)
- `src/assets/landmark-bloomington.png` (overwrite)

No `.tsx` changes required — imports already point at these paths.

### Notes
- Reference photos will be passed as image inputs to the image-edit endpoint so the silhouettes / proportions stay accurate to the real landmarks.
- White background + `dark:invert` already in `CitiesJourney.tsx` will handle theming automatically.
