import { clsx } from 'clsx'

export default function Card({ children, className, hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl',
        hover && 'cursor-pointer hover:shadow-md hover:border-accent/30 transition-all duration-200',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

export function StatCard({ label, value, icon: Icon, change, color = 'accent' }) {
  const colors = {
    accent: 'bg-accent/10 text-accent',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  }

  const isPositive = change >= 0

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-primary-400 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{value}</p>
          {change !== undefined && (
            <p className={`text-xs mt-1 font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}% vs last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${colors[color]}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </Card>
  )
}
