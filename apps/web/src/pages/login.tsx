import { type NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import Loading from '~/components/Loading';

const Login: NextPage = () => {
  useEffect(() => {
    // if (isConnected) {
    //   Router.push('/');
    // } else {
    // }
  }, []);

  return (
    <>
      <Head>
        <title>Earthlings Must Die</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-black pt-64 text-center">
        <Loading />
      </main>
    </>
  );
};

export default Login;
