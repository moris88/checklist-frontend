import React from 'react'
import useStore from '../hooks/useStore'

interface NewProps {
    module: 'project' | 'task' | 'user'
}

const New = <T extends { [key: string]: any }>({ module }: NewProps) => {
    const [records, setRecords] = useStore<T[]>({
        key: module,
        defaultValues: [],
    })
    return <pre>{JSON.stringify(records, null, 2)}</pre>
}

export default New
