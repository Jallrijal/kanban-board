/**
 * Reusable Button component.
 * Variants: 'primary' | 'ghost' | 'danger'
 * Sizes: 'sm' | 'md'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ...rest
}) {
  const base =
    'inline-flex items-center gap-1.5 font-medium transition-colors duration-150 rounded focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed'

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-sm',
  }

  const variants = {
    primary:
      'bg-[var(--c-accent)] text-white hover:opacity-90 active:opacity-80',
    ghost:
      'bg-transparent text-[var(--c-muted)] border border-[var(--c-border)] hover:bg-[var(--c-border)] hover:text-[var(--c-text)] active:bg-[var(--c-border-md)]',
    danger:
      'bg-transparent text-[var(--c-high)] border border-[var(--c-high)] hover:bg-red-50 dark:hover:bg-red-950/30 active:opacity-80',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
