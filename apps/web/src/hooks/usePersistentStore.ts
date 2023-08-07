import { useState, useEffect } from 'react';

export const usePersistentStore = <AppState, F>(
  store: (callback: (state: AppState) => unknown) => unknown,
  callback: (state: AppState) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return (
    data || {
      email: null,
      address: null,
      paperSdk: null,
      wallet: undefined,
      showMenu: false,
      isAlienSelectionView: false,
      initPaper: () => {},
      connect: async () => {},
      setShowMenu: () => {},
      setIsAlienSelectionView: () => {},
    }
  );
};
