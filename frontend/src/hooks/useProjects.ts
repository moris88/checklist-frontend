import React from 'react'
import { Project } from '../types/global'

const VITE_SERVER_URL = (import.meta.env.VITE_SERVER_URL as string) ?? ''

const useProject = () => {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<any>(null)

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${VITE_SERVER_URL}/projects`).then((d) =>
          d.json()
        )
        setProjects(response as Project[])
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return {
    projects,
    loading,
    error,
  }
}

export default useProject
