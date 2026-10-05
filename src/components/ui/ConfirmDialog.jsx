import Button from './Button'
import Modal from './Modal'

/**
 * Confirmation dialog before destructive actions.
 * Props:
 *   isOpen      – boolean
 *   onClose     – fn
 *   onConfirm   – fn
 *   message     – string  (defaults to generic text)
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  message = 'This action cannot be undone.',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm deletion">
      <p className="text-sm mb-5" style={{ color: 'var(--c-muted)' }}>
        {message}
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  )
}
