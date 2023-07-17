import Button from '../Button';

import HomeIcon from '../HomeButton';
import { ProfileButton } from './ProfileButton';
import { Menu } from './Menu';
import { useAppStore } from '~/store/appStore';

export default function TopBar() {
  const { address, connect, showMenu } = useAppStore();

  return (
    <div>
      <div className="flex w-full flex-row justify-between bg-slate-700 p-2 text-white">
        {!!address ? (
          <>
            <HomeIcon />
            <ProfileButton />
          </>
        ) : (
          <>
            <HomeIcon />
            <Button
              onClick={() => {
                // TODO: Start spinner while logging in
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
            <Menu />
          </div>
        </div>
      )}
    </div>
  );
}
