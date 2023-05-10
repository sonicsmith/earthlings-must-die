import { Html } from '@react-three/drei';
import Button from '../Button';
import TopBar from './TopBar';

export default function GUI() {
  return (
    <Html fullscreen>
      <div className="flex h-full flex-col justify-between">
        <TopBar />
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
