import { Button } from 'flowbite-react'

const Home = () => {
  return (
    <div className="flex flex-col justify-center gap-3">
      <h1 className="text-center font-bold text-2xl pt-5 pb-5 bg-[#1f2937]">
        Home
      </h1>
      <div className="w-full flex justify-center items-center">
        <Button onClick={() => (window.location.href = `/projects`)}>
          Projects
        </Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button onClick={() => (window.location.href = `/tasks`)}>Tasks</Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button onClick={() => (window.location.href = `/users`)}>Users</Button>
      </div>
    </div>
  )
}

export default Home
