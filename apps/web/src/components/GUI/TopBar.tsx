import Button from '../Button';

import HomeIcon from '../HomeButton';
import { ProfileButton } from './ProfileButton';
import { Menu } from './Menu';
import { AppState, useAppStore } from '~/store/appStore';
import { useState } from 'react';
import { usePersistentStore } from '~/hooks/usePersistentStore';

export default function TopBar() {
  const { address, connect, showMenu } = usePersistentStore<AppState, any>(
    useAppStore,
    ({ address, connect, showMenu }) => ({ address, connect, showMenu })
  );
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      await connect();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

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
            <Button onClick={login}>
              <div className="flex">{loading ? 'Connecting..' : 'Login'}</div>
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
