import { useEffect, useState } from "react";

interface useStoreProps<T extends { [key: string]: any }> {
  defaultValues?: T[];
  key: string;
  
}

const useStore = <T extends { [key: string]: any }>({ defaultValues, key }: useStoreProps<T>) => {
  const [store, setStore] = useState<T[]>(defaultValues || []);

  useEffect(() => {
    const data = localStorage.getItem(key);
    if (data) {
      setStore(JSON.parse(data) as T[]);
    }
  }, [key]);

  const saveStore = (newStore: T[]) => {
    localStorage.setItem(key, JSON.stringify(newStore));
    setStore(newStore);
  };

  return [store, saveStore];
};

export default useStore;
