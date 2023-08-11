import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import List from './components/List'
import Record from './components/Record'
import { Spinner } from 'flowbite-react'
import { Wrapper, Home, Login, Logout, Register } from './components'
import Profile from './components/Profile'
import View from './components/View'

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
    path: '/project/:id',
    Component: () => (
      <Wrapper title="Project View">
        <View module="project" />
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
        <Record module="project" />
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
    path: '/task/:id',
    Component: () => (
      <Wrapper title="Task View">
        <View module="task" />
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
        <Record module="task" />
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
    path: '/member/:id',
    Component: () => (
      <Wrapper title="Member View">
        <View module="member" />
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
        <Record module="member" />
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

function Redirect() {
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

export default Redirect
