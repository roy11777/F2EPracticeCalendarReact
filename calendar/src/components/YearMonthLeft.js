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
          onClick={this.props.monthswitchLeft}
          className="d-flex jusifyCenter alignCenter"
        >
          <span> {this.props.leftMonth}</span>
        </div>
      </>
    )
  }
}

export default YearMonthLeft
