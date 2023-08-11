import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import { useAtom } from 'jotai'
import { accessState } from '../atoms'

interface WrapperProps {
  title: string
  children: React.ReactNode
}

const Wrapper = ({ children, title }: WrapperProps) => {
  const navigate = useNavigate()
  const [access] = useAtom(accessState)

  useEffect(() => {
    if (!access?.token) {
      navigate('/login')
    }
  }, [access?.token, navigate])

  if (!access?.token) {
    return <></>
  }

  return (
    <main>
      <Header title={title} />
      {children}
    </main>
  )
}

export default Wrapper
