import afipConfig from '../config'
import ComingSoon from '../../ComingSoon'

export default function AfipPage() {
  return (
    <ComingSoon
      icon={afipConfig.icon}
      name={afipConfig.name}
      description={afipConfig.description}
      category={afipConfig.category}
    />
  )
}
