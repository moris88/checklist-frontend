import { twMerge } from 'tailwind-merge'

interface StatusProps {
  size?: 'small'
  children: React.ReactNode | null
}

const Status = ({ size, children }: StatusProps) => {
  if (!children) {
    return <span>{`--NONE--`}</span>
  }
  return (
    <span
      className={twMerge(
        `${size === 'small' ? 'px-2' : 'p-2'} border rounded-lg font-bold`,
        children === 'BACKLOG'
          ? 'bg-gray-500  text-black'
          : children === 'OPEN'
          ? 'bg-green-500 text-black'
          : children === 'IN PROGRESS'
          ? 'bg-yellow-500 text-black'
          : children === 'DONE'
          ? 'bg-blue-500 text-black'
          : children === 'DELETED'
          ? 'bg-red-500 text-black'
          : children === 'ARCHIVED'
          ? 'bg-indigo-500 text-black'
          : children === 'CLOSED'
          ? 'bg-stone-500 text-black'
          : children === 'REOPENED'
          ? 'bg-cyan-500 text-black'
          : 'bg-teal-500 text-black'
      )}
    >
      {children}
    </span>
  )
}

export default Status
