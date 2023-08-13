import { Button, Modal as ModalFlowbite } from 'flowbite-react'

interface MyModalProps {
  show: boolean
  colorAccept?: string
  colorDecline?: string
  onClose?: () => void
  onAccept?: () => void
  onDecline?: () => void
  message: string
  title: string
}

const Modal = ({
  show,
  title,
  message,
  onClose,
  onAccept,
  onDecline,
  colorAccept,
  colorDecline,
}: MyModalProps) => {
  console.log('Modal', colorAccept, colorDecline)
  return (
    <ModalFlowbite
      show={show}
      onClose={() => {
        if (onClose) onClose()
      }}
    >
      <ModalFlowbite.Header>{title}</ModalFlowbite.Header>
      <ModalFlowbite.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {message}
          </p>
        </div>
      </ModalFlowbite.Body>
      <ModalFlowbite.Footer>
        <Button
          color={colorAccept ?? 'success'}
          onClick={() => {
            if (onAccept) onAccept()
          }}
        >
          OK
        </Button>
        <Button
          color={colorDecline ?? 'gray'}
          onClick={() => {
            if (onDecline) onDecline()
          }}
        >
          Cancel
        </Button>
      </ModalFlowbite.Footer>
    </ModalFlowbite>
  )
}

export default Modal
