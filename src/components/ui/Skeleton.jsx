import { clsx } from 'clsx'

export default function Skeleton({ className }) {
  return (
    <div className={clsx('animate-pulse bg-slate-200 dark:bg-primary-700 rounded', className)} />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-9 h-9 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-2.5 w-20" />
        </div>
      </div>
      <Skeleton className="h-2.5 w-full" />
      <Skeleton className="h-2.5 w-4/5" />
    </div>
  )
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center py-3 px-4">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  )
}
