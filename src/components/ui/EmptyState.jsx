export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-primary-700 flex items-center justify-center mb-4">
          <Icon size={24} className="text-slate-400 dark:text-primary-400" />
        </div>
      )}
      <h3 className="font-semibold text-slate-700 dark:text-white mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-400 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
