import React from 'react'
import useAccess from '../hooks/useAccess'
import { AccessToken } from '../types/global'
import { Spinner } from 'flowbite-react'
import { logout } from '../utils/requester'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  const [loadingLogout, setLoadingLogout] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string | null>(null)
  const { element, setElement, loading } = useAccess<AccessToken>({
    key: 'access_token',
    defaultValues: {
      token: null,
      owner: null,
      expiresAt: null,
      createdAt: null,
    },
  })

  console.log('logout', element)

  React.useEffect(() => {
    if (!element?.token && !loading) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [element?.token, loading, navigate])

  React.useEffect(() => {
    if (element?.owner?.name) {
      setLoadingLogout(true)
      logout(element?.owner?.name)
        .then((response) => {
          console.log(response)
          if (response.status === 202) {
            setElement({
              token: null,
              owner: null,
              expiresAt: null,
              createdAt: null,
            })
          }
          if (response.status === 400) {
            setMessage('Impossibile fare il Logout!')
            setLoadingLogout(false)
          }
          if (response.status === 500) {
            setMessage('Errore Logout su Server!')
            setLoadingLogout(false)
          }
        })
        .catch((error) => {
          console.log(error)
          setMessage(error.message)
          setLoadingLogout(false)
        })
    }
  }, [element?.owner?.name, setElement])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (!loadingLogout) {
    return <></>
  }

  if (message) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="font-bold bg-red-400 text-red-800 text-center rounded-lg shadow-lg">
          {message}
        </p>
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
