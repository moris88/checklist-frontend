import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Wrapper from './components/Wrapper'
import { Project, Task, User } from './types/global'
import List from './components/List'
import New from './components/New'
import Edit from './components/Edit'

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
        <New module="project" />
      </Wrapper>
    ),
  },
  {
    path: '/project/edit/:id',
    Component: () => (
      <Wrapper title="Project Edit">
        <Edit<Project> module="project" />
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
        <New module="task" />
      </Wrapper>
    ),
  },
  {
    path: '/task/edit/:id',
    Component: () => (
      <Wrapper title="Task Edit">
        <Edit<Task> module="task" />
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
        <New module="user" />
      </Wrapper>
    ),
  },
  {
    path: '/user/edit/:id',
    Component: () => (
      <Wrapper title="User Edit">
        <Edit<User> module="user" />
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
