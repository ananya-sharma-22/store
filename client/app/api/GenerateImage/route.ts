import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
    });

    // ✅ HARD GUARD (fixes TS + runtime)
    if (!result.data || result.data.length === 0 || !result.data[0].url) {
      return NextResponse.json(
        { error: "Image generation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl: result.data[0].url,
    });
  } catch (error) {
    console.error("IMAGE API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}