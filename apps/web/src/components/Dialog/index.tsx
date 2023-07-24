import { Html } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useWindowSize } from '~/hooks/useWindowSize';

type DialogProps = {
  children: React.ReactNode | React.ReactNode[];
  isShowing: boolean;
  setIsShowing: (isShowing: boolean) => void;
};

export const Dialog = ({ children, isShowing, setIsShowing }: DialogProps) => {
  const { width } = useWindowSize();
  const dialogWidth =
    Number(width) < 640 ? 'w-72 left-8' : 'w-[500px] left-[450px]';

  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className={`z-200 absolute -top-48 m-auto h-96 rounded-lg bg-slate-700 pt-3 text-center text-lg text-white ${dialogWidth}`}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
