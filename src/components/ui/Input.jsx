import { clsx } from 'clsx'

export default function Input({ label, error, icon: Icon, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-primary-200">{label}</label>}
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />}
        <input
          {...props}
          className={clsx(
            'w-full border rounded-lg text-sm transition-all',
            'bg-white dark:bg-primary-700 text-slate-800 dark:text-white',
            'placeholder-slate-400 dark:placeholder-primary-400',
            'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent',
            error
              ? 'border-red-400 focus:ring-red-200'
              : 'border-slate-200 dark:border-primary-600',
            Icon ? 'pl-9 pr-3 py-2' : 'px-3 py-2',
            className
          )}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Select({ label, error, className, children, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-primary-200">{label}</label>}
      <select
        {...props}
        className={clsx(
          'w-full border rounded-lg text-sm px-3 py-2 transition-all',
          'bg-white dark:bg-primary-700 text-slate-800 dark:text-white',
          'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent',
          error ? 'border-red-400' : 'border-slate-200 dark:border-primary-600',
          className
        )}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-primary-200">{label}</label>}
      <textarea
        {...props}
        className={clsx(
          'w-full border rounded-lg text-sm px-3 py-2 transition-all resize-none',
          'bg-white dark:bg-primary-700 text-slate-800 dark:text-white',
          'placeholder-slate-400 dark:placeholder-primary-400',
          'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent',
          error ? 'border-red-400' : 'border-slate-200 dark:border-primary-600',
          className
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
