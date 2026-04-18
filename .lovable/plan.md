
The user wants the morphing device illustration in `StickyChapters` to be interactive — clicking the current device plays a short sound clip representative of that era (cassette → CD → MP3 → cloud/streaming).

## Approach

Use the **ElevenLabs Sound Effects API** via a Lovable Cloud edge function to generate the four era-specific clips on demand (cached after first play), since we don't have static audio assets and generating on the fly keeps the bundle small.

### What gets built

1. **Edge function** `generate-era-sound`
   - Accepts `{ era: "cassette" | "cd" | "mp3" | "streaming" }`
   - Maps each era to a curated prompt:
     - cassette → "Analog cassette tape: mechanical click of play button, soft tape hiss, faint warm lo-fi music starting"
     - cd → "Compact disc player: tray closing, disc spinning up, brief crystal-clear digital tone"
     - mp3 → "Early 2000s MP3 player click wheel scroll, soft button click, short compressed pop song snippet"
     - streaming → "Modern streaming app: gentle UI tap, soft swoosh, ambient cloud-like synth pad"
   - Returns MP3 audio (binary) with ~4s duration
   - Uses `ELEVENLABS_API_KEY` secret

2. **Client hook** `useEraSounds`
   - Maintains an in-memory cache `{ era → HTMLAudioElement }`
   - `play(era)`: if cached, replay; else fetch from edge function, cache, then play
   - Stops any currently-playing era clip before starting a new one

3. **`MorphIllustration` updates**
   - Determine current era from `progress` MotionValue (which segment is dominant)
   - Wrap the SVG in a `<button>` with cursor-pointer, aria-label "Play [era] sound"
   - On click, call `play(currentEra)`
   - Add a subtle hover scale + a small "▶ Tap to hear" hint overlay that fades in on hover
   - Respect global `useSound().enabled` — if user has muted SFX globally, don't play (or show a tooltip "Enable sound")

4. **Lovable Cloud setup**
   - Enable Lovable Cloud (if not already)
   - Add `ELEVENLABS_API_KEY` secret — will prompt user during implementation

### Technical notes

- Edge function returns `audio/mpeg` binary; client uses `fetch().blob()` → `URL.createObjectURL` → `new Audio()`
- Cache lives in module scope so it survives chapter re-renders
- Each clip ~4s, `prompt_influence: 0.4` for tighter adherence
- First click per era has ~2-3s generation latency; subsequent plays are instant
- Add a tiny loading spinner overlay on the illustration while fetching

### Files touched

- `supabase/functions/generate-era-sound/index.ts` (new)
- `supabase/config.toml` (register function, public)
- `src/hooks/useEraSounds.ts` (new)
- `src/components/MorphIllustration.tsx` (add click handler, era detection, hover hint)

### Out of scope

- Pre-generating and bundling static MP3s (keeps repo lean; can revisit if latency is an issue)
- Volume slider (uses global SFX toggle)
