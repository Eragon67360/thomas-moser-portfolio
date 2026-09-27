import { type NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/request";
import { getPost } from "@/services/posts.service";
import { recordPostView } from "@/services/views.service";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: unknown = await req.json().catch(() => null);
  const slug = typeof body === "object" && body !== null && "slug" in body ? body.slug : undefined;
  if (typeof slug !== "string" || slug.length === 0) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  // Only count existing posts, so arbitrary slugs can't create Redis keys.
  if (!(await getPost(slug))) {
    return NextResponse.json({ error: "Unknown post" }, { status: 404 });
  }

  try {
    await recordPostView(slug, getClientIp(req));
  } catch (error) {
    console.error(error);
  }
  return new NextResponse(null, { status: 202 });
}
