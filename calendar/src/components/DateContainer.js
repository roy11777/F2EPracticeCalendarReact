import React from 'react'
import moment from 'moment'
// import '/moment/locale/zh-tw'

class DateContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      //   const api = JSON.stringify(this.props.Package.dataSource)
      //   console.log(this.props.Package)
      //   TODO:直接fetch array
      const response = await fetch(this.props.Package.dataSource)
      const jsonObject = await response.json()
      const settingObj = this.props.Package.dataKeySetting
      const parseData = []

      //   轉換不同json對應key
      for (let i = 0; i < jsonObject.length; i++) {
        let obj = {
          guaranteed: jsonObject[i][settingObj.guaranteed],
          date: jsonObject[i].date,
          status: jsonObject[i][settingObj.status],
          available: jsonObject[i][settingObj.available],
          total: jsonObject[i][settingObj.total],
          price: jsonObject[i][settingObj.price],
        }
        parseData.push(obj)
        // console.log(
        //   moment(obj.date, 'YYYY/MM/DD')
        //     .locale('zh-tw')
        //     .day()
        // )
      }
      //   設state方便提用傳入內容產生function
      //   await this.setState({ fetchData: jsonObject })
      //   console.log(parseData)
      await this.props.Package.method(parseData)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <>
        {this.props.Package.CurrentData.map(function(ele, index) {
          const tour = ele.matchTour
          //   console.log(tour)
          return (
            <div
              key={index + +new Date()}
              className="d-flex jusifyCenter alignCenter itinerary"
            >
              <span>
                {ele.calendarDate === ''
                  ? ''
                  : moment(ele.calendarDate, 'YYYY/MM/DD').get('date')}
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
                  : tour[0].available}
              </span>
              <span>
                {tour.length === 0 ? '' : tour.length > 1 ? '' : tour[0].total}
              </span>
              <span>
                {tour.length === 0 ? '' : tour.length > 1 ? '' : tour[0].price}
              </span>
            </div>
          )
        })}
        <div className="">
          {this.props.Package.CurrentDataPart.map(function(e, index) {
            //   moment.locale('zh-tw')
            //   console.log(moment(e.date, 'YYYY/MM/DD').weekdays(0))
            return (
              <div key={index + +new Date()} className="itineraryStraight">
                <div className="date">
                  <span>{moment(e.date, 'YYYY/MM/DD').get('date')}</span>
                  <span>{'星期' + moment(e.date, 'YYYY/MM/DD').weekday()}</span>
                </div>
                <div className="detail">
                  <span>{e.available}</span>
                  <span>{e.total}</span>
                  <span>{e.guaranteed}</span>
                </div>
                <div className="priceStatus">
                  <span>{e.status}</span>
                  <span>{e.price}</span>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }
}

export default DateContainer
