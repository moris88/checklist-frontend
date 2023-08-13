import { useEffect, useRef, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'

export interface MultiselectProps {
  options?: { id: string; name: string }[]
  defaultValues?: { id: string; name: string }[]
  placeholder?: string
  className?: string
  disabled?: boolean
  mandatory?: boolean
  maxItems?: number
  messageMaxItems?: string
  onChange?: (e: { id: string; name: string }[]) => void
}

const Multiselect = ({
  options,
  defaultValues,
  placeholder = '',
  mandatory,
  disabled,
  className,
  maxItems = 5,
  messageMaxItems,
  onChange,
}: MultiselectProps): JSX.Element => {
  const [items, setItems] = useState<{ id: string; name: string }[]>(
    defaultValues ?? []
  )
  const [show, setShow] = useState<boolean>(false)
  const [showMaxItems, setShowMaxItems] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const [isClickedOutside, setIsClickedOutside] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOutsideClick = (event: any) => {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        setIsClickedOutside(true)
      } else {
        setIsClickedOutside(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (isClickedOutside) {
      setShow(false)
    }
  }, [isClickedOutside])

  useEffect(() => {
    if (showMaxItems) {
      setTimeout(() => {
        setShowMaxItems(false)
      }, 4000)
    }
  }, [showMaxItems])

  const handleRemoveElement = (e: { id: string; name: string }): void => {
    setItems((prev) => prev.filter((el) => el.id !== e.id))
    if (onChange) onChange(items)
  }

  const handleDeleteAll = (): void => {
    setItems([])
    if (onChange) onChange([])
  }

  const handleAddElement = (e: { id: string; name: string }): void => {
    const elementFind = items.find((el) => el.id === e.id)
    if (elementFind) return
    if (maxItems && items.length >= maxItems) {
      setShowMaxItems(true)
      return
    }
    setItems((prev) => [...prev, e])
    if (onChange) onChange(items)
  }

  return (
    <div className="flex justify-start items-center relative">
      {showMaxItems && messageMaxItems && (
        <p className="font-bold text-red-400 p-0">{messageMaxItems}</p>
      )}
      <div
        ref={ref}
        className={twMerge(
          twMerge(
            `rounded-md border-[#4b5563] bg-[#374151] shadow-sm sm:text-sm border focus:ring w-full ${
              mandatory ? 'border-l-4 border-l-red-500' : ''
            } ${
              options === null || disabled
                ? 'cursor-not-allowed text-gray-50'
                : ''
            }`,
            'focus:border-cyan-500 focus:ring-cyan-500 p-2'
          ),
          className
        )}
      >
        <div
          className="flex flex-1 flex-wrap gap-1 justify-start items-center font-bold"
          onClick={() => setShow(true)}
        >
          {items.length === 0 && (
            <span className="text-gray-400 font-normal ml-1">
              {placeholder}
            </span>
          )}
          {items.map((el) => {
            console.log(el)
            return (
              <div
                key={`option-multiselect-${el.name}`}
                className="inline hover:bg-cyan-500 hover:text-white rounded-lg px-2"
              >
                {el.name}
                <XMarkIcon
                  className="w-5 h-5 cursor-pointer inline"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('el', el)
                    handleRemoveElement(el)
                  }}
                />
              </div>
            )
          })}
        </div>
        {options && options.length > 0 && show && (
          <div className="w-full bg-[#374151] border border-[#4b5563] rounded-lg overflow-auto shadow-md max-h-32 absolute top-[100%] left-0 z-50">
            <ul className="w-full font-bold list-none p-0 m-0">
              {options.map((el) => {
                return (
                  <li
                    key={`option-${el.id}`}
                    className="w-full px-2 cursor-pointer hover:bg-gray-500 hover:text-white rounded"
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('el', el)
                      handleAddElement(el)
                    }}
                  >
                    {el.name}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      {items.length > 0 && (
        <span
          className="absolute right-0 cursor-pointer"
          onClick={handleDeleteAll}
        >
          <XMarkIcon className="w-5 h-5" />
        </span>
      )}
    </div>
  )
}

export default Multiselect
