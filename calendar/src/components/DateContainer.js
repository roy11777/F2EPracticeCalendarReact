import React from 'react'

class DateContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(props)
  }

  render() {
    return (
      <>
        {this.props.nowMonthData.map(function(ele, index) {
          const tour = ele.matchTour
          //   console.log(tour)
          return (
            <div
              key={index + +new Date()}
              className="d-flex jusifyCenter alignCenter itinerary"
            >
              <span>
                {ele.calendarDate
                  .slice(ele.calendarDate.length - 2, ele.calendarDate.length)
                  // 將yyyy/mm/dd處理成DD並移除0
                  .replace(/^0+/, '')}
              </span>
              <span>
                {tour.length === 0
                  ? ''
                  : tour.length > 1
                  ? ''
                  : tour[0].guaranteed === true
                  ? '成團'
                  : ''
                //判斷是否無行程避免undefined在判斷是否超過一個行程顯示不同內容
                // 如果只有一個行程在render進html
                }
              </span>
              <span>
                {tour.length === 0 ? '' : tour.length > 1 ? '' : tour[0].status}
              </span>
              <span>
                {tour.length === 0
                  ? ''
                  : tour.length > 1
                  ? ''
                  : tour[0].availableVancancy}
              </span>
              <span>
                {tour.length === 0
                  ? ''
                  : tour.length > 1
                  ? ''
                  : tour[0].totalVacnacy}
              </span>
              <span>
                {tour.length === 0 ? '' : tour.length > 1 ? '' : tour[0].price}
              </span>
            </div>
          )
        })}
      </>
    )
  }
}

export default DateContainer
