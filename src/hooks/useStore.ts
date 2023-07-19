import { useEffect, useState } from 'react'
import { Store } from '../types/global'

interface useStoreProps<T extends { [key: string]: any }> {
  defaultValues?: T[]
  key: string
}

const useStore = <T extends Store>({
  defaultValues,
  key,
}: useStoreProps<T>) => {
  const [store, setStore] = useState<T[]>([])

  useEffect(() => {
    console.log('useStore', key)
    const data = localStorage.getItem(key)
    if (data) {
      setStore(JSON.parse(data) as T[])
      localStorage.setItem(key, data)
    } else {
      setStore(defaultValues || [])
      localStorage.setItem(key, JSON.stringify(defaultValues || []))
    }
  }, [defaultValues, key])

  const saveStore = (newStore: T[]) => {
    localStorage.setItem(key, JSON.stringify(newStore))
    setStore(newStore)
  }

  const addElement = (element: T) => {
    const newStore = [...store, element]
    saveStore(newStore)
  }

  const removeElement = (element: T) => {
    const newStore = store.filter((e) => e.id !== element.id)
    saveStore(newStore)
  }

  return [store, saveStore, addElement, removeElement]
}

export default useStore
