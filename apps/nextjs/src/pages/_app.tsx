import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import '~/styles/globals.css';
import { Web3Auth } from '@web3auth/modal';
import { useCallback, useEffect, useState } from 'react';
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base';
import { Web3AuthContext } from '~/providers/Web3AuthContext';

const MyApp: AppType = ({ Component, pageProps }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  // const [showApp, setShowApp] = useState(true);

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
          appLogo: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
          modalZIndex: '99998',
        },
      });
      await auth.initModal();
      setWeb3Auth(auth);
    };
    init();
  }, []);

  const connect = useCallback(async () => {
    console.log('connecting..');
    const provider = await web3Auth?.connect();
    if (provider) {
      console.log('setting provider', provider);
      setProvider(provider);
    }
  }, [web3Auth]);

  return (
    <Web3AuthContext.Provider value={{ web3Auth, provider, connect }}>
      <Component {...pageProps} />
    </Web3AuthContext.Provider>
  );
};

export default api.withTRPC(MyApp);
