import React from 'react'
import { twMerge } from 'tailwind-merge'

interface PriorityProps {
  children: React.ReactNode
}

const Priority = ({ children }: PriorityProps) => {
  return (
    <span
      className={twMerge(
        'p-2 border rounded-lg font-bold',
        children === 'LOW'
          ? 'bg-green-500  text-black'
          : children === 'MEDIUM'
          ? 'bg-yellow-500 text-black'
          : children === 'HIGH'
          ? 'bg-orange-500 text-black'
          : 'bg-red-500 text-black'
      )}
    >
      {children}
    </span>
  )
}

export default Priority
