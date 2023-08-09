import React, { useEffect } from 'react'
import useAccess from '../hooks/useAccess'
import { AccessToken } from '../types/global'
import { Spinner } from 'flowbite-react'
import { logout } from '../utils/requester'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  const { element, setElement, loading } = useAccess<AccessToken>({
    key: 'access_token',
    defaultValues: { token: null, username: null },
  })

  console.log('logout', element)

  useEffect(() => {
    if (!element?.token && !loading) {
      setTimeout(() => {
        navigate('/')
      }, 5000)
    }
  }, [element?.token, loading, navigate])

  React.useEffect(() => {
    if (element?.username) {
      logout(element?.username).then((response) => {
        console.log(response)
        if (response.status === 201) {
          setElement({
            token: null,
            username: null,
          })
        }
      })
    }
  }, [element?.username, setElement])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen font-bold">
      {'Logout in corso... Attendere...'}
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    </div>
  )
}

export default Logout
