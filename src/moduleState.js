import { enabledModules as defaults } from './modules.config'

const STORAGE_KEY = 'scrapbox_crm_modules'

// Modules that cannot be disabled from the UI (would break the app)
export const PROTECTED_MODULES = new Set(['auth'])

export function getEnabledModules() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      // Merge stored state with defaults so newly added modules appear enabled by default
      return { ...defaults, ...JSON.parse(stored) }
    }
  } catch {}
  return { ...defaults }
}

export function saveEnabledModules(modules) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(modules))
}

export function resetModules() {
  localStorage.removeItem(STORAGE_KEY)
}
