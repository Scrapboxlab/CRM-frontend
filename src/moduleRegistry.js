import { getEnabledModules } from './moduleState'

const enabledModules = getEnabledModules()

import authModule          from './modules/auth'
import adminPanelModule    from './modules/admin-panel'
import analyticsModule     from './modules/analytics'
import calendarModule      from './modules/calendar'
import tasksModule         from './modules/tasks'
import communicationsModule from './modules/communications'
import documentsModule     from './modules/documents'
import notificationsModule from './modules/notifications'
import whatsappModule      from './modules/whatsapp'
import liveChatModule      from './modules/live-chat'
import automationsModule   from './modules/automations'
import mercadopagoModule   from './modules/mercadopago'
import afipModule          from './modules/afip'
import contactFormModule   from './modules/contact-form'

// Map config keys → module definitions
const ALL_MODULES = {
  auth:           authModule,
  adminPanel:     adminPanelModule,
  analytics:      analyticsModule,
  calendar:       calendarModule,
  tasks:          tasksModule,
  communications: communicationsModule,
  documents:      documentsModule,
  notifications:  notificationsModule,
  whatsapp:       whatsappModule,
  liveChat:       liveChatModule,
  automations:    automationsModule,
  mercadopago:    mercadopagoModule,
  afip:           afipModule,
  contactForm:    contactFormModule,
}

/** Active modules (enabled in modules.config.js) */
export function getActiveModules() {
  return Object.entries(enabledModules)
    .filter(([key, on]) => on && ALL_MODULES[key])
    .map(([key]) => ({ key, ...ALL_MODULES[key] }))
}

/** All modules with their enabled status — used by ModulesManager */
export function getAllModules() {
  return Object.entries(ALL_MODULES).map(([key, mod]) => ({
    key,
    ...mod,
    enabled: enabledModules[key] ?? false,
  }))
}

/** Flat list of private routes from all active modules */
export function getActiveRoutes() {
  return getActiveModules().flatMap(m => m.routes?.filter(r => !r.public) ?? [])
}

/** Public routes (login/register) from active modules */
export function getPublicRoutes() {
  return getActiveModules().flatMap(m => m.routes?.filter(r => r.public) ?? [])
}

/** Sorted nav items from active modules */
export function getActiveNavItems() {
  return getActiveModules()
    .flatMap(m => m.navItems ?? [])
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

/** Check if a specific module is enabled */
export function isModuleEnabled(key) {
  return !!enabledModules[key]
}
