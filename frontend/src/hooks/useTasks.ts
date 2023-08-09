import React from 'react'
import { Task } from '../types/global'

const VITE_SERVER_URL = (import.meta.env.VITE_SERVER_URL as string) ?? ''

const useTasks = () => {
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
      try {
        const response = await fetch(`${VITE_SERVER_URL}/tasks`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }).then((d) => d.json())
        setTasks(response as Task[])
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [token])

  return {
    tasks,
    loading,
    error,
  }
}

export default useTasks
