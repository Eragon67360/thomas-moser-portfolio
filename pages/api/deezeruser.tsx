import { getUser } from '../../lib/deezer';
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getUser();  
  
  res.setHeader("Cache-control","s-maxage=10, stale-while-revalidate")

  const deezer = response;
  if (deezer.item === null) {
    return res.status(200).json({
        deezer: {
            personastate: "Offline",
      },
    });
  }
  

  const getPersonName = deezer.name;
  const getAvatar = deezer.picture;
  const getStatus =
  deezer.status === 2
      ? "Online 😆"
      : "Offline 😴";

  
  const getprofileUrl = deezer.link;
  const getTracklist = deezer.tracklist;

  return res.status(200).json({
    deezer: {
      getPersonName,
      getAvatar,
      getStatus,
      getprofileUrl,
      getTracklist,
    },
  });
}