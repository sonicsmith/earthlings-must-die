import { Html } from '@react-three/drei';
import Button from '../Button';

const MenuIcon = () => {
  return (
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
  );
};

export default function GUI() {
  return (
    <Html fullscreen>
      <div className="flex h-full flex-col justify-between">
        <div className="w-full bg-white p-4  opacity-80">
          <MenuIcon />
        </div>
        <div className="w-full bg-white p-4 opacity-80">
          <div className="flex justify-around">
            <Button>Create</Button>
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </Html>
  );
}
