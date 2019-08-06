import React from 'react'
import moment from 'moment'

class Mainpage extends React.Component {
  constructor() {
    super()
    this.state = {
      nowMonth: [],
      currentYear: 2019,
      currentMonth: 8,
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
    const nowNowYear = this.state.currentYear
    const nowMonth = this.state.currentMonth
    const dateArray = []
    const dateArraySplit = []
    const monthStartWeekday = moment([nowNowYear, nowMonth - 1, 1]).weekday()
    const tableStartDate = moment([nowNowYear, nowMonth - 1, 1])
      .add(-monthStartWeekday, 'days')
      .date()
    //4
    console.log(monthStartWeekday)
    console.log(tableStartDate)

    for (let i = 0; i < 42; i++) {
      const allDateArray = moment([2019, 7, 1])
        .add(-monthStartWeekday + i, 'days')
        .date()
      dateArray.push(allDateArray)
    }
    for (let i = 0; i < 6; i++) {
      dateArraySplit.push(dateArray.slice(i * 7, i * 7 + 7))
    }
    await this.setState({ nowMonth: dateArraySplit })
    console.log(dateArray)
    console.log(dateArraySplit)
    console.log(this.state.nowMonth)

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

  render() {
    return (
      <>
        <button>切換</button>
        <div className="wrapper">
          <div className="calender">
            <div className="weekDays">
              <ul className="list-unstyle d-flex">
                <li onclick={this.monthChange} className="">
                  {this.state.currentMonth - 1 + '月'}
                </li>
                <li onclick={this.monthChange} className="">
                  {this.state.currentMonth + '月'}
                </li>
                <li onclick={this.monthChange} className="">
                  {this.state.currentMonth + 1 + '月'}
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
                  {this.state.nowMonth.map((ele, index) => (
                    <tr key={index + +new Date()}>
                      {ele.map((e, ind) => (
                        <td>
                          <div key={ind + +new Date()}>
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
