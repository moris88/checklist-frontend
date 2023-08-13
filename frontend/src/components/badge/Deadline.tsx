import moment from 'moment'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface DeadlineProps {
  children: React.ReactNode
}

const Deadline = ({ children }: DeadlineProps) => {
  const isDateBeforeToday = React.useMemo(() => {
    const today = moment().startOf('day')
    const dateToCheckMoment = moment(children as string).startOf('day')
    return dateToCheckMoment.isBefore(today)
  }, [children])

  if (!children) {
    return <span>{`--NONE--`}</span>
  }

  return (
    <span
      className={twMerge(
        'p-2 border rounded-lg font-bold',
        isDateBeforeToday ? 'bg-red-500 text-black' : 'bg-green-500 text-black'
      )}
    >
      {children}
    </span>
  )
}

export default Deadline
