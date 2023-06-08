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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="h-screen">
        <Scene />
      </main>
    </>
  );
};

export default Home;
