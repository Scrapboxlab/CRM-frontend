import { clsx } from 'clsx'

const variants = {
  default: 'bg-slate-100 text-slate-600 dark:bg-primary-700 dark:text-primary-300',
  accent: 'bg-accent/10 text-accent-600 dark:text-accent',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const map = {
    'New': 'info',
    'Contacted': 'default',
    'Qualified': 'accent',
    'Proposal Sent': 'warning',
    'Negotiation': 'purple',
    'Won': 'success',
    'Lost': 'error',
    'Active': 'success',
    'At Risk': 'warning',
    'Inactive': 'default',
    'Pending': 'warning',
    'In Progress': 'info',
    'Completed': 'success',
    'Overdue': 'error',
    'Prospect': 'default',
    'Proposal': 'warning',
    'Closed Won': 'success',
    'Closed Lost': 'error',
  }
  return <Badge variant={map[status] || 'default'}>{status}</Badge>
}

export function PriorityBadge({ priority }) {
  const map = {
    High: 'error',
    Medium: 'warning',
    Low: 'success',
  }
  return <Badge variant={map[priority] || 'default'}>{priority}</Badge>
}
