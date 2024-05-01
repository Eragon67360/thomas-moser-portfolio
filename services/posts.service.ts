import getPosts from "@/lib/get-posts";
import { redis } from "@/lib/redis";
import { ScanCommandOptions } from "@upstash/redis";

interface PageView {
    slug: string;
    views: number;
}

export async function fetchSortedPageViews(): Promise<{ slug: string, views: number }[]> {
    let cursor = 0;
    let keys: string[] = [];
    do {
      const reply = await redis.scan(cursor, { match: 'pageviews:posts:*', count: 100 });
      cursor = reply[0];
      keys = keys.concat(reply[1]);
    } while (cursor !== 0);
  
    if (keys.length === 0) return [];
  
    const values = await redis.mget<any>(...keys);
  
    // Combine keys and values, and extract the slug from the key
    const pageViews = keys.map((key, index) => {
      const slug = key.split(':')[2];
      return {
        slug,
        views: values[index] || 0 // Handle possible null values
      };
    });
  
    // Sort the results by views in descending order
    return pageViews.sort((a, b) => b.views - a.views);
  }