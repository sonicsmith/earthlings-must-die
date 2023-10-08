import {
  RocketLaunchIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { useAppStore } from '~/store/appStore';

const MENU_ITEM_CLASS =
  'hover:bg-slate-500 p-2 hover:cursor-pointer px-6 rounded-lg';

export const Menu = () => {
  const { setIsAlienSelectionView, setAppView, logout } = useAppStore();

  return (
    <div className="w-fit rounded-xl bg-slate-700 py-2 text-white">
      <ul>
        <li
          className={MENU_ITEM_CLASS}
          onClick={() => {
            setAppView('inventory');
          }}
        >
          Inventory
        </li>
        <li
          className={MENU_ITEM_CLASS}
          onClick={() => {
            setIsAlienSelectionView(true);
          }}
        >
          <div className="flex">
            Invade <RocketLaunchIcon className="ml-2 h-5 w-5 text-white" />
          </div>
        </li>
        <li
          className={`${MENU_ITEM_CLASS} text-gray-300`}
          onClick={() => {
            //
          }}
        >
          <div className="flex">How to Play</div>
        </li>
        <li
          className={`${MENU_ITEM_CLASS} text-gray-300`}
          onClick={() => {
            //
          }}
        >
          <div className="flex">Lite paper</div>
        </li>
        <li
          className={MENU_ITEM_CLASS}
          onClick={() => {
            logout();
          }}
        >
          <div className="flex">
            Logout
            <ArrowRightOnRectangleIcon className="ml-2 h-5 w-5 text-white" />
          </div>
        </li>
      </ul>
    </div>
  );
};
