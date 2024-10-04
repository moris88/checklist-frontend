import moment from 'moment'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface DeadlineProps {
  size?: 'small'
  children: React.ReactNode
}

const Deadline = ({ size, children }: DeadlineProps) => {
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
        `${size === 'small' ? 'px-2' : 'p-2'} border rounded-lg font-bold`,
        isDateBeforeToday ? 'bg-red-500 text-black' : 'bg-green-500 text-black'
      )}
    >
      {children}
    </span>
  )
}

export default Deadline
