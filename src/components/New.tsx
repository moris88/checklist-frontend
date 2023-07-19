import useStore from '../hooks/useStore'
import { Store } from '../types/global'

interface NewProps {
  module: 'project' | 'task' | 'user'
}

const New = <T extends Store>({ module }: NewProps) => {
  const [records] = useStore<T>({
    key: module,
    defaultValues: [],
  })

  return <pre>{JSON.stringify(records, null, 2)}</pre>
}

export default New
