import type { NextApiRequest, NextApiResponse } from 'next';

const alienContractId = process.env.ALIEN_CONTRACT_ID;
const equipmentContractId = process.env.NEXT_PUBLIC_EQUIPMENT_CONTRACT_ID || '';
const paperAuth = process.env.PAPER_API_SECRET || '';

/**
 *
 * @param req
 * @param res
 *
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, address } = req.query;
  // paperSdk.auth(`Bearer ${paperAuth}`);
  const data = await fetch(
    'https://withpaper.com/api/2022-08-12/shareable-checkout-link',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${paperAuth}`,
      },
      body: JSON.stringify({
        contractId: alienContractId,
        title: 'Alien Species',
        description:
          'Each alien is generated using AI and includes a randomized strength. These can be sold and traded outside of the game.',
        imageUrl:
          'https://earthlings-must-die.vercel.app/images/aliens/001.jpg',
        redirectAfterPayment: false,
        mintMethod: {
          name: 'mint',
          args: {
            recipient: '$WALLET',
          },
          payment: {
            currency: 'MATIC',
            value: '0.001 * $QUANTITY',
          },
        },
        hideNativeMint: false,
        hidePaperWallet: false,
        hideExternalWallet: false,
        hidePayWithCard: false,
        hidePayWithCrypto: false,
        hidePayWithIdeal: true,
        sendEmailOnTransferSucceeded: true,
        brandDarkMode: true,
        brandButtonShape: 'full',
        brandColorScheme: 'teal',
        walletAddress: address,
      }),
    }
  ).then((res) => res.json());
  console.log(data.contractArgs);
  res.status(200).json(data);
}

export default handler;
