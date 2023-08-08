import { type NextPage } from 'next';
import Head from 'next/head';
import HomeIcon from '~/components/HomeButton';
import Button from '~/components/Button';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import Router from 'next/router';
import { AppState, useAppStore } from '~/store/appStore';
import { renderPaperCheckoutLink } from '@paperxyz/js-client-sdk';
import { usePlayersAliens } from '~/hooks/usePlayersAliens';
import { usePlayersEquipment } from '~/hooks/usePlayersEquipment';
import { AlienSelection } from '~/components/AlienSelection';
import Image from 'next/image';
import { useWindowSize } from '~/hooks/useWindowSize';
import Loading from '~/components/Loading';
import { useEffect } from 'react';
import { usePersistentStore } from '~/hooks/usePersistentStore';
import { formatWalletAddress } from '~/utils';
import { useTransactions } from '~/hooks/useTransactions';
import { Dialog } from '~/components/Dialog';

const CHECKOUT_URL = `https://withpaper.com/checkout`;
const ALIENS_CHECKOUT_ID = `c262271d-2ecc-44dd-81fd-092c3107859b`;
const FUEL_CHECKOUT_ID = `9bd365d6-c8ae-4221-86cf-dea221aa4fef`;

const blockExplorerUrl = process.env.NEXT_PUBLIC_BLOCK_EXPLORER || '';

const Store: NextPage = () => {
  const { address } = usePersistentStore<AppState, any>(
    useAppStore,
    (state) => state.address
  );

  const { aliens, isLoading: isAliensLoading } = usePlayersAliens();

  const {
    fuelBalance,
    rewardBalance,
    isLoading: isEquipmentLoading,
  } = usePlayersEquipment();

  const { sellRewardTokens } = useTransactions();

  const sellHumans = async () => {
    if (rewardBalance > 0) {
      const transactionHash = await sellRewardTokens(rewardBalance);
    }
  };

  const { width } = useWindowSize();
  const isMultiple = aliens.length > 1;
  const isMobile = Number(width) < 640;
  let offset = isMobile ? 'ml-12' : '-ml-12';
  if (isMultiple) {
    offset = '';
  }

  const openCheckout = (id: string) => {
    renderPaperCheckoutLink({
      checkoutLinkUrl: `${CHECKOUT_URL}/${id}`,
    });
  };

  return (
    <>
      <Head>
        <title>Earthlings Must Die</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-black">
        <nav className="fixed z-20 flex w-full flex-row justify-between bg-slate-700 p-2 text-white">
          <HomeIcon />
          <div className="p-1">
            <ArrowUturnLeftIcon
              className="m-auto h-6 w-6 text-teal-500 hover:cursor-pointer"
              onClick={() => {
                Router.push('/');
              }}
            />
          </div>
        </nav>
        {!!address ? (
          <div className="p-4 pt-16 text-lg text-white">
            <div className="flex flex-col items-center justify-center p-4">
              <a href={`${blockExplorerUrl}/${address}`} className="underline">
                Your address: {formatWalletAddress(address)}
              </a>
            </div>
            {/* ALIENS */}
            <div className="m-auto w-96">
              {isAliensLoading && <Loading />}
              {aliens.length === 0 && (
                <div className="m-auto w-32 bg-red-600 text-center">
                  You have no aliens in your inventory.
                </div>
              )}
              <div className="m-4 overflow-scroll">
                <div className={`flex flex-nowrap gap-3 ${offset} bg-blue-400`}>
                  {aliens.map((alienData, index) => {
                    return (
                      <AlienSelection
                        key={`alien${index}`}
                        width={width}
                        alienData={alienData}
                        numberOfAliens={aliens.length}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="m-2 flex justify-center p-2">
                <Button
                  onClick={() => openCheckout(ALIENS_CHECKOUT_ID)}
                  className={'m-auto'}
                >
                  Buy Aliens
                </Button>
              </div>

              {!isEquipmentLoading ? (
                <div className="relative">
                  <div className={'absolute left-[245px] m-auto text-red-500'}>
                    x{fuelBalance}
                  </div>
                  <Image
                    src={'/images/fuel-cell.jpeg'}
                    width={160}
                    height={160}
                    alt={'Fuel Cell'}
                    className={'m-auto'}
                  />
                </div>
              ) : (
                <Loading />
              )}
              <div className="m-2 flex justify-center p-2">
                <Button onClick={() => openCheckout(FUEL_CHECKOUT_ID)}>
                  Buy Fuel Cells
                </Button>
              </div>

              <div className="relative">
                <div className={'absolute left-[245px] m-auto text-red-500'}>
                  x{rewardBalance}
                </div>
                <Image
                  src={'/images/human-meat.jpg'}
                  width={160}
                  height={160}
                  alt={'Human Meat'}
                  className={'m-auto'}
                />
              </div>
              <div className="m-2 flex justify-center p-2">
                <Button disabled={rewardBalance === 0} onClick={sellHumans}>
                  Sell Humans
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="mt-32 text-lg text-white">
              Please login to continue
            </div>
          </div>
        )}
      </main>
      <Dialog isShowing={true} setIsShowing={() => {}}>
        <div className="text-white">test</div>
      </Dialog>
    </>
  );
};

export default Store;
