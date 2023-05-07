import Image from 'next/image';

export default function AlienCard({ image, power, description }: any) {
  return (
    <div className="relative h-60 w-40">
      <div className="absolute px-2 pt-4">
        <Image src={image} width={200} height={200} alt={'alien'} />
      </div>
      <div className="z-4 absolute">
        <Image src={'/images/card.png'} width={200} height={200} alt={'card'} />
      </div>
      {/* POWER */}
      <div className="absolute right-5 top-3 z-10 font-bold text-white opacity-80">
        {power}
      </div>
      {/* DESCRIPTION */}
      <div className="absolute left-1 top-28 z-10 p-5 text-xs text-white opacity-80">
        {description}
      </div>
    </div>
  );
}
