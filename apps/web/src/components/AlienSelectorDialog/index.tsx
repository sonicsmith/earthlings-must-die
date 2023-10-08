import { Html } from '@react-three/drei';
import { useWindowSize } from '~/hooks/useWindowSize';
import { useMemo, useState } from 'react';
import Button from '../../ui/Button';
import { usePlayersAliens } from '~/hooks/usePlayersAliens';
import Link from 'next/link';
import Loading from '../Loading';
import { usePlayersEquipment } from '~/hooks/usePlayersEquipment';
import { AlienSelection } from '../AlienSelection';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/Dialog';
import { useAppStore } from '~/store/appStore';

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
  const [dialogContainer, setDialogContainer] = useState<HTMLDivElement | null>(
    null
  );
  const setAppView = useAppStore().setAppView;

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
      {isShowing && <div ref={setDialogContainer} className="h-96 w-96" />}
      <Dialog open={isShowing} onOpenChange={setIsAlienSelectionView}>
        <DialogContent className={dialogWidth} container={dialogContainer}>
          <DialogHeader>
            <DialogTitle className={'m-auto'}>SELECT ALIEN TO SEND</DialogTitle>
          </DialogHeader>

          {display === Display.Loading && (
            <div className="m-auto h-[240px] w-[240px] bg-slate-600 p-8">
              <Loading />
            </div>
          )}

          {display === Display.NoAliens && (
            <div className="m-auto h-[240px] w-[240px] bg-slate-600 p-8">
              You have no aliens to send. Visit the{' '}
              <div
                onClick={() => setAppView('inventory')}
                className="underline"
              >
                store
              </div>{' '}
              to spawn a new species.
            </div>
          )}

          {display === Display.NoFuel && (
            <div className="m-auto h-[240px] w-[240px] bg-slate-600 p-8">
              You have no fuel. Visit the{' '}
              <div
                onClick={() => setAppView('inventory')}
                className="underline"
              >
                store
              </div>{' '}
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
        </DialogContent>
      </Dialog>
    </Html>
  );
}
