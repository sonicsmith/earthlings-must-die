import { type NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// const LaunchScene = dynamic(() => import('../components/LaunchScene'), {
//   ssr: false,
// });

const Launch: NextPage = () => {
  return (
    <>
      <Head>
        <title>Earthlings Must Die</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">{/* <LaunchScene /> */}</main>
    </>
  );
};

export default Launch;
