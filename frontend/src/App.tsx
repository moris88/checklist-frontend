import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import List from './components/List'
import Record from './components/Record'
import { Spinner } from 'flowbite-react'
import { Wrapper, Home, Login, Logout, Register } from './components'
import Profile from './components/Profile'

const router = createBrowserRouter([
  {
    path: '/projects',
    Component: () => (
      <Wrapper title="Projects">
        <List module="project" />
      </Wrapper>
    ),
  },
  {
    path: '/project/create',
    Component: () => (
      <Wrapper title="New Project">
        <Record module="project" />
      </Wrapper>
    ),
  },
  {
    path: '/project/edit/:id',
    Component: () => (
      <Wrapper title="Project Edit">
        <Record module="project" edit />
      </Wrapper>
    ),
  },
  {
    path: '/tasks',
    Component: () => (
      <Wrapper title="Tasks">
        <List module="task" />
      </Wrapper>
    ),
  },
  {
    path: '/task/create',
    Component: () => (
      <Wrapper title="New Task">
        <Record module="task" />
      </Wrapper>
    ),
  },
  {
    path: '/task/edit/:id',
    Component: () => (
      <Wrapper title="Task Edit">
        <Record module="task" edit />
      </Wrapper>
    ),
  },
  {
    path: '/members',
    Component: () => (
      <Wrapper title="Members">
        <List module="member" />
      </Wrapper>
    ),
  },
  {
    path: '/member/create',
    Component: () => (
      <Wrapper title="New Member">
        <Record module="member" />
      </Wrapper>
    ),
  },
  {
    path: '/member/edit/:id',
    Component: () => (
      <Wrapper title="Member Edit">
        <Record module="member" edit />
      </Wrapper>
    ),
  },
  {
    path: '/',
    Component: () => (
      <Wrapper title="Home">
        <Home />
      </Wrapper>
    ),
  },
  {
    path: '/login',
    Component: () => <Login />,
  },
  {
    path: '/logout',
    Component: () => <Logout />,
  },
  {
    path: '/profile',
    Component: () => (
      <Wrapper title="Profile">
        <Profile />
      </Wrapper>
    ),
  },
  {
    path: '/register',
    Component: () => <Register />,
  },
])

function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      }
    />
  )
}

export default App
