import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Wrapper from './components/Wrapper'
import { Project, Task, User } from './types/global'
import List from './components/List'
import Record from './components/Record'
import Home from './components/Home'

const router = createBrowserRouter([
  {
    path: '/projects',
    Component: () => (
      <Wrapper title="Projects">
        <List<Project> module="project" />
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
        <List<Task> module="task" />
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
    path: '/users',
    Component: () => (
      <Wrapper title="Users">
        <List<User> module="user" />
      </Wrapper>
    ),
  },
  {
    path: '/user/create',
    Component: () => (
      <Wrapper title="New User">
        <Record module="user" />
      </Wrapper>
    ),
  },
  {
    path: '/user/edit/:id',
    Component: () => (
      <Wrapper title="User Edit">
        <Record module="user" edit />
      </Wrapper>
    ),
  },
  {
    path: '/',
    Component: () => <Home />,
  },
])

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

export default App
