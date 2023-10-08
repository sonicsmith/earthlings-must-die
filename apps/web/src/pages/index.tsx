import { type NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Inventory } from '~/components/Inventory';
import { useAppStore } from '~/store/appStore';

const Scene = dynamic(() => import('../components/Scene'), { ssr: false });

const Home: NextPage = () => {
  const { appView, address } = useAppStore();

  return (
    <>
      <Head>
        <title>Humans Must Die</title>
        <meta name="description" content="Play to Earn Invasion Game" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/images/aliens/001.jpg" />
      </Head>
      <main className="h-screen">
        {appView === 'inventory' && !!address ? <Inventory /> : <Scene />}
      </main>
    </>
  );
};

export default Home;
