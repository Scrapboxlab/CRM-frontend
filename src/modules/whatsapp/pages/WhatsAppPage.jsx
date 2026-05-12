import whatsappConfig from '../config'
import ComingSoon from '../../ComingSoon'

export default function WhatsAppPage() {
  return (
    <ComingSoon
      icon={whatsappConfig.icon}
      name={whatsappConfig.name}
      description={whatsappConfig.description}
      category={whatsappConfig.category}
    />
  )
}
