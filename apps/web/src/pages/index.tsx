import { type NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { StorePage } from '~/components/StorePage';
import { useAppStore } from '~/store/appStore';

const Scene = dynamic(() => import('../components/Scene'), { ssr: false });

const Home: NextPage = () => {
  const appView = useAppStore().appView;

  return (
    <>
      <Head>
        <title>Earthlings Must Die</title>
        <meta name="description" content="Play to Earn Invasion Game" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/images/aliens/001.jpg" />
      </Head>
      <main className="h-screen">
        {appView === 'home' ? <Scene /> : <StorePage />}
      </main>
    </>
  );
};

export default Home;
