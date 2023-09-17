import { EVMAddress, useAppStore } from '~/store/appStore';
import { formatWalletAddress } from '~/utils';

export const ProfileButton = () => {
  const { setIsAlienSelectionView, showMenu, setShowMenu, address } =
    useAppStore();

  const display = formatWalletAddress(address);

  return (
    <div
      onClick={() => {
        setIsAlienSelectionView(false);
        setShowMenu(!showMenu);
      }}
      className={
        'mx-2 rounded bg-teal-500 px-3 py-1 text-black hover:cursor-pointer'
      }
    >
      {display}
    </div>
  );
};
