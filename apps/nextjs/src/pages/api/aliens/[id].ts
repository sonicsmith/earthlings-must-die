import type { NextApiRequest, NextApiResponse } from 'next';
import { alienSpecies } from '~/data/alien';
import { getThreeDigitNumber } from '~/utils/getThreeDigitNumber';

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

  const imageName = getThreeDigitNumber(Number(id));

  res.status(200).json({
    name: alienSpecies[Number(id)]?.name,
    description: alienSpecies[Number(id)]?.description,
    external_url: 'https://earthlingsmustdie.io',
    image: `https://earthlingsmustdie.io/images/aliens/${imageName}.jpg`,
    attributes: [],
  });
}

export default handler;
