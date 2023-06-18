import { type NextPage } from 'next';
import Head from 'next/head';
import HomeIcon from '~/components/HomeButton';
import {
  CrossmintPayButton,
  CrossmintNFTCollectionView,
} from '@crossmint/client-sdk-react-ui';
import NumberInput from '~/components/NumberInput';
import { useContext, useEffect, useState } from 'react';
import { Web3AuthContext } from '~/providers/Web3AuthContext';
import { ethers } from 'ethers';
import Button from '~/components/Button';

interface Wallet {
  chain: string;
  publicKey: string;
}

const Store: NextPage = () => {
  const [fuelAmount, setFuelAmount] = useState(1);
  const [address, setAddress] = useState('');

  const web3Auth = useContext(Web3AuthContext);

  useEffect(() => {
    console.log(web3Auth?.status);
    const test2 = async () => {
      if (web3Auth?.status === 'connected') {
        const provider = new ethers.providers.Web3Provider(
          web3Auth.provider as any
        );
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);
      }
    };
    test2();
  }, [web3Auth?.status]);

  const numberOfAliens = 0;
  const numberOfFuel = 0;
  const numberOfRewards = 0;

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
      <main className="h-screen bg-black">
        <div className="flex w-full flex-row bg-slate-700 p-2 text-white">
          <HomeIcon />
        </div>

        <div className="p-4 text-lg text-white">
          {/* Alien Species */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="p-2">
              <div className={'text-2xl'}>Alien Species</div>
            </div>
            <div>
              <CrossmintPayButton
                clientId="0b05de58-033d-4e62-9368-11b74cb5d8e7"
                mintConfig={{
                  type: 'erc-721',
                  totalPrice: '0.005',
                  quantity: '1',
                }}
                environment="staging"
                className="buy-alien-btn"
              />
            </div>
          </div>

          {/* Fuel Tanks */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="p-1">
              <div className={'text-2xl'}>Fuel tanks</div>
            </div>
            <div className="flex p-1">
              <div className="mr-3">(Quantity:</div>
              <NumberInput amount={fuelAmount} setAmount={setFuelAmount} />)
            </div>
            <div className={'p-2'}>
              <CrossmintPayButton
                clientId="0b05de58-033d-4e62-9368-11b74cb5d8e7"
                mintConfig={{
                  type: 'erc-1155',
                  totalPrice: '0.005',
                  quantity: fuelAmount,
                }}
                environment="staging"
                className="buy-equipment-btn"
              />
            </div>
          </div>

          {/* Reward */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="p-2">
              <div className={'text-2xl'}>
                Soylent Green (Owned: {numberOfRewards})
              </div>
            </div>
            <div>
              <Button disabled={numberOfRewards === 0}>Sell for Crypto</Button>
            </div>
          </div>
        </div>

        <div className={'m-auto h-96 w-1/2'}>
          <CrossmintNFTCollectionView
            wallets={[
              {
                chain: 'polygon',
                publicKey: address,
              },
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default Store;
