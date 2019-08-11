import React from 'react'
import moment from 'moment'
// import '/moment/locale/zh-tw'

class DateContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
      }
      //   設state方便提用傳入內容產生function
      //   await this.setState({ fetchData: jsonObject })
      //   console.log(parseData)
      await this.props.Package.method(parseData)
      await this.props.Package.methodstraight()
    } catch (e) {
      console.log(e)
    }
    // 初始化列表顯示內容
  }

  render() {
    console.log(this.props.Package.CurrentData)
    console.log(this.props.Package)
    // 顯示總頁數

    return (
      <>
        {/* TODO:border設定 */}
        {/* 日歷模式 */}
        <div ref={this.props.rowData}>
          <div className="weekday list-unstyle d-flex jusifyCenter alignCenter">
            <div>星期日</div>
            <div>星期一</div>
            <div>星期二</div>
            <div>星期三</div>
            <div>星期四</div>
            <div>星期五</div>
            <div>星期六</div>
          </div>
          <div className="d-flex itineraryBox">
            {this.props.Package.CurrentData.map(function(ele, index) {
              const tour = ele.matchTour
              //   console.log(ele)
              return (
                <div
                  key={index + +new Date()}
                  className={
                    (ele.calendarDate === '' ? 'disable' : '') +
                    ' jusifyCenter alignCenter itinerary'
                  }
                >
                  <span
                    className={
                      tour.length === 0
                        ? ''
                        : tour.length > 1
                        ? ''
                        : tour[0].guaranteed === true
                        ? 'readytogo'
                        : ''
                    }
                  >
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
                  <span className={tour.length > 1 ? 'mutiTour' : ''}>
                    {ele.calendarDate === ''
                      ? ''
                      : moment(ele.calendarDate, 'YYYY/MM/DD').get('date')}
                  </span>
                  <span
                    className={
                      tour.length === 0
                        ? ''
                        : tour.length > 1
                        ? 'blue'
                        : tour[0].status === '報名'
                        ? 'org'
                        : tour[0].status === '預定'
                        ? 'org'
                        : tour[0].status === '後補'
                        ? 'lightg'
                        : tour[0].status === '請洽專員'
                        ? 'lightg'
                        : 'gray'
                    }
                  >
                    {tour.length === 0
                      ? ''
                      : tour.length > 1
                      ? tour.length + '看更多團'
                      : tour[0].status}
                  </span>
                  <span className={tour.length > 0 ? 'dark' : ''}>
                    {tour.length === 0
                      ? ''
                      : tour.length > 1
                      ? ''
                      : '可賣：' + tour[0].available}
                  </span>
                  <span className={tour.length > 0 ? 'dark' : ''}>
                    {tour.length === 0
                      ? ''
                      : tour.length > 1
                      ? ''
                      : '團位：' + tour[0].total}
                  </span>
                  <span className={tour.length > 0 ? 'red' : ''}>
                    {/* TODO://要抓到最低價錢 */}
                    {tour.length === 0 ? '' : '$' + tour[0].price}
                    <span className={tour.length > 0 ? 'dark' : ''}>
                      {tour.length > 1 ? '起' : ''}
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        {/* 列表模式 */}
        <div className="d-none" ref={this.props.straightData}>
          <div ref={this.props.straightDataShow}>
            {this.props.Package.CurrentDataPart.map(function(e, index) {
              //   moment.locale('zh-tw')
              //   console.log(moment(e.date, 'YYYY/MM/DD').weekdays(0))
              return (
                <div
                  key={index + +new Date()}
                  className="itineraryStraight d-none"
                >
                  <div className="d-flex">
                    <div className="date dark  d-flex alignCenter">
                      <span>{moment(e.date, 'YYYY/MM/DD').get('date')}</span>
                      {/* TODO:星期幾 */}
                      <span>
                        {'星期' + moment(e.date, 'YYYY/MM/DD').weekday()}
                      </span>
                    </div>
                    <div className="detail d-flex jusifyCenter">
                      <div>
                        <span className="dark">{'可賣:' + e.available}</span>
                        <span className="dark">{'團位:' + e.total}</span>
                      </div>
                      <div>
                        <span className={e.guaranteed ? 'ready' : ''}>
                          {e.guaranteed ? '成團' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="priceStatus d-flex jusifyCenter">
                      <span
                        className={
                          e.length === 0
                            ? ''
                            : e.length > 1
                            ? 'blue'
                            : e.status === '報名'
                            ? 'org'
                            : e.status === '預定'
                            ? 'org'
                            : e.status === '後補'
                            ? 'lightg'
                            : e.status === '請洽專員'
                            ? 'lightg'
                            : 'gray'
                        }
                      >
                        {e.status}
                      </span>
                      <span className="red">{'$' + e.price}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="pageArea d-flex">
            <button onClick={this.props.Package.handlePrevPage}>上一頁</button>
            <div>
              {this.props.Package.nowPage + '/' + this.props.Package.totalPages}
            </div>
            <button onClick={this.props.Package.handleNextPage}>下一頁</button>
          </div>
        </div>
      </>
    )
  }
}

export default DateContainer
