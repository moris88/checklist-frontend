import { Spinner } from 'flowbite-react'
import { useFetch } from '../hooks'
import React from 'react'

const Profile = () => {
  const idUser: unknown | null = React.useMemo(() => {
    const data = localStorage.getItem('access_token')
    if (data) {
      const parsed = JSON.parse(data)
      return parsed?.owner?.id ?? null
    }
    return null
  }, [])

  const { response, loading } = useFetch<{ profiles: unknown[] }>({
    endpoint: `/profiles/${idUser}`,
    skip: !idUser,
  })

  const profiles = response?.profiles ?? []

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <p>{`My Profile => `}</p>
      <pre>{JSON.stringify(profiles, null, 5)}</pre>
    </div>
  )
}

export default Profile
