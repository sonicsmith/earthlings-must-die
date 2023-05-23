import { Web3Auth } from '@web3auth/modal';
import { useContext, useState } from 'react';
import { Web3AuthContext } from '~/providers/Web3AuthContext';
import Button from '../Button';
import { SafeEventEmitterProvider, UserInfo } from '@web3auth/base';
import Image from 'next/image';
import Router from 'next/router';

const HomeIcon = ({ onClick }: any) => {
  return (
    <div onClick={onClick} className="p-1  hover:cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
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

const MENU_ITEM_CLASS =
  'hover:bg-slate-500 p-2 hover:cursor-pointer px-6 rounded-lg';

const Menu = ({ logout }: { logout: () => void }) => {
  return (
    <div className="w-fit rounded-xl bg-slate-700 py-2 text-white">
      <ul>
        <li className={MENU_ITEM_CLASS}>Spawn Alien Race</li>
        <li className={MENU_ITEM_CLASS}>Buy Fuel</li>
        <li className={MENU_ITEM_CLASS}>Invade</li>
        <li className={MENU_ITEM_CLASS}>Inventory</li>
        {/* <li className={MENU_ITEM_CLASS}>Sell Humans</li> */}
        <li className={MENU_ITEM_CLASS} onClick={logout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default function TopBar({
  isConnected,
  user,
  logout,
  showMenu,
  setShowMenu,
}: {
  isConnected: boolean;
  user: Partial<UserInfo> | null;
  logout: () => void;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
}) {
  return (
    <div>
      <div className="flex w-full flex-row justify-between bg-slate-700 p-2 text-white">
        {isConnected ? (
          <>
            <HomeIcon />
            <>
              {/* <div className="p-1">Humans gathered: {0}</div> */}
              <ProfileButton
                user={user}
                onClick={() => setShowMenu(!showMenu)}
              />
            </>
          </>
        ) : (
          <>
            <HomeIcon />
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
            <Menu logout={logout} />
          </div>
        </div>
      )}
    </div>
  );
}
