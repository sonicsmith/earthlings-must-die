import { Html } from '@react-three/drei';
import { Web3AuthContext } from '~/providers/Web3AuthContext';

import Button from '../Button';
import TopBar from './TopBar';
import { useContext, useEffect, useState } from 'react';
import { UserInfo } from '@web3auth/base';

export default function GUI() {
  const [user, setUser] = useState<Promise<Partial<UserInfo>> | null>(null);
  const web3Auth = useContext(Web3AuthContext);

  const isConnected = web3Auth?.status === 'connected';

  useEffect(() => {
    const setUserDetails = async () => {
      const user = (await web3Auth?.getUserInfo()) as any;
      setUser(user);
    };
    if (isConnected) {
      setUserDetails();
    }
  }, [web3Auth?.status]);

  return (
    <Html fullscreen>
      <div className="z-100 flex h-full flex-col justify-between">
        <TopBar isConnected={isConnected} />
        {isConnected && (
          <div className="w-full bg-white p-4 opacity-80">
            <div className="flex justify-around">
              <Button>Create</Button>
              <Button>Send</Button>
            </div>
          </div>
        )}
      </div>
    </Html>
  );
}
