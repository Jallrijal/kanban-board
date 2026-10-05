import Modal from '../ui/Modal'
import TaskForm from './TaskForm'

/**
 * TaskModal – wraps TaskForm inside a Modal for add and edit flows.
 *
 * Props:
 *   mode          – 'add' | 'edit'
 *   isOpen        – boolean
 *   onClose       – fn()
 *   initialValues – task object (for edit) or partial defaults (for add)
 *   onSubmit      – fn(formValues)
 */
export default function TaskModal({ mode = 'add', isOpen, onClose, initialValues, onSubmit }) {
  const isEdit = mode === 'edit'

  function handleSubmit(values) {
    onSubmit(values)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Task' : 'Tambah Task Baru'}
    >
      <TaskForm
        key={isOpen ? (initialValues?.id ?? 'new') : 'closed'} // reset form on open
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel={isEdit ? 'Simpan Perubahan' : 'Tambah Task'}
      />
    </Modal>
  )
}
