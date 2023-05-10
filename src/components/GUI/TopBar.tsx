import { useState } from 'react';

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

const MENU_ITEM_CLASS = 'hover:bg-gray-100 p-2 hover:cursor-pointer';

const Menu = () => {
  return (
    <div className="w-fit bg-white p-2">
      <ul>
        <li className={MENU_ITEM_CLASS}>Inventory</li>
        <li className={MENU_ITEM_CLASS}>Disconnect</li>
      </ul>
    </div>
  );
};

export default function TopBar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <div className="w-full bg-white p-4 opacity-80 hover:cursor-pointer">
        <MenuIcon onClick={() => setShowMenu(!showMenu)} />
      </div>
      {showMenu && <Menu />}
    </div>
  );
}
