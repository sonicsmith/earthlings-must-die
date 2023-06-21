import { Html } from '@react-three/drei';
import { getThreeDigitNumber } from '~/utils';
import Image from 'next/image';
import { useWindowSize } from '~/hooks/useWindowSize';
import { Suspense, useState } from 'react';
import Button from '../Button';
import { usePlayersAliens } from '~/hooks/usePlayersAliens';
import Link from 'next/link';
import Loading from '../Loading';

export default function AlienSelectorDialog({
  isShowing,
  setIsAlienSelectionView,
  launchAlien,
}: {
  isShowing: boolean;
  setIsAlienSelectionView: (isShowing: boolean) => void;
  launchAlien: (tokenId: number) => void;
}) {
  const playersAliens = usePlayersAliens();

  const [selectedAlien, setSelectedAlien] = useState(-1);

  const { width } = useWindowSize();
  const dialogWidth = Number(width) < 640 ? 'w-72' : 'w-[500px]';
  return (
    <Html center>
      {isShowing && (
        <div
          className={`z-200 h-96 rounded-lg bg-slate-700 pt-3 text-center text-lg text-white ${dialogWidth} `}
        >
          <div className="">SELECT ALIEN TO SEND</div>
          <div className="m-4 overflow-scroll">
            <div className="flex flex-nowrap gap-3">
              {playersAliens.length === 0 && (
                <div className="m-auto h-[256px] w-[256px] bg-slate-600 p-8">
                  You have no aliens to send. Visit the{' '}
                  <Link href="/store" className="underline">
                    store
                  </Link>{' '}
                  to spawn a new species.
                </div>
              )}
              {playersAliens.map(({ name, image }, index) => {
                const selectedStyle =
                  index === selectedAlien ? 'border-teal-500' : 'border-black';

                const singleStyle = playersAliens.length === 1 ? 'ml-24' : '';

                return (
                  <div
                    key={`alien${index}`}
                    onClick={() => {
                      setSelectedAlien(index);
                    }}
                    className={`flex-none rounded-lg border-4 hover:cursor-pointer ${selectedStyle} ${singleStyle}`}
                  >
                    <Image src={image} width={256} height={256} alt={name} />
                  </div>
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
