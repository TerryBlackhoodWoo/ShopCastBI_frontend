import { BROADCAST_TYPE } from '../constants/broadcastType'
import './BroadcastTypeToggle.css'

function BroadcastTypeToggle({ value, onChange }) {
  return (
    <div className="broadcast-type-toggle">
      <button
        type="button"
        className={value === BROADCAST_TYPE.LIVE ? 'active' : ''}
        onClick={() => onChange(BROADCAST_TYPE.LIVE)}
      >
        라이브 방송
      </button>
      <button
        type="button"
        className={value === BROADCAST_TYPE.HOME_SHOPPING ? 'active' : ''}
        onClick={() => onChange(BROADCAST_TYPE.HOME_SHOPPING)}
      >
        홈쇼핑
      </button>
    </div>
  )
}

export default BroadcastTypeToggle
