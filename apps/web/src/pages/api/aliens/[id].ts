import type { NextApiRequest, NextApiResponse } from 'next';
import { alienNames, alienColors } from '~/data/alien';
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
    name: alienNames[Number(id)],
    external_url: 'https://humansmustdie.io',
    image: `https://humansmustdie.io/images/aliens/${imageName}.jpg`,
    attributes: [
      {
        trait_type: 'Color',
        value: alienColors[Number(id)],
      },
    ],
  });
}

export default handler;
