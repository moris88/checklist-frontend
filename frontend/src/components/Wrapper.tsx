import { Navbar } from 'flowbite-react'
import React from 'react'
import useStore from '../hooks/useAccess'
import { AccessToken } from '../types/global'
import { Spinner } from './Spinner'

interface WrapperProps {
  title: string
  children: React.ReactNode
}

const Wrapper = ({ children, title }: WrapperProps) => {
  const { element, loading } = useStore<AccessToken>({
    key: 'access_token',
    defaultValues: { token: null, username: null },
  })

  if (loading) {
    return <Spinner className="flex justify-center items-center h-screen" />
  }

  if (!element?.token) {
    window.location.href = '/login'
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
