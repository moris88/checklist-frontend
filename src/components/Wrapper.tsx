import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import {
  accessState,
  clearAccessState,
  defaultState,
  setAccessState,
} from '@/atoms'
import moment from 'moment'
import { SERVER_URL } from '@/utils'
import { AccessToken } from '@/types'
import { Footer, Header } from '@/components'

interface WrapperProps {
  title: string
  children: React.ReactNode
}

const Wrapper = ({ children, title }: WrapperProps) => {
  const navigate = useNavigate()
  const [access, setAccess] = useAtom(accessState)

  const isDateBeforeToday = React.useMemo(() => {
    const today = moment(access.createdAt).startOf('day')
    const dateToCheckMoment = moment(access.expiresAt).startOf('day')
    return dateToCheckMoment.isBefore(today)
  }, [access.expiresAt, access.createdAt])

  const owner = React.useMemo(() => {
    return access?.owner ?? { id: null, name: null }
  }, [access?.owner])

  const token = React.useMemo(() => {
    return access?.token
  }, [access?.token])

  React.useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    if (isDateBeforeToday && token !== null) {
      fetch(`${SERVER_URL}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: owner.id,
        }),
      })
        .then((result) => result.json())
        .then((result) => {
          if (result?.statusText === 'SUCCESS') {
            const expiresAt = new Date()
            expiresAt.setHours(expiresAt.getHours() + 1)
            const newAccess: AccessToken = {
              token: result.token,
              owner: owner,
              expiresAt: expiresAt.getTime(),
              createdAt: new Date().getTime(),
            }
            setAccess(newAccess)
            setAccessState(newAccess)
          } else {
            navigate('/login')
          }
        })
        .catch((error) => {
          console.error(error)
          clearAccessState()
          setAccess(defaultState())
          navigate('/login')
        })
    }
  }, [owner, token, isDateBeforeToday, navigate, setAccess])

  if (!access?.token) {
    return <></>
  }

  return (
    <main className="relative">
      <Header title={title} />
      <div className="h-[90vh]">{children}</div>
      <Footer />
    </main>
  )
}

export default Wrapper
