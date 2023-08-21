import HomeIcon from '~/components/HomeButton';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '~/store/appStore';
import { usePlayersAliens } from '~/hooks/usePlayersAliens';
import { usePlayersEquipment } from '~/hooks/usePlayersEquipment';
import Loading from '~/components/Loading';
import { formatWalletAddress } from '~/utils';
import { useTransactions } from '~/hooks/useTransactions';
import { useEffect, useState } from 'react';
import {
  PurchaseAlienDialog,
  PurchaseFuelDialog,
} from '~/components/PurchaseDialog';
import { MessageDialog } from '~/components/MessageDialog';
import { StoreAliens } from './StoreAliens';
import { StoreFuel } from './StoreFuel';
import { StoreRewards } from './StoreRewards';

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

        <div className="p-4 pt-16 text-lg text-white">
          <div className="flex flex-col items-center justify-center p-4">
            <a href={`${blockExplorerUrl}/${address}`} className="underline">
              Your address: {formatWalletAddress(address!)}
            </a>
          </div>

          <div className="m-auto w-96">
            {isAliensLoading ? (
              <Loading />
            ) : (
              <StoreAliens
                aliens={aliens}
                openAlienPurchase={() => setIsPurchaseAlienOpen(true)}
                alienPriceInUSD={alienPriceInUSD}
              />
            )}

            {isEquipmentLoading ? (
              <>
                <Loading />
                <Loading />
              </>
            ) : (
              <>
                <StoreFuel
                  fuelBalance={fuelBalance}
                  fuelPriceInUSD={fuelPriceInUSD}
                  fuelToBuy={fuelToBuy}
                  setFuelToBuy={setFuelToBuy}
                  openFuelPurchase={() => setIsPurchaseFuelOpen(true)}
                />
                <StoreRewards
                  rewardBalance={rewardBalance}
                  sellHumans={sellHumans}
                />
              </>
            )}
          </div>
        </div>
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
