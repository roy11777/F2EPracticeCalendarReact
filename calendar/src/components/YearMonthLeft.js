import React from 'react'

class YearMonthLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // console.log(this.props)
    return (
      <>
        <div onClick={this.monthswitchLeft} className="">
          {this.props.prevMonth}
        </div>
      </>
    )
  }
}

export default YearMonthLeft
