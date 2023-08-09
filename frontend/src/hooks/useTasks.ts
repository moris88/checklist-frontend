import React from 'react'
import { Task } from '../types/global'
import { getTaskByID, getTasks } from '../utils/requester'

interface useTaskProps {
  id?: string | null
  skip?: boolean
}

const useTasks = ({ id, skip }: useTaskProps) => {
  const [recordId, setRecordId] = React.useState<string | null>(id ?? null)
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<any>(null)

  const token = React.useMemo(() => {
    const data = localStorage.getItem('access_token')
    if (data) {
      const parsed = JSON.parse(data)
      return parsed.token
    }
    return null
  }, [])

  React.useEffect(() => {
    const fetchProjects = async () => {
      if (recordId) {
        try {
          const response = await getTaskByID(token, recordId)
          setTasks(response as Task[])
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
        return
      }
      try {
        const response = await getTasks(token)
        setTasks(response as Task[])
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    if (skip) return
    fetchProjects()
  }, [recordId, skip, token])

  return {
    setId: (id: string) => setRecordId(id),
    tasks,
    loading,
    error,
  }
}

export default useTasks
