import React from 'react'
import moment from 'moment'
// import '/moment/locale/zh-tw'

class DateContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      perPage: 7,
      nowPage: 1,
    }
    this.straightDataShow = React.createRef()
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
    const perPage = this.state.perPage
    const nowPage = this.state.nowPage
    // console.log(this.state.perPage)
    const allElement = this.straightDataShow.current.childNodes
    const pages = Math.ceil(allElement.length / perPage)
    console.log(pages)
    console.log(allElement)
    for (let i = 0; i < perPage; i++) {
      allElement[i].classList.remove('d-none')
      console.log(allElement[i])
    }
  }
  // TODO:改掉切換顯示內容渲染的頁面
  handlePrevPage = () => {
    const perPage = this.state.perPage
    const nowPage = this.state.nowPage
    const allElement = this.straightDataShow.current.childNodes
    if (nowPage > 1) {
      console.log('1123')
      console.log(allElement)
      for (let i = 0; i < allElement.length; i++) {
        allElement[i].classList.add('d-none')
      }
    }
  }
  // TODO:改掉切換顯示內容渲染的頁面
  handleNextPage = async () => {
    const perPage = this.state.perPage
    const nowPage = this.state.nowPage
    // console.log(this.state.perPage)
    if (nowPage < perPage) {
      const allElement = this.straightDataShow.current.childNodes
      const pages = Math.ceil(allElement.length / perPage)
      console.log(pages)
      console.log(allElement)
      for (let i = perPage * nowPage; i < perPage * nowPage + perPage; i++) {
        allElement[i].classList.add('d-none')
      }
    }
  }
  render() {
    console.log(this.props.Package.CurrentData)
    console.log(this.props.Package.CurrentDataPart)
    return (
      <>
        <div className="d-flex itineraryBox" ref={this.props.rowData}>
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
                  {tour.length === 0
                    ? ''
                    : tour.length > 1
                    ? tour.length + '團'
                    : tour[0].status}
                </span>
                <span>
                  {tour.length === 0
                    ? ''
                    : tour.length > 1
                    ? ''
                    : tour[0].available}
                </span>
                <span>
                  {tour.length === 0
                    ? ''
                    : tour.length > 1
                    ? ''
                    : tour[0].total}
                </span>
                <span>
                  {tour.length === 0
                    ? ''
                    : tour.length > 1
                    ? ''
                    : tour[0].price}
                </span>
              </div>
            )
          })}
        </div>
        <div className="d-none" ref={this.props.straightData}>
          <div className="pageArea d-flex">
            <button onClick={this.handlePrevPage}>上一頁</button>
            <div>第幾頁</div>
            <button onClick={this.handleNextPage}>下一頁</button>
          </div>
          <div ref={this.straightDataShow}>
            {this.props.Package.CurrentDataPart.map(function(e, index) {
              //   moment.locale('zh-tw')
              //   console.log(moment(e.date, 'YYYY/MM/DD').weekdays(0))
              return (
                <div key={index + +new Date()} className="itineraryStraight ">
                  <div className="date">
                    <span>
                      {moment(e.date, 'YYYY/MM/DD').format('YYYY/MM/DD')}
                    </span>
                    <span>
                      {'星期' + moment(e.date, 'YYYY/MM/DD').weekday()}
                    </span>
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
        </div>
      </>
    )
  }
}

export default DateContainer
