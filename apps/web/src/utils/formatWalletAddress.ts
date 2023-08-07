/**
 * This formats a public key into the following example:
 *
 * `0x3c...a5Ed`
 *
 * @param walletAddress
 * @returns
 */
export const formatWalletAddress = (walletAddress: string) => {
  return (
    walletAddress.substring(0, 4) +
    "..." +
    walletAddress.substring(walletAddress.length - 4, walletAddress.length)
  );
};
