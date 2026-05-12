import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllModules } from '../../../moduleRegistry'
import { saveEnabledModules, getEnabledModules, resetModules, PROTECTED_MODULES } from '../../../moduleState'
import { clsx } from 'clsx'
import { Info, RotateCcw, Check, Lock, AlertTriangle } from 'lucide-react'

const CATEGORY_META = {
  core:          { label: 'Core',          color: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-900/20',    border: 'border-blue-100 dark:border-blue-800' },
  communication: { label: 'Communication', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-100 dark:border-emerald-800' },
  intelligence:  { label: 'Intelligence',  color: 'text-violet-600 dark:text-violet-400',  bg: 'bg-violet-50 dark:bg-violet-900/20',   border: 'border-violet-100 dark:border-violet-800' },
  productivity:  { label: 'Productivity',  color: 'text-orange-600 dark:text-orange-400',  bg: 'bg-orange-50 dark:bg-orange-900/20',   border: 'border-orange-100 dark:border-orange-800' },
  payments:      { label: 'Payments',      color: 'text-teal-600 dark:text-teal-400',      bg: 'bg-teal-50 dark:bg-teal-900/20',       border: 'border-teal-100 dark:border-teal-800' },
  compliance:    { label: 'Compliance',    color: 'text-rose-600 dark:text-rose-400',      bg: 'bg-rose-50 dark:bg-rose-900/20',       border: 'border-rose-100 dark:border-rose-800' },
  acquisition:   { label: 'Acquisition',   color: 'text-amber-600 dark:text-amber-400',    bg: 'bg-amber-50 dark:bg-amber-900/20',     border: 'border-amber-100 dark:border-amber-800' },
}

const CATEGORY_ORDER = ['core', 'productivity', 'communication', 'intelligence', 'acquisition', 'payments', 'compliance']

function Toggle({ enabled, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={clsx(
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        disabled
          ? 'cursor-not-allowed opacity-40'
          : 'cursor-pointer',
        enabled ? 'bg-accent' : 'bg-slate-200 dark:bg-primary-700'
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={clsx(
          'inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm',
          enabled ? 'translate-x-[18px]' : 'translate-x-[3px]'
        )}
      />
    </button>
  )
}

function CategoryBadge({ category }) {
  const meta = CATEGORY_META[category] || CATEGORY_META.core
  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border', meta.color, meta.bg, meta.border)}>
      {meta.label}
    </span>
  )
}

function ModuleRow({ mod, enabled, onChange, isDirty }) {
  const Icon = mod.icon
  const meta = CATEGORY_META[mod.category] || CATEGORY_META.core
  const isProtected = PROTECTED_MODULES.has(mod.key)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'group flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200',
        enabled
          ? 'bg-white dark:bg-primary-800/60 border-slate-200 dark:border-primary-700 shadow-sm'
          : 'bg-slate-50/50 dark:bg-primary-900/30 border-slate-100 dark:border-primary-800/50',
        isDirty && 'ring-1 ring-accent/30'
      )}
    >
      {/* Icon */}
      <div className={clsx(
        'flex items-center justify-center w-9 h-9 rounded-xl border shrink-0 transition-all',
        enabled ? [meta.bg, meta.border] : 'bg-slate-100 dark:bg-primary-800 border-slate-200 dark:border-primary-700'
      )}>
        {Icon && <Icon size={16} className={enabled ? meta.color : 'text-slate-400 dark:text-primary-500'} />}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={clsx('font-semibold text-sm', enabled ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-primary-400')}>
            {mod.name}
          </span>
          <CategoryBadge category={mod.category} />
          {isProtected && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-primary-800 text-slate-400 dark:text-primary-500 text-[10px]">
              <Lock size={9} />
              protected
            </span>
          )}
        </div>
        <p className={clsx('text-xs leading-relaxed', enabled ? 'text-slate-500 dark:text-primary-400' : 'text-slate-400 dark:text-primary-600')}>
          {mod.description}
        </p>
      </div>

      {/* Toggle */}
      <div className="shrink-0 flex items-center gap-2">
        {isDirty && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-medium text-accent"
          >
            {enabled ? 'Will enable' : 'Will disable'}
          </motion.span>
        )}
        <Toggle
          enabled={enabled}
          onChange={onChange}
          disabled={isProtected}
        />
      </div>
    </motion.div>
  )
}

