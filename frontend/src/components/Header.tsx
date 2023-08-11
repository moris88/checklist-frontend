import { Dropdown, Navbar } from 'flowbite-react'
import { useLocation, useNavigate } from 'react-router-dom'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const activeProjects = location.pathname === '/projects'
  const activeTasks = location.pathname === '/tasks'
  const activeMembers = location.pathname === '/members'

  const handleClick = (path: string) => {
    navigate(`/${path}`)
  }

  return (
    <header>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {title}
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown inline label={<p>Profilo</p>}>
            <Dropdown.Item onClick={() => handleClick('profile')}>
              Account
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick('logout')}>
              Logout
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {title !== 'Home' && <Navbar.Link href="/">Home</Navbar.Link>}
          <Navbar.Link active={activeProjects} href="/projects">
            Projects
          </Navbar.Link>
          <Navbar.Link active={activeTasks} href="/tasks">
            Tasks
          </Navbar.Link>
          <Navbar.Link active={activeMembers} href="/members">
            Members
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
