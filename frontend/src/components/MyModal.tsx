import { Button, Modal } from 'flowbite-react'

interface MyModalProps {
  show: boolean
  onClose?: () => void
  onAccept?: () => void
  onDecline?: () => void
  message: string
  title: string
}

const MyModal = ({
  show,
  title,
  message,
  onClose,
  onAccept,
  onDecline,
}: MyModalProps) => {
  return (
    <Modal
      show={show}
      onClose={() => {
        if (onClose) onClose()
      }}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {message}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            if (onAccept) onAccept()
          }}
        >
          OK
        </Button>
        <Button
          color="gray"
          onClick={() => {
            if (onDecline) onDecline()
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MyModal
