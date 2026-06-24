import Anthropic from "@anthropic-ai/sdk";

export async function POST(req) {
  try {
    const body = await req.json();
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: body.max_tokens || 800,
      system: body.system,
      messages: body.messages,
    });

    return Response.json(response);
  } catch (err) {
    console.error(err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
