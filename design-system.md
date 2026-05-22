# Kaushik JV — Design System v1.1

**Zillennial Bridge · Heritage Cream × Cerulean Teal**

> A design engineering system that bridges Tactile Nostalgia (1995–2005) with Apple's 2026 Liquid Glass minimalist standards. Built for a portfolio that signals dual fluency in design craft and front-end engineering.

---

## Changelog

### v1.1 — Retro-Futurist Serif Expansion
- Added three serif display fonts: Fraunces, Playfair Display, DM Serif Display
- Added Space Mono as an explicit token (`--font-mono-space`) separate from the SF Mono system fallback
- Added serif-specific scale tokens: size, weight, tracking, line-height, Fraunces variation presets
- Updated `tailwind.config.ts` fontFamily with `font-serif-fraunces`, `font-serif-playfair`, `font-serif-dm`, `font-mono-space`
- Nothing removed — all v1.0 tokens intact

---

## Design Philosophy

### The Three Principles

**1. Tactile Skeuomorphism 2.0**
Modern glassmorphism mimics the weight and texture of physical hardware — translucent plastics, CRT-style glows, grain on every surface. Physical weight is achieved through layered translucency, not literal texture mapping.

**2. Intentional Friction**
Interactions have a physical press phase (30ms compress to `scale(0.955)`) and a spring-return (280ms overshoot to `scale(1.018)`). Mechanical feel, fluid 120Hz execution. The "click-clack" is a design decision, not an animation afterthought.

**3. The Hybrid Palette**
Heritage Cream base (`#E8E4D9`) evoking 90s computer beige, paired with High-Voltage Cerulean Teal (`#0E7490`) evoking fiber-optic infrastructure. Two eras on one surface.

---

## Colour Tokens

### Base — Heritage Cream

| Token | Value | Usage |
|---|---|---|
| `--color-heritage-cream` | `#E8E4D9` | Page base, scene background |
| `--color-cream-bright` | `#F5F2EB` | Card highlight, specular layer |
| `--color-cream-shadow` | `#D4CFBF` | Depth, dividers, borders |

> All backgrounds carry a warm brown undertone. Never substitute with neutral or cool greys — this is what makes the system feel human rather than clinical.

### Accent — Cerulean Teal

| Token | Value | Usage |
|---|---|---|
| `--color-primary` / `--color-teal-deep` | `#0E7490` | Primary interactive, labels, CTAs |
| `--color-primary-hover` / `--color-teal-volt` | `#22B8CF` | Hover states, CRT glow |
| `--color-primary-phosphor` / `--color-teal-phosphor` | `#A5F3FC` | CRT terminal text on dark only |
| `--color-primary-subtle` | `rgba(14,116,144,0.10)` | Tag fills, badge backgrounds |
| `--color-primary-border` | `rgba(14,116,144,0.28)` | Tag and badge borders |

> The accent is used on **one semantic layer only**: interactive elements (links, CTAs, labels). Everything else uses the neutral cream ramp. This is Apple-style restraint — the accent earns its weight by appearing rarely.

### Ink — Text Ramp

| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#1C1A14` | Primary text on cream |
| `--color-ink-muted` | `#5A5648` | Body copy, descriptions |
| `--color-ink-disabled` | `#9A9488` | Captions, metadata, read-time |

### Contrast Ratios (on `#E8E4D9`)

| Colour | Ratio | WCAG |
|---|---|---|
| `#0E7490` on cream | 4.8:1 | AA — body text safe |
| `#1C1A14` on cream | 12.1:1 | AAA — primary text |
| `#5A5648` on cream | 5.2:1 | AA — body copy safe |

---

## Typography

### Font Families

| Token | Family | Role | Source |
|---|---|---|---|
| `--font-display` | SF Pro Display | Hero/H1 — sans | System |
| `--font-body` | SF Pro Text | H2–body — sans | System |
| `--font-mono` | SF Mono / JetBrains Mono | Terminal labels | System / fallback |
| `--font-mono-space` | Space Mono | CRT labels, explicit mono | Google Fonts |
| `--font-serif-fraunces` | Fraunces | Retro-futurist display | Google Fonts |
| `--font-serif-playfair` | Playfair Display | Editorial display | Google Fonts |
| `--font-serif-dm` | DM Serif Display | Tech-editorial display | Google Fonts |

### Serif Font Profiles

