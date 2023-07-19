import React from 'react'
import useStore from '../hooks/useStore'
import { Task } from '../types/global'

interface ListTasksProps { }

const ListTasks = (props: ListTasksProps) => {
    const [tasks, setTasks] = useStore<Task[]>({
        key: 'tasks',
        defaultValues: [],
    })
    return <pre>{JSON.stringify(tasks, null, 2)}</pre>
}

export default ListTasks
