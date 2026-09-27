import { jsonRoute } from "@/lib/api";
import { getNowPlaying } from "@/services/spotify.service";
import type { NowPlayingResponse } from "@/types/spotify";

export const GET = jsonRoute((): Promise<NowPlayingResponse> => getNowPlaying());
