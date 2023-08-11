/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Member } from '../types/global'
import { getMemberByID, getMembers } from '../utils/requester'

interface useUserProps {
  id?: string | null
  skip?: boolean
}

const useMembers = ({ id, skip }: useUserProps) => {
  const [recordId, setRecordId] = React.useState<string | null>(id ?? null)
  const [members, setMembers] = React.useState<Member[]>([])
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

  console.log('useMembers.skip', skip)
  console.log('useMembers.members', members)
  console.log('useMembers.loading', loading)
  console.log('useMembers.error', error)

  React.useEffect(() => {
    const fetchProjects = async () => {
      if (recordId) {
        try {
          const response = await getMemberByID(token, recordId)
          setMembers(response as Member[])
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
        return
      }
      try {
        const response = await getMembers(token)
        setMembers(response as Member[])
      } catch (error) {
        setError(error)
      } finally {
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
    fetchProjects()
  }, [recordId, skip, token])

  return {
    setId: (id: string) => setRecordId(id),
    members,
    loading,
    error,
  }
}

export default useMembers
