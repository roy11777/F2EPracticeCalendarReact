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
        <div
          onClick={this.monthswitchLeft}
          className="d-flex jusifyCenter alignCenter"
        >
          <span> {this.props.prevMonth}</span>
        </div>
      </>
    )
  }
}

export default YearMonthLeft
