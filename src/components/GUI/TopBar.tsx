import { Web3Auth } from '@web3auth/modal';
import { useContext, useState } from 'react';
import { Web3AuthContext } from '~/providers/Web3AuthContext';
import Button from '../Button';
import { SafeEventEmitterProvider, UserInfo } from '@web3auth/base';
import Image from 'next/image';
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

const ProfileButton = ({
  onClick,
  user,
}: {
  onClick: () => void;
  user: Partial<UserInfo> | null;
}) => {
  return (
    <div
      onClick={onClick}
      className={'h-8 w-8 rounded-full bg-slate-500 hover:cursor-pointer'}
    >
      {user?.profileImage && (
        <img
          className={'rounded-full'}
          src={user.profileImage}
          alt={'profile-pic'}
        />
      )}
    </div>
  );
};

const MENU_ITEM_CLASS = 'hover:bg-gray-100 p-2 hover:cursor-pointer';

const Menu = () => {
  return (
    <div className="w-fit rounded-xl bg-white p-4">
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

export default function TopBar({
  isConnected,
  user,
}: {
  isConnected: boolean;
  user: Partial<UserInfo> | null;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <div className="flex w-full flex-row justify-between bg-white p-3">
        {isConnected ? (
          <>
            <MenuIcon />
            <ProfileButton user={user} onClick={() => setShowMenu(!showMenu)} />
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
