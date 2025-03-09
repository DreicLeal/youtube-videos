import { NextResponse } from "next/server";

export async function POST(prompt: Request) {
  const { chatMessage } = await prompt.json();
  const API_KEY = process.env.OPENAI_API_KEY;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [chatMessage],
        temperature: 0.7,
      }),
    });
    const returnedResponse = await response.json();
    const message = returnedResponse.choices[0].message;
    return NextResponse.json(message);
  } catch (e) {
    console.error(e);
  }
}
