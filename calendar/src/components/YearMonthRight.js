import React from 'react'

class YearMonthRight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // console.log(this.props)
    return (
      <>
        <div
          onClick={this.props.monthswitchRight}
          className="d-flex jusifyCenter alignCenter"
        >
          <span> {this.props.rightMonth}</span>
        </div>
      </>
    )
  }
}

export default YearMonthRight
