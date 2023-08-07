import { usePersistentStore } from '~/hooks/usePersistentStore';
import { AppState, useAppStore } from '~/store/appStore';

export const ProfileButton = () => {
  const { setIsAlienSelectionView, showMenu, setShowMenu, email } =
    usePersistentStore<AppState, any>(
      useAppStore,
      ({ setIsAlienSelectionView, showMenu, setShowMenu, email }) => ({
        setIsAlienSelectionView,
        showMenu,
        setShowMenu,
        email,
      })
    );

  const [display] = email?.split('@') || ['MENU'];

  return (
    <div
      onClick={() => {
        setIsAlienSelectionView(false);
        setShowMenu(!showMenu);
      }}
      className={'rounded bg-teal-500 hover:cursor-pointer'}
    >
      <div className={'mx-2 p-1 text-black'}>{display}</div>
    </div>
  );
};
