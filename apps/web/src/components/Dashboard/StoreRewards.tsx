import Image from 'next/image';
import Button from '~/ui/Button';

type StoreRewardsProps = {
  rewardBalance: number;
  sellHumans: () => void;
};

export const StoreRewards = ({
  rewardBalance,
  sellHumans,
}: StoreRewardsProps) => {
  return (
    <>
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
    </>
  );
};
