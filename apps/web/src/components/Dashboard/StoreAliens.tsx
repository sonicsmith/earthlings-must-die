import { PlayersAlienDetails } from '~/hooks/usePlayersAliens';
import { useWindowSize } from '~/hooks/useWindowSize';
import { AlienSelection } from '../AlienSelection';
import Button from '~/ui/Button';

type StoreAliensProps = {
  aliens: PlayersAlienDetails[];
  openAlienPurchase: () => void;
  alienPriceInUSD: number;
};

export const StoreAliens = ({
  aliens,
  openAlienPurchase,
  alienPriceInUSD,
}: StoreAliensProps) => {
  const { width } = useWindowSize();
  const isMultiple = aliens.length > 1;
  const isMobile = Number(width) < 640;
  let offset = isMobile && !isMultiple ? 'ml-12' : '';

  if (aliens.length === 0) {
    return (
      <div className="m-auto w-32 bg-red-600 text-center">
        You have no aliens in your inventory.
      </div>
    );
  }

  return (
    <>
      <div className="mx-4 overflow-scroll">
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
        <Button onClick={openAlienPurchase}>
          Buy Alien Egg (${alienPriceInUSD.toFixed(2)} USD)
        </Button>
      </div>
    </>
  );
};
