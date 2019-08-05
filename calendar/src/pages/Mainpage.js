import React from 'react'

class Mainpage extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <button>切換</button>

        <div className="wrapper" style={{ background: '#e7e7e7' }}>
          <div classNam="weekDays">
            <ul className="list-unstyle">
              <li>月</li>
            </ul>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

export default Mainpage
