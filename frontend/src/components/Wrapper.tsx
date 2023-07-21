import { Navbar } from 'flowbite-react'
import React from 'react'
import { systemDefault } from '../utils/system'
import { System } from '../types/global'
import useStore from '../hooks/useStore'

interface WrapperProps {
  title: string
  children: React.ReactNode
}

const Wrapper = ({ children, title }: WrapperProps) => {
  const { elements } = useStore<System>({
    key: 'system',
    defaultValues: systemDefault,
  })

  if (elements.length === 0) {
    return <>ERROR SYSTEM!</>
  }
  return (
    <main>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {title}
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/projects">Projects</Navbar.Link>
          <Navbar.Link href="/tasks">Tasks</Navbar.Link>
          <Navbar.Link href="/users">Users</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </main>
  )
}

export default Wrapper