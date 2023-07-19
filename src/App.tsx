import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Wrapper from './components/Wrapper'
import { Project, Task, User } from './types/global'
import List from './components/List'
import New from './components/New'

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
    path: '/tasks',
    Component: () => (
      <Wrapper title="Tasks">
        <List<Task> module="task" />
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
    path: '/task/create',
    Component: () => (
      <Wrapper title="New Task">
        <New<Task> module="task" />
      </Wrapper>
    ),
  },
  {
    path: '/project/create',
    Component: () => (
      <Wrapper title="New Project">
        <New<Project> module="project" />
      </Wrapper>
    ),
  },
  {
    path: '/user/create',
    Component: () => (
      <Wrapper title="New User">
        <New<User> module="user" />
      </Wrapper>
    ),
  },
  {
    path: '*',
    Component: () => <Navigate to="/projects" replace />,
  },
])

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

export default App
