import type { NextApiRequest, NextApiResponse } from 'next';

type BoostAttribute = {
  display_type: string;
  trait_type: string;
  value: number;
};

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

  let name = '';
  let imageName = '';
  let attributes: BoostAttribute[] = [];

  if (id === '1') {
    name = 'Fuel Cells';
    imageName = 'fuelCells';
    attributes = [
      {
        display_type: 'boost_number',
        trait_type: 'Launch Power',
        value: 1000,
      },
    ];
  }

  if (id === '100') {
    name = 'Human';
    imageName = 'humanYield';
    attributes = [
      {
        display_type: 'boost_number',
        trait_type: 'Weight (kg)',
        value: 1,
      },
    ];
  }

  res.status(200).json({
    name,
    external_url: 'https://humansmustdie.com',
    image: `https://humansmustdie.com/images/equipment/${imageName}.jpg`,
    attributes,
  });
}

export default handler;
