import Button from '../Button';
import { UserInfo } from '@web3auth/base';
import Router from 'next/router';
import HomeIcon from '../HomeIcon';

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
        <li
          className={MENU_ITEM_CLASS}
          onClick={() => {
            Router.push('/dashboard');
          }}
        >
          Dashboard
        </li>
        <li className={MENU_ITEM_CLASS}>Invade</li>
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
