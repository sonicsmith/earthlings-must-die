import { Html } from '@react-three/drei';
import TopBar from './TopBar';
import { useEffect, useState } from 'react';
import { useAppStore } from '~/store/appStore';

export default function GUI({
  showMenu,
  setShowMenu,
  setIsAlienSelectionView,
}: {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  setIsAlienSelectionView: (show: boolean) => void;
}) {
  const [user, setUser] = useState<any>(null);
  const { address, paperSdk } = useAppStore();

  return (
    <Html fullscreen>
      <div className="z-100 flex h-full flex-col justify-between">
        <TopBar
          isConnected={!!address}
          user={user}
          logout={() => {
            paperSdk?.auth.logout().then(console.log);
          }}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setIsAlienSelectionView={setIsAlienSelectionView}
        />
      </div>
    </Html>
  );
}
