import React from 'react'

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
        // console.log(obj)
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
      </>
    )
  }
}

export default DateContainer
