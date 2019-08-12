import React from 'react'
import moment from 'moment'

class MonthTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boudry: false,
    }
  }

  componentDidMount() {}
  render() {
    const preCheck = this.props.MonthTabPack.prevDataCheck()[0]
    const nextCheck = this.props.MonthTabPack.nextDataCheck()[0]
    // console.log(preCheck)
    // console.log(nextCheck)

    const nowMonth = moment(
      this.props.MonthTabPack.initYearMonth,
      'YYYYMM'
    ).format('YYYY  M月')
    const leftMonth = moment(this.props.MonthTabPack.initYearMonth, 'YYYYMM')
      .add(preCheck === 0 ? 0 : nextCheck === 0 ? -2 : -1, 'month')
      .format('YYYY  M月')
    const middleMonth = moment(this.props.MonthTabPack.initYearMonth, 'YYYYMM')
      .add(preCheck === 0 ? 1 : nextCheck === 0 ? -1 : 0, 'month')
      .format('YYYY  M月')
    const rightMonth = moment(this.props.MonthTabPack.initYearMonth, 'YYYYMM')
      .add(preCheck === 0 ? 2 : nextCheck === 0 ? 0 : 1, 'month')
      .format('YYYY  M月')
    // console.log(middleMonth)
    return (
      <>
        <div
          onClick={this.props.MonthTabPack.monthswitchLeft}
          className={'mothTabBg d-flex jusifyCenter alignCenter '}
        >
          <span className="showmonth  d-flex" ref={this.props.left}>
            {leftMonth}
            <span>
              {this.props.MonthTabPack.prevDataLength === 0 ? '無出發日' : ''}
            </span>
          </span>
          <span className={nowMonth === leftMonth ? 'active' : ''}></span>
        </div>
        <div
          //   onClick={this.monthswitchMiddle}
          className={'mothTabBg d-flex jusifyCenter alignCenter '}
        >
          <span className="showmonth  d-flex" ref={this.props.mid}>
            {middleMonth}
            <span>
              {this.props.MonthTabPack.midDataLength === 0 ? '無出發日' : ''}
            </span>
          </span>
          <span className={nowMonth === middleMonth ? 'active' : ''}></span>
        </div>
        <div
          onClick={this.props.MonthTabPack.monthswitchRight}
          className={
            'mothTabBg d-flex jusifyCenter alignCenter ' +
            (nowMonth === rightMonth ? 'active' : '')
          }
        >
          <span className="showmonth d-flex" ref={this.props.right}>
            {rightMonth}
            <span>
              {this.props.MonthTabPack.nextDataLength === 0 ? '無出發日' : ''}
            </span>
          </span>

          <span className={nowMonth === rightMonth ? 'active' : ''}></span>
        </div>
      </>
    )
  }
}

export default MonthTab
