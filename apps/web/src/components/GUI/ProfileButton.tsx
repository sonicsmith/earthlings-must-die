import { useAppStore } from '~/store/appStore';
import { Bars3Icon } from '@heroicons/react/24/solid';

export const ProfileButton = () => {
  const { setIsAlienSelectionView, showMenu, setShowMenu, email } =
    useAppStore();

  const [display] = email?.split('@') || ['MENU'];

  return (
    <div
      onClick={() => {
        setIsAlienSelectionView(false);
        setShowMenu(!showMenu);
      }}
      className={'mx-2 my-1 flex text-brand hover:cursor-pointer'}
    >
      {display}
      <Bars3Icon className="my-auto ml-2 h-5 w-5" />
    </div>
  );
};
