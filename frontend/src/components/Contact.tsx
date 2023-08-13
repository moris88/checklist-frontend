import { Button } from 'flowbite-react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <p className="font-bold">{`Contact`.toUpperCase()}</p>
      <p>{`Sviluppatore: Maurizio Tolomeo`}</p>
      <p>{`Role: Web Developer`}</p>
      <a href="https://www.mauriziotolomeo.it">{`Site web: mauriziotolomeo.it`}</a>
      <a href="mailto:maurizio.tolomeo@outlook.it">{`Email: maurizio.tolome@outlook.it`}</a>
      <p>{`Created with React and Express`}</p>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Done
      </Button>
    </div>
  )
}

export default Profile
