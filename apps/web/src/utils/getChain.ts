type Chain =
  | "Polygon"
  | "Mumbai"
  | "Goerli"
  | "Ethereum"
  | "Avalanche"
  | "Optimism"
  | "OptimismGoerli"
  | "BSC"
  | "BSCTestnet"
  | "ArbitrumOne"
  | "ArbitrumGoerli"
  | "Fantom"
  | "FantomTestnet";

export const getChain = (str: string | undefined): Chain => {
  if (!str) {
    return "Polygon";
  }
  const lowerCaseStr = str.toLowerCase();
  return (lowerCaseStr.charAt(0).toUpperCase() +
    lowerCaseStr.slice(1)) as Chain;
};
