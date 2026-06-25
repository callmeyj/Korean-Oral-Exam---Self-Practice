export async function POST(req) {
  try {
    const formData = await req.formData();
    const audioBlob = formData.get("audio");

    if (!audioBlob) {
      return Response.json({ error: "No audio" }, { status: 400 });
    }

    // Send to OpenAI Whisper
    const whisperForm = new FormData();
    whisperForm.append("file", audioBlob, "audio.webm");
    whisperForm.append("model", "whisper-1");
    whisperForm.append("language", "ko");
    whisperForm.append("response_format", "text");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: whisperForm,
    });

    if (!response.ok) {
      const err = await response.text();
      return Response.json({ error: err }, { status: 500 });
    }

    const transcript = await response.text();
    return Response.json({ transcript: transcript.trim() });

  } catch (err) {
    console.error("STT error:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
