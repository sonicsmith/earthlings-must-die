import { Web3Auth } from '@web3auth/modal';
import { useContext, useState } from 'react';
import { Web3AuthContext } from '~/providers/Web3AuthContext';
import Button from '../Button';
import { SafeEventEmitterProvider } from '@web3auth/base';
import Router from 'next/router';

const MenuIcon = ({ onClick }: any) => {
  return (
    <div onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 hover:cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
};

const ProfileButton = ({ onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className={'h-8 w-8 rounded-full bg-slate-500 hover:cursor-pointer'}
    ></div>
  );
};

const MENU_ITEM_CLASS = 'hover:bg-gray-100 p-2 hover:cursor-pointer';

const Menu = () => {
  return (
    <div className="w-fit bg-white p-4">
      <ul>
        <li className={MENU_ITEM_CLASS}>Create Aliens</li>
        <li className={MENU_ITEM_CLASS}>Buy Fuel</li>
        <li className={MENU_ITEM_CLASS}>Send Aliens</li>
        <li className={MENU_ITEM_CLASS}>Inventory</li>
        <li className={MENU_ITEM_CLASS}>Logout</li>
      </ul>
    </div>
  );
};

export default function TopBar({ isConnected }: { isConnected: boolean }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <div className="flex w-full flex-row justify-between bg-white p-3 opacity-80 hover:cursor-pointer">
        {isConnected ? (
          <>
            <MenuIcon onClick={() => setShowMenu(!showMenu)} />
            <ProfileButton />
            {showMenu && (
              <div className="m-2">
                <Menu />
              </div>
            )}
          </>
        ) : (
          <>
            <MenuIcon />
            <Button
              onClick={() => {
                Router.push('/login');
              }}
            >
              Connect
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
