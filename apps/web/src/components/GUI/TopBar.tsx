import Button from '../../ui/Button';

import HomeIcon from '../HomeButton';
import { ProfileButton } from './ProfileButton';
import { Menu } from './Menu';
import { useAppStore } from '~/store/appStore';
import { useState } from 'react';

const Beta = () => {
  return (
    <div className="my-auto rounded-lg bg-red-400 px-6 py-1 text-black">
      CLOSED BETA
    </div>
  );
};

export default function TopBar() {
  const { address, connect, showMenu } = useAppStore();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await connect();
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex w-full flex-row justify-between bg-slate-700 p-2 text-white">
        {!!address ? (
          <>
            <HomeIcon />
            <Beta />
            <ProfileButton />
          </>
        ) : (
          <>
            <HomeIcon />
            <Beta />
            <Button onClick={login}>
              {loading ? 'Connecting..' : 'Login'}
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
