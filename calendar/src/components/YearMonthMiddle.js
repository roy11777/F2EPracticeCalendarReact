import React from 'react'

class YearMonthMiddle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // console.log(this.props)
    return (
      <>
        <div onClick={this.monthswitchMiddle} className="">
          {this.props.nowwMonth}
        </div>
      </>
    )
  }
}

export default YearMonthMiddle
