import React from 'react'
import moment from 'moment'

class Mainpage extends React.Component {
  constructor() {
    super()
    this.state = {
      jasondata: [],
      nowMonthData: [],
      currentYear: 2017,
      currentMonth: 9, //month index 0~11
      //   currentYear: moment().year(),
      //   currentMonth: moment().month() + 1, //month index 0~11
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('/data/data1.json')
      const jsonObject = await response.json()
      //   console.log(jsonObject)
      //   設state方便提用傳入內容產生function
      await this.setState({ jasondata: jsonObject })
      this.handleMonthContent(jsonObject)
    } catch (e) {
      console.log(e)
    }
  }
  handleMonthContent = async jsonData => {
    console.log(jsonData)
    if (this.state.currentMonth < 1) {
      this.setState({
        currentMonth: 12,
        currentYear: this.state.currentYear - 1,
      })
      console.log(this.state.currentYear)
      console.log(this.state.currentMonth)
    }
    if (this.state.currentMonth > 12) {
      this.setState({
        currentMonth: 1,
        currentYear: this.state.currentYear + 1,
      })
      console.log(this.state.currentYear)
      console.log(this.state.currentMonth)
    }
    const nowYear = this.state.currentYear
    const nowMonth = this.state.currentMonth
    // 存放每日日期與所有對應到行程
    const dateArray = []
    // 當前月份第幾格開始
    const monthStartWeekday = moment([nowYear, nowMonth - 1, 1]).weekday()

    // console.log(nowYear)
    // console.log(nowMonth)
    //   console.log(tableStartDate)
    //   console.log(tableStartDate)

    for (let i = 0; i < 42; i++) {
      const obj = {}
      const allDateArray = moment([nowYear, nowMonth - 1, 1])
        //   扣掉當月開始日期回到第一格
        .add(-monthStartWeekday + i, 'days')
      // 格式化成語json檔案相同格式方便比對
      const yearDate = allDateArray.format('YYYY/MM/DD')
      //   const date = allDateArray.date()
      //   先設定日歷需產生之日期
      obj.calendarDate = yearDate
      const match = await jsonData.filter(
        item => item.date.indexOf(yearDate) !== -1
      )
      //   將比對後相同日期的物件放入整合obj中最後push入相同陣列
      obj.matchTour = match
      //   console.log(match)
      //   tour可能會有多筆
      //   console.log(obj.matchTour[0])
      dateArray.push(obj)
    }
    await this.setState({ nowMonthData: dateArray })
    console.log(dateArray)
    console.log(this.state.nowMonthData)
  }

  prevMonth = async () => {
    const nowMonth = this.state.currentMonth
    await this.setState({ currentMonth: nowMonth - 1 })
    // 將fetch出資料在onclick時傳入內容產生function
    await this.handleMonthContent(this.state.jasondata)
  }
  nextMonth = async () => {
    const nowMonth = this.state.currentMonth
    await this.setState({ currentMonth: nowMonth + 1 })
    await this.handleMonthContent(this.state.jasondata)
  }

  render() {
    const showMonth = this.state.currentMonth
    const showYear = this.state.currentYear
    return (
      <>
        <button>切換</button>
        <button onClick={this.prevMonth}>左</button>
        <button onClick={this.nextMonth}>右</button>
        <div className="wrapper">
          <div className="calender">
            <div className="monthYears">
              <div className="list-unstyle d-flex alignCenter">
                <div onClick={this.monthChange} className="">
                  {(showMonth === 1 ? showYear - 1 : showYear) +
                    '年' +
                    (showMonth === 1 ? 12 : showMonth - 1) +
                    '月'}
                </div>
                <div onClick={this.monthChange} className="">
                  {showYear + '年' + showMonth + '月'}
                </div>
                <div onClick={this.monthChange} className="">
                  {(showMonth === 12 ? showYear + 1 : showYear) +
                    '年' +
                    (showMonth === 12 ? 1 : showMonth + 1) +
                    '月'}
                </div>
              </div>
            </div>
            <div className="calendarMain">
              <div className="weekday list-unstyle d-flex jusifyCenter alignCenter">
                <div>星期日</div>
                <div>星期一</div>
                <div>星期二</div>
                <div>星期三</div>
                <div>星期四</div>
                <div>星期五</div>
                <div>星期六</div>
              </div>
              <div className="dateContent d-flex ">
                {this.state.nowMonthData.map(function(ele, index) {
                  const tour = ele.matchTour
                  console.log(tour)
                  return (
                    <div
                      key={index + +new Date()}
                      className="d-flex jusifyCenter alignCenter itinerary"
                    >
                      <span>
                        {ele.calendarDate
                          .slice(
                            ele.calendarDate.length - 2,
                            ele.calendarDate.length
                          )
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
                        {tour.length === 0
                          ? ''
                          : tour.length > 1
                          ? ''
                          : tour[0].status}
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
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Mainpage
