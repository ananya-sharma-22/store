import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    // 🔴 TEMP FALLBACK (until SERP API is live)
    const mockImages = Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      image: `https://source.unsplash.com/600x800/?indian,ethnic,fashion,${i}`,
      title: query,
      source: "Mock",
      link: "#",
    }));

    return NextResponse.json({ images: mockImages });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Recommendation failed" },
      { status: 500 }
    );
  }
}
