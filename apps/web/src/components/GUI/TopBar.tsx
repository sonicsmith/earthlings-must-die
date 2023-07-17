import Button from '../Button';

import HomeIcon from '../HomeButton';
import { ProfileButton } from './ProfileButton';
import { Menu } from './Menu';
import { AppState, useAppStore } from '~/store/appStore';

export default function TopBar({
  isConnected,
  user,
  logout,
  showMenu,
  setShowMenu,
  setIsAlienSelectionView,
}: {
  isConnected: boolean;
  user: any;
  logout: () => void;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  setIsAlienSelectionView: (show: boolean) => void;
}) {
  const connect = useAppStore().connect;

  return (
    <div>
      <div className="flex w-full flex-row justify-between bg-slate-700 p-2 text-white">
        {isConnected ? (
          <>
            <HomeIcon />
            <>
              <ProfileButton
                user={user}
                onClick={() => {
                  setIsAlienSelectionView(false);
                  setShowMenu(!showMenu);
                }}
              />
            </>
          </>
        ) : (
          <>
            <HomeIcon />
            <Button
              onClick={() => {
                connect();
              }}
            >
              Connect
            </Button>
          </>
        )}
      </div>

      {showMenu && (
        <div className="flex justify-end">
          <div className="m-2">
            <Menu
              logout={logout}
              setIsAlienSelectionView={setIsAlienSelectionView}
            />
          </div>
        </div>
      )}
    </div>
  );
}
