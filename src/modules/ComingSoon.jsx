import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

export default function ComingSoon({ icon: Icon, name, description, category }) {
  return (
    <div className="flex items-center justify-center min-h-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-800 dark:bg-primary-900 border border-primary-700 mb-6">
          {Icon && <Icon size={28} className="text-accent" />}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium uppercase tracking-wide mb-4">
          {category}
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          {name}
        </h1>

        <p className="text-slate-500 dark:text-primary-300 text-sm leading-relaxed mb-8">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="mailto:hola@scrapbox.io"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <Mail size={15} />
            Contactar para activar
          </a>
          <a
            href="https://scrapbox.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-primary-700 text-slate-600 dark:text-primary-300 text-sm font-medium hover:border-slate-300 dark:hover:border-primary-600 transition-colors"
          >
            Ver planes
            <ArrowRight size={14} />
          </a>
        </div>

        <p className="mt-8 text-xs text-slate-400 dark:text-primary-400">
          Este módulo está disponible pero no está activado en tu plan actual.
        </p>
      </motion.div>
    </div>
  )
}
