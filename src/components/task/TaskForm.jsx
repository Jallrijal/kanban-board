import { useState } from 'react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { PRIORITY, PRIORITY_LABEL } from '../../utils/constants'
import { toInputDateValue } from '../../utils/dateHelpers'

/**
 * TaskForm – controlled form for adding or editing a task.
 *
 * Props:
 *   initialValues – { title, description, priority, dueDate, labels }
 *   onSubmit      – fn(formValues)
 *   onCancel      – fn()
 *   submitLabel   – string  (default: 'Simpan')
 */
export default function TaskForm({
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = 'Simpan',
}) {
  const [values, setValues] = useState({
    title:       initialValues.title       ?? '',
    description: initialValues.description ?? '',
    priority:    initialValues.priority    ?? PRIORITY.MEDIUM,
    dueDate:     initialValues.dueDate     ?? '',
    labels:      initialValues.labels      ?? [],
  })

  const [titleError, setTitleError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const trimmed = values.title.trim()
    if (!trimmed) {
      setTitleError('Judul tidak boleh kosong.')
      return
    }
    if (trimmed.length > 120) {
      setTitleError('Judul maksimal 120 karakter.')
      return
    }
    setTitleError('')

    onSubmit({
      ...values,
      title:       trimmed,
      description: values.description.trim() || null,
      dueDate:     values.dueDate || null,
    })
  }

  function set(field) {
    return (e) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }))
      if (field === 'title') setTitleError('')
    }
  }

  const inputClass =
    'w-full px-3 py-2 text-sm border outline-none transition-colors focus:border-[var(--c-accent)]'
  const inputStyle = {
    background:   'var(--c-bg)',
    borderColor:  'var(--c-border-md)',
    borderRadius: 'var(--r-sm)',
    color:        'var(--c-text)',
  }
  const labelClass = 'text-xs font-semibold'
  const labelStyle = { color: 'var(--c-text)' }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="task-title" className={labelClass} style={labelStyle}>
          Judul{' '}
          <span aria-hidden="true" style={{ color: 'var(--c-high)' }}>*</span>
        </label>
        <input
          id="task-title"
          type="text"
          required
          maxLength={120}
          value={values.title}
          onChange={set('title')}
          placeholder="Apa yang perlu dikerjakan?"
          className={inputClass}
          style={{
            ...inputStyle,
            ...(titleError ? { borderColor: 'var(--c-high)' } : {}),
          }}
          aria-describedby={titleError ? 'title-error' : undefined}
          aria-invalid={!!titleError}
          autoFocus
        />
        {titleError && (
          <p
            id="title-error"
            role="alert"
            className="text-xs"
            style={{ color: 'var(--c-high)' }}
          >
            {titleError}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="task-desc" className={labelClass} style={labelStyle}>
          Deskripsi
        </label>
        <textarea
          id="task-desc"
          rows={3}
          value={values.description}
          onChange={set('description')}
          placeholder="Opsional – detail tambahan tentang task ini"
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
      </div>

      {/* Priority */}
      <fieldset className="flex flex-col gap-1.5 border-none p-0 m-0">
        <legend className={`${labelClass} mb-0`} style={labelStyle}>
          Prioritas
        </legend>
        <div className="flex gap-2" role="radiogroup" aria-label="Pilih prioritas task">
          {Object.values(PRIORITY).map((p) => (
            <label
              key={p}
              className="flex items-center gap-1.5 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="task-priority"
                value={p}
                checked={values.priority === p}
                onChange={() => setValues((prev) => ({ ...prev, priority: p }))}
                className="sr-only"
              />
              <span
                className={`transition-opacity duration-150 ${
                  values.priority === p ? 'opacity-100' : 'opacity-35 hover:opacity-60'
                }`}
              >
                <Badge variant={p}>{PRIORITY_LABEL[p]}</Badge>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Due Date */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="task-due" className={labelClass} style={labelStyle}>
          Tenggat Waktu
        </label>
        <input
          id="task-due"
          type="date"
          value={toInputDateValue(values.dueDate)}
          onChange={set('dueDate')}
          min={new Date().toISOString().split('T')[0]}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-1 border-t" style={{ borderColor: 'var(--c-border)' }}>
        <Button variant="ghost" size="sm" type="button" onClick={onCancel}>
          Batal
        </Button>
        <Button variant="primary" size="sm" type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
