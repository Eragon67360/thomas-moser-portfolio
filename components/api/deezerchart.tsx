import { getCharts } from '../../lib/deezer';
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getCharts();
  
  res.setHeader("Cache-control","s-maxage=10, stale-while-revalidate")

  return res.status(200).json(response);
}