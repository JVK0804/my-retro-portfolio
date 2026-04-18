import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

// Each device key maps to a curated ElevenLabs sound prompt.
const DEVICE_PROMPTS: Record<string, string> = {
  // Original chapter eras (kept for backward compat)
  cassette:
    "Analog cassette tape: mechanical click of play button, soft tape hiss, faint warm lo-fi music starting, vintage 1990s feel",
  cd: "Compact disc player: tray closing with mechanical hum, disc spinning up, brief crystal-clear digital tone, early 2000s",
  mp3: "Early 2000s portable MP3 player: click wheel scroll tick, soft button click, short snippet of compressed pop music",
  streaming:
    "Modern streaming app interface: gentle UI tap, soft swoosh, ambient cloud-like synth pad swell, contemporary digital",

  // Retro doodles
  crt: "Old CRT television turning on: high-pitched whine, static crackle pop, brief degaussing thump",
  gameboy:
    "Original Game Boy startup: classic 8-bit power-on chime, button beep, short chiptune melody",
  vhs: "VHS video tape: mechanical clunk of cassette inserting, motorized whir of tape rewinding, soft analog static",
  phone:
    "Vintage rotary telephone: classic dial tone hum, single mechanical ring of an old bell phone",
  boombox:
    "1980s boombox: cassette deck click play, brief burst of vintage hip-hop beat with warm bass",
  camera:
    "Vintage 35mm film camera: crisp shutter click snap, mechanical film advance winding sound",

  // Modern doodles
  smartphone:
    "Modern smartphone: gentle UI notification chime, soft haptic tap, brief tri-tone alert",
  earbuds:
    "Wireless earbuds connecting: subtle bluetooth pairing chime, soft confirmation tone",
  smartwatch:
    "Smartwatch notification: short minimal digital ping, gentle wrist haptic buzz",
  ar: "Futuristic AR glasses interface: soft hologram activation hum, ambient sci-fi UI swell",
  laptop:
    "Modern laptop: clean startup chime, soft keyboard typing clicks, gentle fan whir",
  drone:
    "Quadcopter drone: four propellers spinning up to a steady mid-pitch hover whir",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    // Accept either { era } (legacy) or { device } (new)
    const key = (body.device ?? body.era) as string | undefined;
    const prompt = key ? DEVICE_PROMPTS[key] : undefined;
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Invalid device/era", key }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ELEVENLABS_API_KEY missing" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const elevenRes = await fetch(
      "https://api.elevenlabs.io/v1/sound-generation",
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: prompt,
          duration_seconds: 4,
          prompt_influence: 0.4,
        }),
      }
    );

    if (!elevenRes.ok) {
      const errText = await elevenRes.text();
      console.error("ElevenLabs error:", elevenRes.status, errText);
      return new Response(
        JSON.stringify({ error: "ElevenLabs request failed", detail: errText }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const audio = await elevenRes.arrayBuffer();
    return new Response(audio, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e) {
    console.error("generate-era-sound error", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
