import { Spinner } from 'flowbite-react'
import { useProfiles } from '../hooks'

const Profile = () => {
  const { profiles, loading } = useProfiles({})

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
