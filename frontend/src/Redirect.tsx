import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Spinner } from 'flowbite-react'
import {
  Wrapper,
  Home,
  Login,
  Logout,
  Register,
  View,
  Record,
  List,
  Profile,
} from './components'
import NotFoundPage from './components/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/projects',
    Component: () => (
      <Wrapper title="List Projects">
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
      <Wrapper title="List Tasks">
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
      <Wrapper title="List Members">
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
  {
    path: '*',
    Component: () => (
      <Wrapper title="Not Found">
        <NotFoundPage />
      </Wrapper>
    ),
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
