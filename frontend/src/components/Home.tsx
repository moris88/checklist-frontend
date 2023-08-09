import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center gap-3 mt-5">
      <div className="w-full flex justify-center items-center">
        <Button onClick={() => navigate('/projects')}>Projects</Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button onClick={() => navigate(`/tasks`)}>Tasks</Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button onClick={() => navigate(`/users`)}>Users</Button>
      </div>
    </div>
  )
}

export default Home
