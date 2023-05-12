import { type NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { Web3AuthContext } from '~/providers/Web3AuthContext';

const Login: NextPage = () => {
  const web3Auth = useContext(Web3AuthContext);

  useEffect(() => {
    if (web3Auth?.status === 'connected') {
      Router.push('/');
    } else {
      web3Auth?.connect();
    }
  }, [web3Auth?.status]);

  return (
    <>
      <Head>
        <title>Earthlings Must Die</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-black"></main>
    </>
  );
};

export default Login;
