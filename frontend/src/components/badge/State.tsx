import React from 'react'
import { twMerge } from 'tailwind-merge'

interface StateProps {
  children: React.ReactNode | null
}

const State = ({ children }: StateProps) => {
  return (
    <span
      className={twMerge(
        'p-2 border rounded-lg font-bold',
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
