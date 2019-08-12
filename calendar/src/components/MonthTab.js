import React from 'react'
import moment from 'moment'

class MonthTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // console.log(this.props)
    const nowMonth = moment(
      this.props.MonthTabPack.initYearMonth,
      'YYYYMM'
    ).format('YYYY  M月')
    const leftMonth = moment(this.props.MonthTabPack.initYearMonth, 'YYYYMM')
      .add(-1, 'month')
      .format('YYYY  M月')
    const middleMonth = moment(
      this.props.MonthTabPack.initYearMonth,
      'YYYYMM'
    ).format('YYYY  M月')
    const rightMonth = moment(this.props.MonthTabPack.initYearMonth, 'YYYYMM')
      .add(1, 'month')
      .format('YYYY  M月')
    return (
      <>
        <div
          onClick={this.props.MonthTabPack.monthswitchLeft}
          className={'mothTabBg d-flex jusifyCenter alignCenter '}
        >
          <span className="showmonth"> {leftMonth}</span>
          <span className={nowMonth === leftMonth ? 'active' : ''}></span>
        </div>
        <div
          //   onClick={this.monthswitchMiddle}
          className={'mothTabBg d-flex jusifyCenter alignCenter '}
        >
          <span className="showmonth"> {middleMonth}</span>
          <span className={nowMonth === middleMonth ? 'active' : ''}></span>
        </div>
        <div
          onClick={this.props.MonthTabPack.monthswitchRight}
          className={
            'd-flex jusifyCenter alignCenter ' +
            (nowMonth === rightMonth ? 'active' : '')
          }
        >
          <span className="showmonth"> {rightMonth}</span>
          <span className={nowMonth === rightMonth ? 'active' : ''}></span>
        </div>
      </>
    )
  }
}

export default MonthTab
