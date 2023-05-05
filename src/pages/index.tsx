import { type NextPage } from 'next';
import Head from 'next/head';
import Scene from '~/components/Scene';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Earthlings Must Die</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <Scene />
      </main>
    </>
  );
};

export default Home;