**Fraunces** — the most technically advanced. A variable font with two axes: `opsz` (optical size 9–144) and `WONK` (0–1, adds ink-trap quirks). The font adapts its own contrast and details based on the size you set. Era signal: 90s literary magazine. Best for hero headlines where you want warmth with personality.

```css
/* Fraunces variation presets */
--fraunces-display: 'opsz' 144, 'WONK' 1;  /* hero — max optical, max quirk */
--fraunces-heading: 'opsz' 72,  'WONK' 1;  /* section titles                */
--fraunces-small:   'opsz' 9,   'WONK' 0;  /* card titles — clean, no quirk */
```

**Playfair Display** — the most editorial. Extreme thick/thin Didone stroke contrast. Hairline stems are spectacular at 40px+. Era signal: 90s fashion editorial (Vogue, Harper's Bazaar energy). The italic is exceptional — use it for case study pull quotes and section subheads.

**DM Serif Display** — the sharpest. Designed by Colophon Foundry for DeepMind's identity system. Geometric serif brackets — engineered rather than calligraphic. Era signal: tech-editorial hybrid. Never use below 28px. No body copy role whatsoever.

### next/font/google Setup (layout.tsx)

```ts
import {
  Fraunces,
  Playfair_Display,
  DM_Serif_Display,
  Space_Mono
} from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'WONK'],
  weight: ['300', '400', '700'],
  variable: '--font-serif-fraunces',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif-playfair',
})
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif-dm',
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono-space',
})

// Add all four variables to <html> className:
// className={`${fraunces.variable} ${playfair.variable} ${dmSerif.variable} ${spaceMono.variable}`}
```

### Tailwind Usage

```tsx
// Serif display classes (wired via tailwind.config.ts)
<h1 className="font-serif-fraunces">Product Designer</h1>
<h1 className="font-serif-playfair">Product Designer</h1>
<h1 className="font-serif-dm">Product Designer</h1>

// Space Mono explicit class
<span className="font-mono-space">&lt;developer's mindset/&gt;</span>

// Fraunces with variation settings (requires inline style)
<h1
  className="font-serif-fraunces"
  style={{ fontVariationSettings: 'var(--fraunces-display)' }}
>
  Product Designer
</h1>
```

### Type Scale

| Token | Size | Weight | Tracking | Line Height | Usage |
|---|---|---|---|---|---|
| `--font-size-display` | 80px | 200 | −0.05em | 1.0 | Hero headline |
| `--font-size-h1` | 52px | 200 | −0.04em | 1.1 | Section hero |
| `--font-size-h2` | 28px | 400 | −0.03em | 1.2 | Section titles |
| `--font-size-h3` | 20px | 500 | −0.02em | 1.3 | Card titles |
| `--font-size-body` | 16px | 400 | −0.01em | 1.75 | Body copy |
| `--font-size-caption` | 13px | 400 | 0 | 1.5 | Metadata, read-time |
| `--font-size-label` | 11px | 500 | +0.08em | 1.4 | UI labels (CAPS) |
| `--font-size-terminal` | 13px | 400 | +0.12em | 1.6 | CRT terminal text (CAPS) |

> Display and H1 use weight **200** (light). This reads as open and approachable rather than cold. Weight 500 is reserved for structural work — H3, labels, CTAs.

---

## Spacing

**Base unit: 4px.** All spacing values are multiples of 4. Never use arbitrary values outside this scale.

| Token | Value | Semantic Role |
|---|---|---|
| `--space-1` | 4px | Icon gaps, micro spacing |
| `--space-2` | 8px | Inline elements |
| `--space-3` | 12px | Tight stacks |
| `--space-4` | 16px | Component padding |
| `--space-6` | 24px | Card internal spacing |
| `--space-8` | 32px | Between components |
| `--space-12` | 48px | Section gap (mobile) |
| `--space-20` | 80px | Section gap (desktop) |
| `--space-28` | 112px | Hero breathing room |

---

## Border Radius

**Concentric Apple logic** — outer container radius is always larger than inner element radius.

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Tags, chips, badges |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 14px | Project cards |
| `--radius-xl` | 20px | Modals, scene frames |
| `--radius-pill` | 100px | Label pills, CTA buttons |

---

## Glass Card — Layer Anatomy

The project card is a five-layer composition. Order matters precisely.

```
1. Scene grain      SVG feTurbulence on the world, not the card
2. Heritage Cream   #E8E4D9 base scene background
3. Glass card       rgba(232,228,217,0.45) + backdrop-filter: blur(12px)
4. Specular ::before  gradient from white/28% → white/4% (top-left to bottom-right)
5. Glint ::after    1px top-edge line: transparent → white/80% → transparent
6. Content          z-index: 20, relative positioning
```

> The grain lives on the **scene**, not the card. This makes grain read as the world's texture — the card appears to float on top of a physical surface rather than being printed into it.

### CSS Implementation

```css
.glass-card {
  background: var(--color-glass-bg);            /* rgba cream at 45% */
  border: var(--border-glass);                  /* white/55% */
  border-radius: var(--radius-lg);              /* 14px */
  backdrop-filter: var(--blur-glass);           /* blur(12px) */
  -webkit-backdrop-filter: var(--blur-glass);
  overflow: hidden;
  position: relative;
}

.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg,
    var(--color-glass-specular-from),
    var(--color-glass-specular-to)
  );
  pointer-events: none;
}

.glass-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    var(--color-glass-glint),
    transparent
  );
  pointer-events: none;
}
```

---

## Interaction — Haptic Spring (Click-Clack)

The mechanical button interaction mimics the physical sensation of pressing a tactile switch. Two phases, each with a distinct timing and easing curve.

### Timing Breakdown

| Phase | Duration | Transform | Easing |
|---|---|---|---|
| Press (compress) | 30ms | `scale(0.955)` | `cubic-bezier(0.4, 0, 1, 1)` — hard ease-in |
| Hold | 20ms | static | — |
| Spring return | 280ms | `scale(1.018 → 1.0)` | Spring: stiffness 520, damping 22, mass 0.6 |
| Settle | 50ms | `scale(1.0)` | micro-damp |

### Framer Motion Values

```ts
const springConfig = {
  type: 'spring',
  stiffness: 520,   // high — gives snap-back authority
  damping: 22,      // low — allows the 1.018 overshoot (the "clack")
  mass: 0.6         // keeps total duration under 320ms for 120Hz
}
```

> Always bind to `onPointerDown`, not `onClick`. Pointer fires on finger contact; click fires on release. That 60–80ms difference is the entire tactile illusion.

---

## Grain Overlay — Performance Notes

The grain texture uses an inline SVG `feTurbulence` filter encoded as a `data:` URI background-image. This approach:

- Makes **zero additional HTTP requests**
- Causes **zero Cumulative Layout Shift (CLS)**
- Adds approximately **0.4kb** inline
- Uses `will-change: transform` + `translateZ(0)` to promote to its own GPU compositor layer — **no repaint cost on scroll**

```tsx
// GrainOverlay.tsx — drop into any layout
export function GrainOverlay({ opacity = 0.4 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        backgroundImage: 'var(--grain-scene)',
        backgroundSize: 'var(--grain-size)',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  )
}
```

---

## File Structure

```
/styles
  tokens.css          ← CSS custom properties v1.1 (source of truth)
/tokens
  tokens.json         ← W3C Design Tokens format v1.1 (Figma + Tailwind)
/app
  layout.tsx          ← next/font/google setup for all 4 new fonts
/components
  GlassCard.tsx       ← Glass-on-beige card primitive
  GrainOverlay.tsx    ← Performance-safe film layer
  HapticButton.tsx    ← Haptic spring wrapper
/hooks
  useHapticPress.ts   ← Click-clack animation hook
```

---

## Cursor Implementation Order

1. Drop `tokens.css` into `/styles/` and import in `app/globals.css`
2. Paste `$tailwindConfig.theme.extend` block from `tokens.json` into `tailwind.config.js`
3. Build `GrainOverlay.tsx` — it wraps everything else
4. Build `GlassCard.tsx` with grain wired in
5. Build `useHapticPress.ts` hook
6. Build `HapticButton.tsx` wrapper using the hook
7. Build the Project Card using `GlassCard` + `HapticButton`
8. Build the navigation shell with `--blur-nav` vibrancy

---

## System Status

| Layer | Status |
|---|---|
| Colour tokens | Locked |
| Typography scale — SF Pro | Locked |
| Typography scale — Serif (v1.1) | Locked |
| Spacing grid | Locked |
| Border radius | Locked |
| Glass card anatomy | Locked |
| Haptic spring values | Locked |
| `tokens.css` | v1.1 complete |
| `tokens.json` | v1.1 complete |
| `design-system.md` | v1.1 complete |
| `layout.tsx` font setup | Phase 1 |
| `tailwind.config.ts` | Phase 1 |
| Component library | Phase 2 |
| Navigation shell | Phase 2 |

---

*Kaushik JV · Design System v1.1 · Last updated 2026*
