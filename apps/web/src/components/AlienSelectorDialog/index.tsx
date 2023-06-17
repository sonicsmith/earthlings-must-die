import { Html } from '@react-three/drei';
import { getThreeDigitNumber } from '~/utils';
import Image from 'next/image';
import { useWindowSize } from '~/hooks/useWindowSize';
import { useState } from 'react';
import Button from '../Button';

export default function AlienSelectorDialog({
  isShowing,
  setIsAlienSelectionView,
  launchAlien,
}: {
  isShowing: boolean;
  setIsAlienSelectionView: (isShowing: boolean) => void;
  launchAlien: (tokenId: number) => void;
}) {
  const [selectedAlien, setSelectedAlien] = useState(-1);
  const tokenIds = [1, 2, 3];
  const { width } = useWindowSize();
  const dialogWidth = Number(width) < 640 ? 'w-72' : 'w-[500px]';
  return (
    <Html center>
      {isShowing && (
        <div
          className={`z-200 h-96 rounded-lg bg-slate-700 pt-3 ${dialogWidth}`}
        >
          <div className="text-center text-lg text-white">
            SELECT ALIEN TO SEND
          </div>
          <div className="m-4 overflow-scroll">
            <div className="flex flex-nowrap gap-3">
              {tokenIds.map((tokenId) => {
                const name = getThreeDigitNumber(tokenId);
                const url = `/images/aliens/${name}.jpg`;
                const selectedStyle =
                  tokenId === selectedAlien
                    ? 'border-teal-500'
                    : 'border-black';
                return (
                  <div
                    onClick={() => {
                      setSelectedAlien(tokenId);
                    }}
                    className={`flex-none rounded-lg border-4 hover:cursor-pointer ${selectedStyle}`}
                  >
                    <Image src={url} width={256} height={256} alt={name} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex w-1/3 justify-around">
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
        </div>
      )}
    </Html>
  );
}
