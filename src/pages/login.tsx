import { type NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useContext, useEffect } from 'react';
import Button from '~/components/Button';
import { Web3AuthContext } from '~/providers/Web3AuthContext';

const Login: NextPage = () => {
  const { web3Auth, connect, provider } = useContext(Web3AuthContext);

  useEffect(() => {
    if (web3Auth?.status === 'connected') {
      Router.push('/');
    } else {
      connect();
    }
  }, [web3Auth?.status, connect, provider]);

  return (
    <>
      <Head>
        <title>Earthlings Must Die</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-black">
        <Button>Back</Button>
      </main>
    </>
  );
};

export default Login;
