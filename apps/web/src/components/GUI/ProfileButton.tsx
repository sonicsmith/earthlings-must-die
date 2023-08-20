import { useAppStore } from '~/store/appStore';

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
      className={
        'mx-2 rounded bg-teal-500 px-3 py-1 text-black hover:cursor-pointer'
      }
    >
      {display}
    </div>
  );
};
