import { useEffect, useState } from 'react'
import BroadcastTypeToggle from '../components/BroadcastTypeToggle'
import BroadcastListTable from '../components/BroadcastListTable'
import { BROADCAST_TYPE } from '../constants/broadcastType'
import { REQUEST_STATUS } from '../constants/requestStatus'

const API_BASE_URL = 'http://localhost:4000'

function BroadcastDashboard() {
  const [type, setType] = useState(BROADCAST_TYPE.LIVE)
  const [status, setStatus] = useState(REQUEST_STATUS.LOADING)
  const [data, setData] = useState([])

  useEffect(() => {
    let ignore = false

    async function fetchBroadcasts() {
      setStatus(REQUEST_STATUS.LOADING)

      try {
        const response = await fetch(`${API_BASE_URL}/api/broadcasts?type=${type}`)
        const body = await response.json()

        if (ignore) return

        if (!response.ok || body.status === REQUEST_STATUS.ERROR) {
          setData([])
          setStatus(REQUEST_STATUS.ERROR)
          return
        }

        const list = body.data ?? []
        setData(list)
        setStatus(list.length === 0 ? REQUEST_STATUS.EMPTY : REQUEST_STATUS.SUCCESS)
      } catch {
        if (!ignore) {
          setData([])
          setStatus(REQUEST_STATUS.ERROR)
        }
      }
    }

    fetchBroadcasts()

    return () => {
      ignore = true
    }
  }, [type])

  return (
    <div className="broadcast-dashboard">
      <BroadcastTypeToggle value={type} onChange={setType} />
      <BroadcastListTable type={type} data={data} status={status} />
    </div>
  )
}

export default BroadcastDashboard
