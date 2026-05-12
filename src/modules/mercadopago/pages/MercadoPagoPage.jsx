import mercadopagoConfig from '../config'
import ComingSoon from '../../ComingSoon'

export default function MercadoPagoPage() {
  return (
    <ComingSoon
      icon={mercadopagoConfig.icon}
      name={mercadopagoConfig.name}
      description={mercadopagoConfig.description}
      category={mercadopagoConfig.category}
    />
  )
}
