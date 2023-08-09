import React from 'react'
import useAccess from '../hooks/useAccess'
import { AccessToken } from '../types/global'
import { SERVER_URL, XAPIKEY } from '../utils/metadata'
import { Spinner } from './Spinner'

const Logout = () => {
  const { element, setElement, loading } = useAccess<AccessToken>({
    key: 'access_token',
    defaultValues: { token: null, username: null },
  })

  React.useEffect(() => {
    const fetchLogout = async () => {
      const response = await fetch(`${SERVER_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          xapikey: XAPIKEY,
        },
        body: JSON.stringify({ username: element?.username }),
      }).then((d) => d.json())
      console.log(response, response.status === 201)
      if (response.status === 201) {
        setElement({
          token: null,
          username: null,
        })
        window.location.href = '/login'
      }
    }
    if (element?.username) {
      fetchLogout()
    }
  }, [element?.username, setElement])

  if (loading) {
    return <Spinner className="flex justify-center items-center h-screen" />
  }

  console.log(element)

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {'Logout in corso... Attendere...'}
    </div>
  )
}

export default Logout
