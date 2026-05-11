import { clsx } from 'clsx'

const colors = [
  'bg-accent text-white',
  'bg-blue-500 text-white',
  'bg-purple-500 text-white',
  'bg-green-500 text-white',
  'bg-orange-500 text-white',
  'bg-pink-500 text-white',
]

export default function Avatar({ name, initials, size = 'md', className }) {
  const colorIdx = name ? name.charCodeAt(0) % colors.length : 0
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-lg',
  }

  const label = initials || (name ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?')

  return (
    <div className={clsx(
      'rounded-full flex items-center justify-center font-semibold shrink-0',
      colors[colorIdx],
      sizes[size],
      className
    )}>
      {label}
    </div>
  )
}

export function AvatarGroup({ names = [], max = 3, size = 'sm' }) {
  const shown = names.slice(0, max)
  const extra = names.length - max

  return (
    <div className="flex -space-x-2">
      {shown.map((name, i) => (
        <Avatar key={i} name={name} size={size} className="border-2 border-white dark:border-primary-800" />
      ))}
      {extra > 0 && (
        <div className={`w-7 h-7 rounded-full bg-slate-200 dark:bg-primary-600 border-2 border-white dark:border-primary-800 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-primary-300`}>
          +{extra}
        </div>
      )}
    </div>
  )
}
