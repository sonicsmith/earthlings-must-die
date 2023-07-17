export const ProfileButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className={'h-8 w-8 rounded-full bg-slate-500 hover:cursor-pointer'}
    >
      <div className={'p-1 text-white'}>?</div>
    </div>
  );
};
