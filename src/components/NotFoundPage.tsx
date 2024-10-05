import { useAtomValue } from 'jotai'
import React from 'react'
import { accessState } from '@/atoms'
import { useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react'

const NotFoundPage = () => {
  const navigate = useNavigate()
  const access = useAtomValue(accessState)

  const isLogin = React.useMemo(() => {
    return access?.token !== null
  }, [access?.token])

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-[90vh]">
      <p className="p-2 rounded-lg bg-yellow-200 text-black">
        {'Page not found!'}
      </p>
      {isLogin && <Button onClick={() => navigate(`/`)}>Home</Button>}
      {!isLogin && <Button onClick={() => navigate(`/login`)}>Login</Button>}
    </div>
  )
}

export default NotFoundPage
