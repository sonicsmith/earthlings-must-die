import { GlobeAltIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '~/store/appStore';

export default function HomeButton() {
  const { setAppView } = useAppStore();

  return (
    <div
      onClick={() => {
        setAppView('home');
      }}
      className="p-1 hover:cursor-pointer"
    >
      <GlobeAltIcon className="h-6 w-6 text-teal-500" />
    </div>
  );
}
