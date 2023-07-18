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
      className={'bg-slate-500 hover:cursor-pointer'}
    >
      <div className={'p-1 text-white'}>{display}</div>
    </div>
  );
};
