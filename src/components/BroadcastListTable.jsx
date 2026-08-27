import { REQUEST_STATUS } from '../constants/requestStatus'
import { BROADCAST_TYPE } from '../constants/broadcastType'
import './BroadcastListTable.css'

const HOMESHOPPING_COLUMNS = 4 // 상품 / 방송시간 / 가격 / 혜택·상태
const LIVE_COLUMNS = 2 // 방송 / 진행시간

const priceFormatter = new Intl.NumberFormat('ko-KR')

function formatPrice(value) {
  if (value == null) return '-'
  return `${priceFormatter.format(value)}원`
}

function StatusMessage({ colSpan, children }) {
  return (
    <tr className="broadcast-list-table__status-row">
      <td colSpan={colSpan}>{children}</td>
    </tr>
  )
}

function HomeshoppingRows({ data }) {
  return data.map((item) => (
    <tr key={item.itemCode} className={item.soldout ? 'is-soldout' : ''}>
      <td className="col-product">
        <div className="product-cell">
          {item.imageUrl && <img className="product-thumb" src={item.imageUrl} alt="" loading="lazy" />}
          <div className="product-info">
            <a
              className="product-title"
              href={item.productUrl}
              target="_blank"
              rel="noreferrer"
            >
              {item.title}
            </a>
            <span className="product-category">{item.category}</span>
          </div>
        </div>
      </td>
      <td className="col-time">
        <span className="time-range">
          {item.broadcastTime}–{item.broadcastEndTime}
        </span>
        <span className="time-duration">{item.durationMinutes}분</span>
      </td>
      <td className="col-price">
        {item.discountRate > 0 && (
          <span className="discount-badge">{item.discountRate}%</span>
        )}
        <span className="sale-price">{formatPrice(item.salePrice)}</span>
        {item.discountRate > 0 && (
          <span className="normal-price">{formatPrice(item.normalPrice)}</span>
        )}
      </td>
      <td className="col-perks">
        <div className="perk-tags">
          {item.freeShipping && <span className="perk-tag">무료배송</span>}
          {item.installmentMonths > 0 && (
            <span className="perk-tag">무이자 {item.installmentMonths}개월</span>
          )}
          {item.soldout && <span className="perk-tag perk-tag--soldout">품절</span>}
        </div>
      </td>
    </tr>
  ))
}

function LiveRows({ data }) {
  return data.map((item, index) => (
    <tr key={`${item.title}-${index}`}>
      <td className="col-product">
        <span className="product-title product-title--plain">{item.title}</span>
      </td>
      <td className="col-time">
        <span className="time-range">{item.broadcastTime}</span>
        <span className="time-duration">{item.durationMinutes}분</span>
      </td>
    </tr>
  ))
}

function BroadcastListTable({ type, data = [], status = REQUEST_STATUS.SUCCESS }) {
  const isHomeshopping = type === BROADCAST_TYPE.HOME_SHOPPING
  const columnCount = isHomeshopping ? HOMESHOPPING_COLUMNS : LIVE_COLUMNS

  const renderBody = () => {
    switch (status) {
      case REQUEST_STATUS.LOADING:
        return <StatusMessage colSpan={columnCount}>불러오는 중이에요</StatusMessage>
      case REQUEST_STATUS.ERROR:
        return <StatusMessage colSpan={columnCount}>데이터를 불러오지 못했어요</StatusMessage>
      case REQUEST_STATUS.EMPTY:
        return <StatusMessage colSpan={columnCount}>오늘 편성된 방송이 없어요</StatusMessage>
      case REQUEST_STATUS.SUCCESS:
      default:
        return isHomeshopping ? <HomeshoppingRows data={data} /> : <LiveRows data={data} />
    }
  }

  return (
    <table className="broadcast-list-table" data-type={type}>
      <thead>
        <tr>
          <th>{isHomeshopping ? '상품' : '방송'}</th>
          <th>방송시간</th>
          {isHomeshopping && (
            <>
              <th>가격</th>
              <th>혜택·상태</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>{renderBody()}</tbody>
    </table>
  )
}

export default BroadcastListTable
