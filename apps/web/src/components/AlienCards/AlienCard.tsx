import Image from 'next/image';
import type { AlienOnPlanet } from '~/hooks/useAliensOnPlanet';
import { useAppStore } from '~/store/appStore';

export default function AlienCard({
  alienDetails,
}: {
  alienDetails: AlienOnPlanet;
}) {
  const address = useAppStore().address;
  const { name, strength, image, rewardsGiven, color, owner } = alienDetails;
  const ownedByPlayer = owner === address;
  return (
    <div className="relative h-60 w-40 transition ease-in-out hover:z-10 hover:scale-110 hover:cursor-pointer">
      <div className="absolute px-2 pt-4">
        <Image src={image} width={200} height={200} alt={'alien'} />
      </div>
      <div className={'z-4 absolute'}>
        <Image src={'/images/card.png'} width={200} height={200} alt={'card'} />
      </div>
      {ownedByPlayer && (
        <div
          className={
            'z-4 absolute left-1.5 top-1.5 h-4 w-4 animate-ping rounded-full bg-green-500'
          }
        />
      )}
      {/* POWER */}
      <div className="absolute right-5 top-3.5 font-bold text-white">
        {strength}
      </div>
      {/* COLOR */}
      <div
        className={`absolute bottom-6 right-1.5 h-4 w-4 rounded-full border border-teal-700`}
        style={{ backgroundColor: color }}
      />
      {/* DESCRIPTION */}
      <div className="absolute left-1 top-32 p-5 pt-2 text-xs text-white">
        <div>{name}</div>
        <div className="text-gray-300">Strength: {strength}</div>
        <div className="text-gray-300">Harvested: {rewardsGiven}kg</div>
      </div>
    </div>
  );
}
