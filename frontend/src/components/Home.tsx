import { Button } from 'flowbite-react'
import { redirect } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col justify-center gap-3 mt-5">
      <div className="w-full flex justify-center items-center">
        <Button onClick={() => redirect('/projects')}>Projects</Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button onClick={() => redirect(`/tasks`)}>Tasks</Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button onClick={() => redirect(`/users`)}>Users</Button>
      </div>
    </div>
  )
}

export default Home
