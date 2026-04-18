import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const ERA_PROMPTS: Record<string, string> = {
  cassette:
    "Analog cassette tape: mechanical click of play button, soft tape hiss, faint warm lo-fi music starting, vintage 1990s feel",
  cd: "Compact disc player: tray closing with mechanical hum, disc spinning up, brief crystal-clear digital tone, early 2000s",
  mp3: "Early 2000s portable MP3 player: click wheel scroll tick, soft button click, short snippet of compressed pop music",
  streaming:
    "Modern streaming app interface: gentle UI tap, soft swoosh, ambient cloud-like synth pad swell, contemporary digital",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { era } = await req.json();
    const prompt = ERA_PROMPTS[era as string];
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Invalid era" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "ELEVENLABS_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const elevenRes = await fetch("https://api.elevenlabs.io/v1/sound-generation", {
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
    });

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
