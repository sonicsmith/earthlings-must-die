import Head from 'next/head';
import HomeIcon from '~/components/HomeButton';
import Button from '~/ui/Button';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '~/store/appStore';
import { usePlayersAliens } from '~/hooks/usePlayersAliens';
import { usePlayersEquipment } from '~/hooks/usePlayersEquipment';
import { AlienSelection } from '~/components/AlienSelection';
import Image from 'next/image';
import { useWindowSize } from '~/hooks/useWindowSize';
import Loading from '~/components/Loading';
import { formatWalletAddress } from '~/utils';
import { useTransactions } from '~/hooks/useTransactions';
import { useEffect, useState } from 'react';
import {
  PurchaseAlienDialog,
  PurchaseFuelDialog,
} from '~/components/PurchaseDialog';
import { MessageDialog } from '~/components/MessageDialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/ui/Select';

const FX_URL = 'https://api.coinbase.com/v2/exchange-rates?currency=MATIC';

const blockExplorerUrl = process.env.NEXT_PUBLIC_BLOCK_EXPLORER || '';

export const StorePage = () => {
  const { address, email, setAppView } = useAppStore();

  const {
    aliens,
    isLoading: isAliensLoading,
    refetch: refetchAliens,
  } = usePlayersAliens();

  const {
    fuelBalance,
    rewardBalance,
    isLoading: isEquipmentLoading,
    refetch: refetchEquipment,
  } = usePlayersEquipment();

  const { sellRewardTokens } = useTransactions();

  const [dialogMessage, setDialogMessage] = useState<string[]>([]);
  const [isPurchaseAlienOpen, setIsPurchaseAlienOpen] = useState(false);
  const [isPurchaseFuelOpen, setIsPurchaseFuelOpen] = useState(false);
  const [fuelToBuy, setFuelToBuy] = useState('1');
  const [conversionRate, setConversionRate] = useState(0);

  const sellHumans = async () => {
    if (rewardBalance > 0) {
      const transactionHash = await sellRewardTokens(rewardBalance);
      console.log('transactionHash', transactionHash);
      setDialogMessage([
        'Your rewards have been traded for crypto.',
        'They will be available in your account soon.',
      ]);
    }
  };

  const { width } = useWindowSize();
  const isMultiple = aliens.length > 1;
  const isMobile = Number(width) < 640;
  let offset = isMobile && !isMultiple ? 'ml-12' : '';

  useEffect(() => {
    fetch(FX_URL)
      .then((res) => res.json())
      .then(({ data }) => {
        setConversionRate(data.rates.USD);
      });
  }, []);

  // Prices in MATIC
  const alienPrice = 10;
  const fuelPrice = 6;

  const alienPriceInUSD = alienPrice * conversionRate;
  const fuelPriceInUSD = fuelPrice * Number(fuelToBuy) * conversionRate;

  return (
    <>
      <main className="h-screen bg-black">
        <nav className="fixed z-20 flex w-full flex-row justify-between bg-slate-700 p-2 text-white">
          <HomeIcon />
          <div className="p-1">
            <ArrowUturnLeftIcon
              className="m-auto h-6 w-6 text-teal-500 hover:cursor-pointer"
              onClick={() => {
                setAppView('home');
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
                <div className={`flex flex-nowrap gap-3 ${offset}`}>
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
                <Button onClick={() => setIsPurchaseAlienOpen(true)}>
                  Buy Alien Egg (${alienPriceInUSD.toFixed(2)} USD)
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
              <div className="m-2 flex flex-col justify-center p-2">
                <div className="m-auto w-fit">
                  <Button onClick={() => setIsPurchaseFuelOpen(true)}>
                    Buy Fuel Cells (${fuelPriceInUSD.toFixed(2)} USD)
                  </Button>
                  <Select value={fuelToBuy} onValueChange={setFuelToBuy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Fuel amount" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white">
                      <SelectGroup>
                        {[1, 2, 3, 4, 5].map((item) => (
                          <SelectItem value={`${item}`}>
                            {item} fuel cell{item > 1 && 's'}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
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

      <MessageDialog
        setDialogMessage={setDialogMessage}
        message={dialogMessage}
      />

      <PurchaseAlienDialog
        isOpen={isPurchaseAlienOpen}
        setIsOpen={setIsPurchaseAlienOpen}
        walletAddress={address}
        email={email}
        onSuccess={() => {
          setDialogMessage([
            'Your alien egg is on its way. It will be available in your inventory soon.',
          ]);
          refetchAliens();
        }}
      />

      <PurchaseFuelDialog
        isOpen={isPurchaseFuelOpen}
        setIsOpen={setIsPurchaseFuelOpen}
        walletAddress={address}
        email={email}
        onSuccess={() => {
          setDialogMessage([
            'Your fuel is on its way. It will be available in your inventory soon.',
          ]);
          refetchEquipment();
        }}
      />
    </>
  );
};
