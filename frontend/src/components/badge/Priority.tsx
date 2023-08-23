import React from 'react'
import { twMerge } from 'tailwind-merge'

interface PriorityProps {
  size?: 'small'
  children: React.ReactNode
}

const Priority = ({ size, children }: PriorityProps) => {
  if (!children) {
    return <span>{`--NONE--`}</span>
  }
  return (
    <span
      className={twMerge(
        `${size === 'small' ? 'px-2' : 'p-2'} border rounded-lg font-bold`,
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
