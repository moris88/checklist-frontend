import { Navbar, Spinner } from 'flowbite-react'
import React, { useEffect } from 'react'
import useStore from '../hooks/useAccess'
import { AccessToken } from '../types/global'
import { useNavigate } from 'react-router-dom'

interface WrapperProps {
  title: string
  children: React.ReactNode
}

const Wrapper = ({ children, title }: WrapperProps) => {
  const navigate = useNavigate()
  const { element, loading } = useStore<AccessToken>({
    key: 'access_token',
    defaultValues: { token: null, username: null },
  })

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
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {title === 'Home' ? 'CheckList Work' : title}
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {title !== 'Home' && <Navbar.Link href="/">Home</Navbar.Link>}
          <Navbar.Link href="/projects">Projects</Navbar.Link>
          <Navbar.Link href="/tasks">Tasks</Navbar.Link>
          <Navbar.Link href="/users">Users</Navbar.Link>
          <Navbar.Link href="/logout">Logout</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </main>
  )
}

export default Wrapper
