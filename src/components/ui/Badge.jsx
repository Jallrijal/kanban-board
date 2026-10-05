/**
 * Badge component for task priority labels.
 * variant: 'high' | 'medium' | 'low' | 'neutral'
 */
export default function Badge({ children, variant = 'neutral' }) {
  const variants = {
    high:    'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',
    medium:  'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
    low:     'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',
    neutral: 'bg-[var(--c-border)] text-[var(--c-muted)]',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide rounded ${variants[variant]}`}
      style={{ borderRadius: 'var(--r-sm)' }}
    >
      {children}
    </span>
  )
}
