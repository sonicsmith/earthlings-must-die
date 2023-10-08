import Image from 'next/image';
import Button from '~/ui/Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/ui/Select';

type StoreFuelProps = {
  fuelBalance: number;
  fuelPriceInUSD: number;
  fuelToBuy: string;
  setFuelToBuy: (value: string) => void;
  openFuelPurchase: () => void;
};

export const StoreFuel = ({
  fuelBalance,
  fuelPriceInUSD,
  fuelToBuy,
  setFuelToBuy,
  openFuelPurchase,
}: StoreFuelProps) => {
  return (
    <>
      <div className="relative">
        <div className={'absolute left-[245px] m-auto text-xl text-red-500'}>
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

      <div className="m-2 flex flex-col justify-center p-2">
        <div className="m-auto w-fit">
          <Button onClick={openFuelPurchase}>
            Buy Fuel Cells (${fuelPriceInUSD.toFixed(2)} USD)
          </Button>
          <Select value={fuelToBuy} onValueChange={setFuelToBuy}>
            <SelectTrigger>
              <SelectValue placeholder="Fuel amount" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectGroup>
                {[1, 2, 3, 4, 5].map((item) => (
                  <SelectItem value={`${item}`} key={item}>
                    {item} fuel cell{item > 1 && 's'}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
