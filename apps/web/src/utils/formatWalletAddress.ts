import { EVMAddress } from '~/store/appStore';

/**
 * This formats a public key into the following example:
 *
 * `0x3c...a5Ed`
 *
 * @param walletAddress
 * @returns
 */
export const formatWalletAddress = (
  walletAddress: string | EVMAddress | null
) => {
  const address = walletAddress as string;
  return (
    address.substring(0, 4) +
    '...' +
    address.substring(address.length - 4, address.length)
  );
};
