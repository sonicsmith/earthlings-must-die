import Image from 'next/image';

export default function AlienCard({ image, power, name, description }: any) {
  return (
    <div
      className="relative h-60 w-40 transition ease-in-out hover:z-10 hover:scale-110 hover:cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        // setChecked(!checked);
      }}
    >
      <div className="absolute px-2 pt-4">
        <Image src={image} width={200} height={200} alt={'alien'} />
      </div>
      <div className="z-4 absolute">
        <Image src={'/images/card.png'} width={200} height={200} alt={'card'} />
      </div>
      {/* POWER */}
      <div className="absolute right-5 top-3.5 font-bold text-white">
        {power}
      </div>
      {/* DESCRIPTION */}
      <div className="absolute left-1 top-32 p-5 pt-2 text-xs text-white">
        <div>{name}</div>
        <div className="text-gray-300">{description}</div>
        <div className="text-gray-300">Strength: {power}</div>
      </div>
    </div>
  );
}
