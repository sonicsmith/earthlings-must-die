import { GlobeAltIcon } from '@heroicons/react/24/solid';
import Router from 'next/router';

export default function HomeButton() {
  return (
    <div
      onClick={() => {
        Router.push('/');
      }}
      className="p-1 hover:cursor-pointer"
    >
      <GlobeAltIcon className="h-6 w-6 text-white" />
    </div>
  );
}
