import '~/styles/globals.css';
import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import { polygonMumbai } from 'wagmi/chains';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { Web3Auth } from '@web3auth/modal';
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3AuthContext } from '~/providers/Web3AuthContext';

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);
// Instantiating Web3Auth
const web3AuthInstance = new Web3Auth({
  clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID || '',
  web3AuthNetwork: 'testnet',
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x13881',
    rpcTarget: 'https://rpc.ankr.com/polygon_mumbai',
  },
  uiConfig: {
    theme: 'light',
    loginMethodsOrder: ['google', 'facebook'],
    appLogo: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
    modalZIndex: '99998',
  },
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new Web3AuthConnector({
      chains,
      options: {
        web3AuthInstance,
      },
    }) as any,
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Web3AuthContext.Provider value={web3AuthInstance}>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>
    </Web3AuthContext.Provider>
  );
};

export default api.withTRPC(MyApp);
