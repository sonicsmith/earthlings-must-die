import { Html } from '@react-three/drei';
import { useWindowSize } from '~/hooks/useWindowSize';
import { useMemo, useState } from 'react';
import Button from '../Button';
import { usePlayersAliens } from '~/hooks/usePlayersAliens';
import Link from 'next/link';
import Loading from '../Loading';
import { usePlayersEquipment } from '~/hooks/usePlayersEquipment';
import { AnimatePresence, motion } from 'framer-motion';
import { AlienSelection } from '../AlienSelection';

enum Display {
  Loading,
  NoAliens,
  NoFuel,
  Selector,
}

export default function AlienSelectorDialog({
  isShowing,
  setIsAlienSelectionView,
  beginLaunch,
}: {
  isShowing: boolean;
  setIsAlienSelectionView: (isShowing: boolean) => void;
  beginLaunch: (tokenId: number) => void;
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
  }, [isAliensLoading, isEquipmentLoading, aliens.length, fuelBalance]);

  return (
    <Html center>
      <AnimatePresence>
        {isShowing && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={`z-200 h-96 rounded-lg bg-slate-700 pt-3 text-center text-lg text-white ${dialogWidth}`}
            >
              <div className="">SELECT ALIEN TO SEND</div>

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
              <div className="m-4 overflow-scroll">
                <div className="flex flex-nowrap gap-3">
                  {display === Display.Selector &&
                    aliens.map((alienData, index) => {
                      return (
                        <AlienSelection
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
                    beginLaunch(selectedAlien);
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
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
}
