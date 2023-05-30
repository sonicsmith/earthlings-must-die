import type { NextApiRequest, NextApiResponse } from 'next';

/**
 *
 * @param req
 * @param res
 *
 * This endpoint will return success response with an object that complies
 * with OpenSea NFT standard.
 *
 * Check: https://docs.opensea.io/docs/metadata-standards
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const imageName = Number(id).toString().padStart(3, '0');

  res.status(200).json({
    description: `These aliens eh? They're a bit of a handful.`,
    external_url: 'https://earthlingsmustdie.io',
    image: `https://earthlingsmustdie.io/images/aliens/${imageName}.jpg`,
    name: `Alien Species #${id}`,
    attributes: [],
  });
}

export default handler;
