import { NextRequest, NextResponse } from "next/server";

import { Redis } from "@upstash/redis";
import { redis } from "@/lib/redis";

const redisObject = redis;

export const runtime = "edge"
export async function POST(req: NextRequest): Promise<NextResponse> {
    const body = await req.json();
    const slug = body.slug as string | undefined;
    if (!slug) {
        return new NextResponse("Slug not found", { status: 400 });
    }

    const ip = req.ip;
    // Hash the IP and turn it into a hex string
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
    const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    const isNew = await redisObject.set(["deduplicate", hash, slug].join(":"), true, {
        nx: true,
        ex: 24 * 60 * 60,
    });
    if (!isNew) {
        new NextResponse(null, { status: 202 });
    }

    await redisObject.incr(["pageviews", "posts", slug].join(":"));
    return new NextResponse(null, { status: 202 });
}

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } },
  ) {
    try {
      const slug = params.slug;
      const views = await redis.get<number>(["pageviews", "posts", params.slug].join(":"))?? '--';
      return NextResponse.json({ error: null, views });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'someting went wrong', views: null },
        { status: 500 },
      );
    }
  }