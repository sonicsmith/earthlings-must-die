import { type NextPage } from 'next';
import Head from 'next/head';
import HomeIcon from '~/components/HomeButton';
import NumberInput from '~/components/NumberInput';
import { useContext, useEffect, useState } from 'react';
import { Web3AuthContext } from '~/providers/Web3AuthContext';
import { ethers } from 'ethers';
import Button from '~/components/Button';
import { useAccount } from 'wagmi';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import Router from 'next/router';
import { renderPaperCheckoutLink } from '@paperxyz/js-client-sdk';

interface Wallet {
  chain: string;
  publicKey: string;
}

const Store: NextPage = () => {
  const [aliensCheckoutLink, setAliensCheckoutLink] = useState('');

  const [fuelAmount, setFuelAmount] = useState(1);

  const { address } = useAccount();
  console.log('address', address);
  const numberOfAliens = 0;
  const numberOfFuel = 0;
  const numberOfRewards = 0;

  useEffect(() => {
    if (address) {
      fetch(`/api/checkout?type=aliens&address=${address}`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then(({ checkoutUrl }: { checkoutUrl: string }) => checkoutUrl)
        .then(setAliensCheckoutLink);
    }
  }, [address]);

  console.log('acl', aliensCheckoutLink);

  const openAliensCheckout = () =>
    renderPaperCheckoutLink({
      checkoutLinkUrl: aliensCheckoutLink,
    });

  return (
    <>
      <Head>
        <title>Earthlings Must Die</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-black">
        <div className="flex w-full flex-row justify-between bg-slate-700 p-2 text-white">
          <HomeIcon />
          <div className="p-1">
            <ArrowUturnLeftIcon
              className="m-auto h-6 w-6 text-white hover:cursor-pointer"
              onClick={() => {
                Router.push('/');
              }}
            />
          </div>
        </div>

        <div className="p-4 text-lg text-white">
          <div className="flex flex-col items-center justify-center p-4">
            <div className={'text-2xl'}>TODO</div>
          </div>

          {/* Alien Species */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="p-2">
              <div className={'text-2xl'}>Alien Species</div>
            </div>
            <div>
              <Button onClick={openAliensCheckout}>Spawn New Race</Button>
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
              <div>
                <Button>Buy Fuel Cells</Button>
              </div>
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
              <Button disabled={numberOfRewards === 0}>Sell</Button>
            </div>
          </div>
        </div>

        {!!address && (
          <div className={'m-auto h-96 w-1/2'}>Todo, show all things</div>
        )}
      </main>
    </>
  );
};

export default Store;
