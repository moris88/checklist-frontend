import React from 'react'
import { User } from '../types/global'
import { getUserByID, getUsers } from '../utils/requester'

interface useUserProps {
  id?: string | null
  skip?: boolean
}

const useUsers = ({ id, skip }: useUserProps) => {
  const [recordId, setRecordId] = React.useState<string | null>(id ?? null)
  const [users, setUsers] = React.useState<User[]>([])
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
          const response = await getUserByID(token, recordId)
          setUsers(response as User[])
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
        return
      }
      try {
        const response = await getUsers(token)
        setUsers(response as User[])
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
    users,
    loading,
    error,
  }
}

export default useUsers