export default function ModulesManager() {
  const allModules = getAllModules()
  const currentSaved = getEnabledModules()

  const [pending, setPending] = useState(() =>
    Object.fromEntries(allModules.map(m => [m.key, m.enabled]))
  )
  const [applying, setApplying] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const dirtyKeys = allModules
    .filter(m => pending[m.key] !== currentSaved[m.key])
    .map(m => m.key)

  const hasDirty = dirtyKeys.length > 0

  const handleToggle = useCallback((key, val) => {
    setPending(prev => ({ ...prev, [key]: val }))
  }, [])

  const handleApply = () => {
    setApplying(true)
    saveEnabledModules(pending)
    setTimeout(() => window.location.reload(), 600)
  }

  const handleDiscard = () => {
    setPending(Object.fromEntries(allModules.map(m => [m.key, m.enabled])))
  }

  const handleReset = () => {
    resetModules()
    window.location.reload()
  }

  const byCategory = CATEGORY_ORDER.reduce((acc, cat) => {
    const mods = allModules.filter(m => m.category === cat)
    if (mods.length) acc[cat] = mods
    return acc
  }, {})

  const totalEnabled  = Object.values(pending).filter(Boolean).length
  const totalDisabled = allModules.length - totalEnabled

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-7 pb-32">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Modules</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-primary-400">
              Enable or disable features for this deployment. Changes apply after reload.
            </p>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 dark:text-primary-400 border border-slate-200 dark:border-primary-700 rounded-xl hover:border-slate-300 dark:hover:border-primary-600 transition-colors"
          >
            <RotateCcw size={13} />
            Reset to defaults
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{totalEnabled} enabled</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-primary-900/50 border border-slate-200 dark:border-primary-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span className="text-xs font-semibold text-slate-500 dark:text-primary-400">{totalDisabled} disabled</span>
          </div>
          {hasDirty && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold text-accent">{dirtyKeys.length} pending change{dirtyKeys.length > 1 ? 's' : ''}</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Info banner */}
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-2xl bg-primary-900/5 dark:bg-primary-800/40 border border-primary-800/10 dark:border-primary-700">
        <Info size={14} className="text-primary-600 dark:text-primary-400 mt-0.5 shrink-0" />
        <p className="text-xs text-primary-700 dark:text-primary-300 leading-relaxed">
          Changes are stored locally and applied on reload. To set defaults per client, edit{' '}
          <code className="px-1 py-0.5 rounded bg-primary-800/10 dark:bg-primary-900/50 font-mono text-[11px]">src/modules.config.js</code>{' '}
          before deploying.
        </p>
      </div>

      {/* Module groups */}
      {Object.entries(byCategory).map(([category, mods]) => {
        const meta = CATEGORY_META[category] || CATEGORY_META.core
        return (
          <section key={category} className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <span className={clsx('text-[11px] font-bold uppercase tracking-widest', meta.color)}>
                {meta.label}
              </span>
              <div className="flex-1 h-px bg-slate-100 dark:bg-primary-800" />
            </div>
            {mods.map(mod => (
              <ModuleRow
                key={mod.key}
                mod={mod}
                enabled={pending[mod.key] ?? false}
                onChange={(val) => handleToggle(mod.key, val)}
                isDirty={pending[mod.key] !== currentSaved[mod.key]}
              />
            ))}
          </section>
        )
      })}

      {/* Sticky apply bar */}
      <AnimatePresence>
        {hasDirty && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-primary-900 dark:bg-primary-800 border border-white/10 rounded-2xl shadow-2xl min-w-[360px]">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">
                  {dirtyKeys.length} unsaved change{dirtyKeys.length > 1 ? 's' : ''}
                </p>
                <p className="text-primary-400 text-xs">Reload required to apply</p>
              </div>
              <button
                onClick={handleDiscard}
                className="px-3 py-1.5 rounded-lg text-primary-400 hover:text-white text-sm font-medium transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleApply}
                disabled={applying}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-accent hover:bg-accent-600 disabled:opacity-70 text-white text-sm font-semibold transition-colors"
              >
                {applying ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Applying…
                  </>
                ) : (
                  <>
                    <Check size={14} />
                    Apply & reload
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset confirm overlay */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm bg-white dark:bg-primary-800 rounded-2xl border border-slate-200 dark:border-primary-700 shadow-2xl p-6"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 mb-4 mx-auto">
                <AlertTriangle size={20} className="text-amber-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white text-center mb-1">Reset to defaults?</h3>
              <p className="text-sm text-slate-500 dark:text-primary-400 text-center mb-5">
                This will revert all module settings to the values defined in <code className="font-mono text-xs">modules.config.js</code> and reload the app.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-primary-700 text-sm font-medium text-slate-600 dark:text-primary-300 hover:bg-slate-50 dark:hover:bg-primary-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors"
                >
                  Reset & reload
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
