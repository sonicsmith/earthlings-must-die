import { Html } from '@react-three/drei';
import { Web3AuthContext } from '~/providers/Web3AuthContext';
import TopBar from './TopBar';
import { useContext, useEffect, useState } from 'react';
import { UserInfo } from '@web3auth/base';

export default function GUI({
  showMenu,
  setShowMenu,
  setIsAlienSelectionView,
}: {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  setIsAlienSelectionView: (show: boolean) => void;
}) {
  const [user, setUser] = useState<Partial<UserInfo> | null>(null);
  const web3Auth = useContext(Web3AuthContext);

  const isConnected = web3Auth?.status === 'connected';
  console.log('isConnected', isConnected);
  useEffect(() => {
    const setUserDetails = async () => {
      const user = (await web3Auth?.getUserInfo()) as any;
      console.log('user', user);
      setUser(user);
    };
    if (web3Auth?.status === 'connected') {
      setUserDetails();
    }
    console.log(web3Auth?.status);
  }, [web3Auth?.status]);

  return (
    <Html fullscreen>
      <div className="z-100 flex h-full flex-col justify-between">
        <TopBar
          isConnected={isConnected}
          user={user}
          logout={() => {
            console.log('logout');
            web3Auth?.logout();
          }}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setIsAlienSelectionView={setIsAlienSelectionView}
        />
      </div>
    </Html>
  );
}
