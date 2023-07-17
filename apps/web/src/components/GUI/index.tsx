import { Html } from '@react-three/drei';
import TopBar from './TopBar';

export default function GUI() {
  return (
    <Html fullscreen>
      <div className="z-100 flex h-full flex-col justify-between">
        <TopBar />
      </div>
    </Html>
  );
}
