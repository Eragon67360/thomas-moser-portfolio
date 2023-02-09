import { getRecentlyGames } from '../../lib/steam';
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getRecentlyGames();
  const content = response.response['games']


  const getappid = content[0].appid;
  const getname = content[0].name;
  const getplaytime = content[0].playtime_forever;
  const icon = content[0].img_icon_url;


  const len = content.length;


  let arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = [];
  }

  for (let i = 0; i < len; i++) {
    const game=content[i]
    arr[i] = game;
  }

  var ret = {}
  ret["steam"] = arr;

  return res.status(200).json(ret);
}