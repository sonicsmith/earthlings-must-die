import Button from '../../ui/Button';
import { Html } from '@react-three/drei';
import HomeIcon from '../HomeButton';
import { ProfileButton } from './ProfileButton';
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
  const { address, connect } = useAppStore();
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
    <Html fullscreen>
      <div className="z-100 flex h-full flex-col justify-between">
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
      </div>
    </Html>
  );
}
