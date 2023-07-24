import Image from 'next/image';
import { PlayersAlienDetails } from '~/hooks/usePlayersAliens';

export const AlienSelection = ({
  width,
  alienData,
  numberOfAliens,
  selectedAlien,
  setSelectedAlien,
}: {
  width: number | undefined;
  alienData: PlayersAlienDetails;
  numberOfAliens: number;
  selectedAlien?: number;
  setSelectedAlien?: (tokenId: number) => void;
}) => {
  const { name, image, strength, color, tokenId } = alienData;
  const selectedStyle =
    tokenId === selectedAlien ? 'border-teal-500' : 'border-black';

  const isSingle = numberOfAliens === 1;
  const isMobile = Number(width) < 640;
  const singleStyle = isSingle && !isMobile ? 'ml-24' : '';
  console.log('isSingle', isSingle);
  console.log('isMobile', isMobile);
  console.log('singleStyle', singleStyle);

  return (
    <div
      key={`alien${tokenId}`}
      onClick={() => {
        if (setSelectedAlien) {
          setSelectedAlien(tokenId);
        }
      }}
      className={`flex-none rounded-lg border-4 hover:cursor-pointer ${selectedStyle} ${singleStyle}`}
    >
      <div className="relative">
        <div
          className="absolute bottom-1 left-1 h-10 w-10 rounded-full pt-1.5 text-center"
          style={{ backgroundColor: color }}
        >
          {strength}
        </div>
        <Image src={image} width={240} height={240} alt={name} />
      </div>
    </div>
  );
};
