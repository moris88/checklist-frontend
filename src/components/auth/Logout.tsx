import React from 'react'
import { Spinner } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { accessState, clearAccessState, defaultState } from '@/atoms'
import { useAtom } from 'jotai'
import { useFetch } from '@/hooks'

const Logout = () => {
  const navigate = useNavigate()
  const [access, setAccess] = useAtom(accessState)
  const { response, error, setRequest } = useFetch<{
    statusText: 'SUCCESS' | 'WARNING' | 'ERROR'
    status: number
  }>({
    skip: true,
  })

  React.useEffect(() => {
    if (access?.token) {
      setRequest({
        url: '/logout',
        method: 'POST',
        body: { username: access?.owner?.name },
      })
    }
  }, [access?.token, access?.owner?.name, setRequest])

  React.useEffect(() => {
    if (response) {
      clearAccessState()
      setAccess(defaultState())
      setTimeout(() => {
        navigate('/')
      }, 5000)
    }
  }, [navigate, response, setAccess])

  return (
    <div className="flex flex-col justify-center items-center h-screen font-bold">
      {'Logout in corso... Attendere...'}
      {error && (
        <p className="font-bold bg-red-400 text-red-800 text-center rounded-lg p-2">
          {error?.message ?? error?.error}
        </p>
      )}
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    </div>
  )
}

export default Logout
