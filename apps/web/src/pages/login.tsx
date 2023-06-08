import { Loader } from '@react-three/drei';
import { type NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { useConnect } from 'wagmi';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { Web3AuthContext } from '~/providers/Web3AuthContext';

const Login: NextPage = () => {
  const web3Auth = useContext(Web3AuthContext);
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (web3Auth?.status === 'connected') {
      Router.push('/');
    } else {
      connect({ connector: connectors[0] });
    }
  }, [web3Auth?.status]);

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
