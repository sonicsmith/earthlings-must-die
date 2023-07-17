import { useAppStore } from '~/store/appStore';

export const ProfileButton = () => {
  const { setIsAlienSelectionView, showMenu, setShowMenu } = useAppStore();

  return (
    <div
      onClick={() => {
        setIsAlienSelectionView(false);
        setShowMenu(!showMenu);
      }}
      className={'h-8 w-8 rounded-full bg-slate-500 hover:cursor-pointer'}
    >
      <div className={'p-1 text-white'}>?</div>
    </div>
  );
};
