/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Project } from '../types/global'
import { getProjectByID, getProjects } from '../utils/requester'

interface useProjectProps {
  id?: string | null
  skip?: boolean
}

const useProjects = ({ id, skip }: useProjectProps) => {
  const [recordId, setRecordId] = React.useState<string | null>(id ?? null)
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

  console.log('useProjects')
  console.log('useProjects.skip', skip)
  console.log('useProjects.users', projects)
  console.log('useProjects.loading', loading)

  React.useEffect(() => {
    const fetchProjects = async () => {
      console.log('useProjects.fetchProjects', recordId)
      if (recordId) {
        try {
          const response = await getProjectByID(token, recordId)
          setProjects(response as Project[])
        } catch (error) {
          setError(error)
        } finally {
          console.log('useProjects.fetchProjects.finally')
          setLoading(false)
        }
        return
      }
      try {
        const response = await getProjects(token)
        console.log('useProjects.fetchProjects.response', response)
        setProjects(response as Project[])
      } catch (error) {
        setError(error)
      } finally {
        console.log('useProjects.fetchProjects.finally')
        setLoading(false)
      }
    }
    if (!token) {
      setLoading(false)
      return
    }
    if (skip) {
      setLoading(false)
      return
    }
    console.log('useProjects.fetchProjects')
    fetchProjects()
  }, [recordId, skip, token])

  return {
    setId: (id: string) => {
      setRecordId(id)
    },
    projects,
    loading,
    error,
  }
}

export default useProjects
