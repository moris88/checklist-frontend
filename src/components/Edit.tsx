import { useMemo } from 'react'
import useStore from '../hooks/useStore'
import { Module, Store } from '../types/global'
import { useParams } from 'react-router-dom'

interface EditProps {
  module: Module
}

const Edit = <T extends Store>({ module }: EditProps) => {
  const { id } = useParams()
  const { elements } = useStore<T>({
    key: module,
    defaultValues: [],
  })
  const myElement = useMemo(() => {
    if (id) return elements.filter((element) => element.id === +id)?.[0] ?? null
    else return null
  }, [elements, id])

  console.log('myElement', myElement, id, module)
  if (!myElement) return <>NULL ELEMENT</>

  return <pre>{JSON.stringify(myElement, null, 2)}</pre>
}

export default Edit
