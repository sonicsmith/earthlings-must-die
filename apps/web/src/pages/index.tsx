import { type NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Scene = dynamic(() => import('../components/Scene'), { ssr: false });

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Earthlings Must Die</title>
        <meta name="description" content="Play to Earn Invasion Game" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/images/aliens/001.jpg" />
      </Head>
      <main className="h-screen">
        <Scene />
      </main>
    </>
  );
};

export default Home;
