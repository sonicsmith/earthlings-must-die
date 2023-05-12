import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import '~/styles/globals.css';
import { Web3Auth } from '@web3auth/modal';
import { useCallback, useEffect, useState } from 'react';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3AuthContext } from '~/providers/Web3AuthContext';

const MyApp: AppType = ({ Component, pageProps }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [showApp, setShowApp] = useState(true);

  useEffect(() => {
    const init = async () => {
      const auth = new Web3Auth({
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
          appLogo: 'https://web3auth.io/images/w3a-L-Favicon-1.svg', // Your App Logo Here
          modalZIndex: '99998',
        },
      });
      await auth.initModal();
      setWeb3Auth(auth);
    };
    init();
  }, []);

  return (
    <Web3AuthContext.Provider value={web3Auth}>
      {showApp && <Component {...pageProps} />}
    </Web3AuthContext.Provider>
  );
};

export default api.withTRPC(MyApp);
