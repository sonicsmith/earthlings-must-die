import { Html } from '@react-three/drei';
import { getThreeDigitNumber } from '~/utils';
import Image from 'next/image';
import { useWindowSize } from '~/hooks/useWindowSize';
import { Suspense, useMemo, useState } from 'react';
import Button from '../Button';
import {
  PlayersAlienDetails,
  usePlayersAliens,
} from '~/hooks/usePlayersAliens';
import Link from 'next/link';
import Loading from '../Loading';
import { usePlayersEquipment } from '~/hooks/usePlayersEquipment';

const Alien = ({
  width,
  alienData,
  numberOfAliens,
  selectedAlien,
  setSelectedAlien,
}: {
  width: number | undefined;
  alienData: PlayersAlienDetails;
  numberOfAliens: number;
  selectedAlien: number;
  setSelectedAlien: (tokenId: number) => void;
}) => {
  const { name, image, strength, color, tokenId } = alienData;
  const selectedStyle =
    tokenId === selectedAlien ? 'border-teal-500' : 'border-black';

  const isSingle = numberOfAliens === 1;
  const isMobile = Number(width) < 640;
  const singleStyle = isSingle && !isMobile ? 'ml-24' : '';

  return (
    <div
      key={`alien${tokenId}`}
      onClick={() => {
        setSelectedAlien(tokenId);
      }}
      className={`flex-none rounded-lg border-4 hover:cursor-pointer ${selectedStyle} ${singleStyle}`}
    >
      <div className="relative">
        <div
          className="absolute bottom-1 left-1 h-10 w-10 rounded-full pt-1.5 text-center"
          style={{ backgroundColor: color }}
        >
          {strength}
        </div>
        <Image src={image} width={240} height={240} alt={name} />
      </div>
    </div>
  );
};

enum Display {
  Loading,
  NoAliens,
  NoFuel,
  Selector,
}

export default function AlienSelectorDialog({
  isShowing,
  setIsAlienSelectionView,
  launchAlien,
}: {
  isShowing: boolean;
  setIsAlienSelectionView: (isShowing: boolean) => void;
  launchAlien: (tokenId: number) => void;
}) {
  const { aliens, isLoading: isAliensLoading } = usePlayersAliens();
  const { fuelBalance, isLoading: isEquipmentLoading } = usePlayersEquipment();
  const [selectedAlien, setSelectedAlien] = useState(-1);
  const { width } = useWindowSize();
  const dialogWidth = Number(width) < 640 ? 'w-72' : 'w-[500px]';

  const display = useMemo(() => {
    if (isAliensLoading || isEquipmentLoading) {
      return Display.Loading;
    }
    if (aliens.length === 0) {
      return Display.NoAliens;
    }
    if (fuelBalance === 0) {
      return Display.NoFuel;
    }
    return Display.Selector;
  }, []);

  return (
    <Html center>
      {isShowing && (
        <div
          className={`z-200 h-96 rounded-lg bg-slate-700 pt-3 text-center text-lg text-white ${dialogWidth}`}
        >
          <div className="">SELECT ALIEN TO SEND</div>
          <div className="m-4 overflow-scroll">
            <div className="flex flex-nowrap gap-3">
              {display === Display.Loading && (
                <div className="m-auto h-[240px] w-[240px] bg-slate-600 p-8">
                  <Loading />
                </div>
              )}

              {display === Display.NoAliens && (
                <div className="m-auto h-[240px] w-[240px] bg-slate-600 p-8">
                  You have no aliens to send. Visit the{' '}
                  <Link href="/store" className="underline">
                    store
                  </Link>{' '}
                  to spawn a new species.
                </div>
              )}

              {display === Display.NoFuel && (
                <div className="m-auto h-[240px] w-[240px] bg-slate-600 p-8">
                  You have no fuel. Visit the{' '}
                  <Link href="/store" className="underline">
                    store
                  </Link>{' '}
                  to buy a fuel cell.
                </div>
              )}

              {display === Display.Selector &&
                aliens.map((alienData, index) => {
                  return (
                    <Alien
                      key={`alien${index}`}
                      width={width}
                      alienData={alienData}
                      numberOfAliens={aliens.length}
                      setSelectedAlien={setSelectedAlien}
                      selectedAlien={selectedAlien}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                launchAlien(selectedAlien);
                setIsAlienSelectionView(false);
              }}
              disabled={selectedAlien === -1}
            >
              Launch
            </Button>
            <Button
              onClick={() => {
                setIsAlienSelectionView(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Html>
  );
}
