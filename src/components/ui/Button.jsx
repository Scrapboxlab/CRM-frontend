import { clsx } from 'clsx'

const variants = {
  primary: 'bg-accent hover:bg-accent-600 text-white shadow-sm',
  secondary: 'bg-slate-100 dark:bg-primary-700 hover:bg-slate-200 dark:hover:bg-primary-600 text-slate-700 dark:text-white',
  ghost: 'hover:bg-slate-100 dark:hover:bg-primary-700 text-slate-600 dark:text-primary-300',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  outline: 'border border-slate-200 dark:border-primary-600 hover:bg-slate-50 dark:hover:bg-primary-700 text-slate-600 dark:text-primary-300',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
}

export default function Button({ children, variant = 'primary', size = 'md', className, loading, icon: Icon, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : 16} />
      ) : null}
      {children}
    </button>
  )
}
