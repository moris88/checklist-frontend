import { Spinner } from 'flowbite-react'
import { useFetch } from '../../hooks'
import React from 'react'
import { useAtomValue } from 'jotai'
import { accessState } from '../../atoms'
import FormProfile from '../forms/FormProfile'
import { User } from '../../types/global'
import moment from 'moment'

const Profile = () => {
  const access = useAtomValue(accessState)
  const idUser = React.useMemo(() => {
    return access?.owner?.id ?? null
  }, [access?.owner?.id])

  const { response, loading } = useFetch<{ profiles: User[] }>({
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
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <p className="font-bold">{`My Profile`.toUpperCase()}</p>
      <p>{`Username: ${profiles[0].username}`}</p>
      <p>{`Role: ${profiles[0].role}`}</p>
      <p>{`Created At: ${moment(profiles[0].createdAt).format(
        'DD-MM-YYYY HH:MM'
      )}`}</p>
      <p>{`Updated At: ${moment(profiles[0].updatedAt).format(
        'DD-MM-YYYY HH:MM'
      )}`}</p>
      <p>{`ID: ${profiles[0].id}`}</p>
      <p className="font-bold">{`Edit Profile`.toUpperCase()}</p>
      <FormProfile defaultValues={profiles[0]} />
    </div>
  )
}

export default Profile
