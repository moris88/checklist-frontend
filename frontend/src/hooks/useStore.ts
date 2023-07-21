import { useEffect, useState } from 'react'
import { Module, Store } from '../types/global'

interface useStoreProps<T extends Store> {
  defaultValues?: T[]
  key: Module
}

const useStore = <T extends Store>({
  defaultValues,
  key,
}: useStoreProps<T>) => {
  const [elements, setElements] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = localStorage.getItem(key)
    if (data) {
      setElements(JSON.parse(data) as T[])
      localStorage.setItem(key, data)
    } else {
      setElements(
        defaultValues && defaultValues?.length > 0 ? defaultValues : []
      )
      localStorage.setItem(key, JSON.stringify(defaultValues || []))
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const saveElements = (newStore: T[]) => {
    localStorage.setItem(key, JSON.stringify(newStore))
    setElements(newStore)
  }

  const addElement = (element: T) => {
    if (key === 'system') {
      const newElement = [element]
      saveElements(newElement)
    } else {
      const searchElement = elements.find((e) => e.id === element.id)
      if (searchElement) return
      const newElement = [...elements, element]
      saveElements(newElement)
    }
  }

  const removeElement = (id: number) => {
    const searchElement = elements.find((e) => e.id === id)
    if (!searchElement) return
    const newElement = elements.filter((e) => e.id !== searchElement.id)
    saveElements(newElement)
  }

  return { elements, saveElements, addElement, removeElement, loading }
}

export default useStore
