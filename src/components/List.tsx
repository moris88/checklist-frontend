import useStore from '../hooks/useStore'
import { users } from '../utils/users'
import { Store } from '../types/global'

interface ListProps {
  module: 'project' | 'task' | 'user'
}

const List = <T extends Store>({ module }: ListProps) => {
  const [records] = useStore<T>({
    key: module,
    defaultValues: module === 'user' ? (users as T[]) : [],
  })

  if (records.length === 0) {
    return (
      <div className="flex justify-center items-center h-5 mt-10">
        <p className="border bg-red-500 text-white italic font-bold rounded-lg p-4">
          {`No ${module}s`}
        </p>
      </div>
    )
  }

  return (
    <section className="mt-2">
      <pre>{JSON.stringify(records, null, 2)}</pre>
    </section>
  )
}

export default List
