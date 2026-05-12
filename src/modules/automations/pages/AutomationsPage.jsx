import automationsConfig from '../config'
import ComingSoon from '../../ComingSoon'

export default function AutomationsPage() {
  return (
    <ComingSoon
      icon={automationsConfig.icon}
      name={automationsConfig.name}
      description={automationsConfig.description}
      category={automationsConfig.category}
    />
  )
}
