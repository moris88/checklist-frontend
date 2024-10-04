import React from 'react'
import { twMerge } from 'tailwind-merge'

interface StateProps {
  size?: 'small'
  children: React.ReactNode | null
}

const State = ({ size, children }: StateProps) => {
  if (!children) {
    return <span>{`--NONE--`}</span>
  }
  return (
    <span
      className={twMerge(
        `${size === 'small' ? 'px-2' : 'p-2'} border rounded-lg font-bold`,
        children === 'OPENED'
          ? 'bg-blue-500  text-black'
          : children === 'ACTIVE'
          ? 'bg-green-500 text-black'
          : 'bg-red-500 text-black'
      )}
    >
      {children}
    </span>
  )
}

export default State
