import { Spinner } from 'flowbite-react'
import React, { useEffect } from 'react'
import useStore from '../hooks/useAccess'
import { AccessToken } from '../types/global'
import { useNavigate } from 'react-router-dom'
import { checkLogin } from '../utils/utils'
import Header from './Header'

interface WrapperProps {
  title: string
  children: React.ReactNode
}

const Wrapper = ({ children, title }: WrapperProps) => {
  const navigate = useNavigate()
  const { element, setElement, loading } = useStore<AccessToken>({
    key: 'access_token',
    defaultValues: {
      token: null,
      owner: null,
      expiresAt: null,
      createdAt: null,
    },
  })

  useEffect(() => {
    if (!checkLogin()) {
      setElement({
        token: null,
        owner: null,
        expiresAt: null,
        createdAt: null,
      })
    }
  }, [setElement])

  useEffect(() => {
    if (!element?.token && !loading) {
      navigate('/login')
    }
  }, [element?.token, loading, navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (!element?.token) {
    return <></>
  }

  return (
    <main>
      <Header title={title} />
      {children}
    </main>
  )
}

export default Wrapper
