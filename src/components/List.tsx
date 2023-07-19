import React from 'react'
import useStore from '../hooks/useStore'

interface ListProps {
    module: 'project' | 'task' | 'user'
}

const List = <T extends { [key: string]: any }>({ module }: ListProps) => {
    const [records, setRecords] = useStore<T[]>({
        key: module,
        defaultValues: [],
    })
    return <pre>{JSON.stringify(records, null, 2)}</pre>
}

export default List
