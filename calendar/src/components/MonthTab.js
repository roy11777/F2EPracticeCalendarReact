import React from 'react'
import moment from 'moment'

class MonthTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // console.log(this.props)
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
          className="d-flex jusifyCenter alignCenter"
        >
          <span> {leftMonth}</span>
        </div>
        <div
          //   onClick={this.monthswitchMiddle}
          className="d-flex jusifyCenter alignCenter"
        >
          <span> {middleMonth}</span>
        </div>
        <div
          onClick={this.props.MonthTabPack.monthswitchRight}
          className="d-flex jusifyCenter alignCenter"
        >
          <span> {rightMonth}</span>
        </div>
      </>
    )
  }
}

export default MonthTab
