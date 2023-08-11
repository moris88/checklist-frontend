/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Project } from '../types/global'
import { getProfiles, getProfileByID } from '../utils/requester'

interface useProfileProps {
  skip?: boolean
}

const useProfiles = ({ skip }: useProfileProps) => {
  const [profiles, setProfiles] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<any>(null)

  const { token, idUser } = React.useMemo(() => {
    const data = localStorage.getItem('access_token')
    if (data) {
      const parsed = JSON.parse(data)
      return { token: parsed.token, idUser: parsed.owner?.id ?? null }
    }
    return { token: null, idUser: null }
  }, [])

  React.useEffect(() => {
    const fetchProfiles = async () => {
      if (idUser) {
        try {
          const response = await getProfileByID(token, idUser)
          setProfiles(response as Project[])
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
        return
      }
      try {
        const response = await getProfiles(token)
        setProfiles(response as Project[])
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
    fetchProfiles()
  }, [idUser, skip, token])

  return {
    profiles,
    loading,
    error,
  }
}

export default useProfiles
