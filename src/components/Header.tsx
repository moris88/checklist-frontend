import { Button, Dropdown, Navbar } from 'flowbite-react'
import { useAtomValue } from 'jotai'
import { useLocation, useNavigate } from 'react-router-dom'
import { accessState } from '../atoms'
import { capitalizeFirstLetter } from '../utils'
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  Bars3Icon,
  PlusIcon,
} from '@heroicons/react/24/outline'

import React from 'react'
import { twMerge } from 'tailwind-merge'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const activeHome = location.pathname === '/'
  const activeProjects = location.pathname === '/projects'
  const activeTasks = location.pathname === '/tasks'
  const activeMembers = location.pathname === '/members'
  const activeNewProject = location.pathname === '/project/create'
  const activeNewTask = location.pathname === '/task/create'
  const activeNewMember = location.pathname === '/member/create'

  const access = useAtomValue(accessState)

  const accountName = React.useMemo(() => {
    return capitalizeFirstLetter(access?.owner?.name ?? '')
  }, [access?.owner?.name])

  const handleClick = (path: string) => {
    navigate(`/${path}`)
  }

  return (
    <header className="">
      <Navbar fluid rounded>
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap hidden md:inline text-xl font-semibold dark:text-white">
            {title}
          </span>
        </Navbar.Brand>
        <Navbar.Brand>
          <div className="flex justify-center items-center gap-3">
            <Button
              size="sm"
              color="gray"
              disabled={activeHome}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Dropdown
              arrowIcon={false}
              size="sm"
              color="gray"
              label={<Bars3Icon className="w-5 h-5" />}
            >
              <Dropdown.Item
                disabled={activeProjects}
                onClick={() => navigate(`/projects`)}
              >
                <span
                  className={twMerge(
                    'ml-1',
                    activeProjects ? 'font-bold text-[#0e7490]' : ''
                  )}
                >
                  Projects
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                disabled={activeTasks}
                onClick={() => navigate(`/tasks`)}
              >
                <span
                  className={twMerge(
                    'ml-1',
                    activeTasks ? 'font-bold text-[#0e7490]' : ''
                  )}
                >
                  Tasks
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                disabled={activeMembers}
                onClick={() => navigate(`/members`)}
              >
                <span
                  className={twMerge(
                    'ml-1',
                    activeMembers ? 'font-bold text-[#0e7490]' : ''
                  )}
                >
                  Members
                </span>
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              arrowIcon={false}
              size="sm"
              color="gray"
              label={<PlusIcon className="w-5 h-5" />}
            >
              <Dropdown.Item
                disabled={activeNewProject}
                onClick={() => navigate(`/project/create`)}
              >
                <span
                  className={twMerge(
                    'ml-1',
                    activeNewProject ? 'font-bold text-[#0e7490]' : ''
                  )}
                >
                  New Project
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                disabled={activeNewTask}
                onClick={() => navigate(`/task/create`)}
              >
                <span
                  className={twMerge(
                    'ml-1',
                    activeNewTask ? 'font-bold text-[#0e7490]' : ''
                  )}
                >
                  New Task
                </span>
              </Dropdown.Item>
              <Dropdown.Item
                disabled={activeNewMember}
                onClick={() => navigate(`/member/create`)}
              >
                <span
                  className={twMerge(
                    'ml-1',
                    activeNewMember ? 'font-bold text-[#0e7490]' : ''
                  )}
                >
                  New Member
                </span>
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              // placement="left-start"
              arrowIcon={false}
              size="sm"
              color="gray"
              label={<UserCircleIcon className="w-5 h-5" />}
            >
              <Dropdown.Header className="font-bold">
                {accountName}
              </Dropdown.Header>
              <Dropdown.Item onClick={() => handleClick('profile')}>
                <UserIcon className="w-4 h-4" />
                <span className="ml-1">Account</span>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleClick('logout')}>
                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                <span className="ml-1">Logout</span>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar.Brand>
      </Navbar>
    </header>
  )
}

export default Header
