import React from 'react'
import { Project } from '../types/global'
import { getProjectByID, getProjects } from '../utils/requester'

interface useProjectProps {
  id?: string
}

const useProject = ({ id }: useProjectProps) => {
  const [projects, setProjects] = React.useState<Project[]>([])
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
      if (id) {
        try {
          const response = await getProjectByID(token, id)
          setProjects(response as Project[])
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
        return
      }
      try {
        const response = await getProjects(token)
        setProjects(response as Project[])
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [id, token])

  return {
    projects,
    loading,
    error,
  }
}

export default useProject
