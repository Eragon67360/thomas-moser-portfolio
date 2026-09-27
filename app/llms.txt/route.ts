import { buildLlmsTxt } from "@/lib/seo/llms-txt";
import { getPostSummaries } from "@/services/posts.service";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getPostSummaries();
  return new Response(buildLlmsTxt(posts), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
