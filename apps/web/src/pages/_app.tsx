import '~/styles/globals.css';
import { type AppType } from 'next/app';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { AppState, useAppStore } from '~/store/appStore';
import { useEffect } from 'react';
import { usePersistentStore } from '~/hooks/usePersistentStore';

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: alchemyApiKey })]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const { initPaper } = usePersistentStore<AppState, any>(
    useAppStore,
    (state) => state.initPaper
  );

  useEffect(() => {
    initPaper();
  }, []);

  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default MyApp;
