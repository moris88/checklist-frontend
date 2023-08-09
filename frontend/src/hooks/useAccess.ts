import { useEffect, useState } from 'react'

interface useAccessProps<T> {
  defaultValues: T
  key: string
}

const useAccess = <T>({ defaultValues, key }: useAccessProps<T>) => {
  const [element, setElement] = useState<T>(defaultValues)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = localStorage.getItem(key)
    if (data) {
      setElement(JSON.parse(data) as T)
      localStorage.setItem(key, data)
    } else {
      setElement(defaultValues)
      localStorage.setItem(key, JSON.stringify(defaultValues))
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const addElement = (e: T) => {
    setLoading(true)
    setElement(e)
    localStorage.setItem(key, JSON.stringify(e))
    setLoading(false)
  }

  return { element, setElement: addElement, loading }
}

export default useAccess
