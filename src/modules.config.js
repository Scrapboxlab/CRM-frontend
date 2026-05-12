/**
 * Scrapbox CRM — Module Configuration
 *
 * Toggle modules per client deployment.
 * true  = module is active (routes, nav, and features are loaded)
 * false = module is completely absent from the build output
 *
 * Example presets:
 *   Client A — crm + auth + analytics + whatsapp
 *   Client B — crm + mercadopago + afip + automations
 *   Client C — crm base only (set everything to false except auth)
 */

export const enabledModules = {
  auth:           true,
  adminPanel:     true,
  contactForm:    true,
  whatsapp:       false,
  liveChat:       false,
  analytics:      true,
  automations:    false,
  mercadopago:    false,
  afip:           false,
  calendar:       true,
  tasks:          true,
  notifications:  true,
  communications: true,
  documents:      true,
}
