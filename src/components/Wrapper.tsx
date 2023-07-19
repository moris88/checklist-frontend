import { Navbar } from 'flowbite-react'
import React from 'react'

interface WrapperProps {
  title: string
  children: React.ReactNode
}

const Wrapper = ({ children, title }: WrapperProps) => {
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
          <Navbar.Link href="/project/create">New Project</Navbar.Link>
          <Navbar.Link href="/task/create">New Task</Navbar.Link>
          <Navbar.Link href="/user/create">New User</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </main>
  )
}

export default Wrapper
