import { redis } from '@/lib/redis';

export const getPostViews = async (slug: string) => {
    const views = await redis.get<number>(["pageviews", "posts", slug].join(":")) ?? '0'
    return views;
};
