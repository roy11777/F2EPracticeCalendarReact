import React from 'react'
import moment from 'moment'

class Mainpage extends React.Component {
  constructor() {
    super()
    this.state = {
      nowMonthData: [],
      currentYear: moment().year(),
      currentMonth: moment().month() + 1, //month index 0~11
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('/data/data1.json')
      const jsonObject = await response.json()
      console.log(jsonObject)
    } catch (e) {
      console.log(e)
    }
    this.handleMonthContent()
    // console.log(m.get('years'))
    // console.log(moment('12-25-1995', 'MM-DD-YYYY'))
    // console.log(dayWrapper)
    // console.log(moment().day(24))
    // console.log(moment().millisecond(999999999))
    // console.log(
    //   moment().calendar(null, {
    //     sameDay: '[Today]',
    //     nextDay: '[Tomorrow]',
    //     nextWeek: 'dddd',
    //     lastDay: '[Yesterday]',
    //     lastWeek: '[Last] dddd',
    //     sameElse: 'DD/MM/YYYY',
    //   })
    // )
  }
  handleMonthContent = async () => {
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
    const dateArray = []
    const dateArraySplit = []
    // 當前月份第幾格開始
    const monthStartWeekday = moment([nowYear, nowMonth - 1, 1]).weekday()

    console.log(nowYear)
    console.log(nowMonth)
    //   console.log(tableStartDate)
    //   console.log(tableStartDate)

    for (let i = 0; i < 42; i++) {
      const allDateArray = moment([nowYear, nowMonth - 1, 1])
        //   扣掉當月開始日期回到第一格
        .add(-monthStartWeekday + i, 'days')
        .date()
      dateArray.push(allDateArray)
    }
    for (let i = 0; i < 6; i++) {
      dateArraySplit.push(dateArray.slice(i * 7, i * 7 + 7))
    }
    await this.setState({ nowMonthData: dateArraySplit })
    //   console.log(dateArray)
    //   console.log(dateArraySplit)
    //   console.log(this.state.nowMonthData)
  }

  prevMonth = async () => {
    const nowMonth = this.state.currentMonth
    await this.setState({ currentMonth: nowMonth - 1 })
    await this.handleMonthContent()
  }
  nextMonth = async () => {
    const nowMonth = this.state.currentMonth
    await this.setState({ currentMonth: nowMonth + 1 })
    await this.handleMonthContent()
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
            <div className="weekDays">
              <ul className="list-unstyle d-flex">
                <li onClick={this.monthChange} className="">
                  {(showMonth === 1 ? showYear - 1 : showYear) +
                    '年' +
                    (showMonth === 1 ? 12 : showMonth - 1) +
                    '月'}
                </li>
                <li onClick={this.monthChange} className="">
                  {showYear + '年' + showMonth + '月'}
                </li>
                <li onClick={this.monthChange} className="">
                  {(showMonth === 12 ? showYear + 1 : showYear) +
                    '年' +
                    (showMonth === 12 ? 1 : showMonth + 1) +
                    '月'}
                </li>
              </ul>
            </div>
            <div className="calendarMain">
              <table>
                <thead>
                  <tr>
                    <th>星期日</th>
                    <th>星期一</th>
                    <th>星期二</th>
                    <th>星期三</th>
                    <th>星期四</th>
                    <th>星期五</th>
                    <th>星期六</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.nowMonthData.map((ele, index) => (
                    <tr key={index + +new Date()}>
                      {ele.map((e, ind) => (
                        <td key={ind + +new Date() + 1}>
                          <div>
                            <span>{e}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Mainpage
