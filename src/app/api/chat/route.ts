import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid payload - messages array required" }, { status: 400 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful, knowledgeable, and friendly AI assistant. Provide clear, accurate, and helpful responses. Be conversational but professional. If you're unsure about something, acknowledge it honestly."
          },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenRouter API error:", error);
      return NextResponse.json({ error: error.message || "Chat API failure" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
