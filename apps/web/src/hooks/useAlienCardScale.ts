import { useAppStore } from '~/store/appStore';
import { useWindowSize } from './useWindowSize';
import { useMemo } from 'react';

export const useAlienCardScale = () => {
  const { height } = useWindowSize();

  const { isAlienDetailView } = useAppStore();

  const scale = useMemo(() => {
    if (!isAlienDetailView) {
      return 'scale-0';
    }
    const percent = ((height || 0) * 100) / 750;
    if (percent <= 70) {
      return 'scale-50';
    }
    if (percent <= 80) {
      return 'scale-75';
    }
    if (percent <= 90) {
      return 'scale-90';
    }
    if (percent <= 95) {
      return 'scale-95';
    }
    return 'scale-100';
  }, [height, isAlienDetailView]);

  return scale;
};
