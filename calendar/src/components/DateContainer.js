import React from 'react'
import moment from 'moment'

class DateContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    try {
      const sourcePattern = /^(((^((https||http):\/\/(\w+\.)+\w+)\/?)?)||(((((\.){0,2})\/)+)?))((\w+\/)+)?(((((\.){0,2})\/)+)?(\w+(\.(\w+))?))?$/
      if (sourcePattern.test(this.props.Package.dataSource)) {
        const response = await fetch(this.props.Package.dataSource)
        const jsonObject = await response.json()
        const settingObj = this.props.Package.dataKeySetting
        const parseData = []

        //   轉換不同json對應key
        for (let i = 0; i < jsonObject.length; i++) {
          let obj = {
            guaranteed: jsonObject[i][settingObj.guaranteed],
            date: jsonObject[i].date,
            status: jsonObject[i][settingObj.status],
            available: jsonObject[i][settingObj.available],
            total: jsonObject[i][settingObj.total],
            price: jsonObject[i][settingObj.price],
          }
          parseData.push(obj)
        }

        await this.props.Package.method(parseData)
        await this.props.Package.methodstraight()
        // 如果當月沒資則觸發下列搜尋最近function
        await this.props.Package.dataSearch()
        // console.log(this.props.Package.initYearMonth)
      } else {
        alert('請輸入正確來源')
      }
    } catch (e) {
      console.log(e)
    }
    // 初始化列表顯示內容
  }

  handleRowFocus = async i => {
    const eleClick = this.props.rowContent.current.childNodes
    // console.log(eleClick[i].classList.contains('nodata'))
    // MAP出來如果當日沒資料會新增 no data class
    if (!eleClick[i].classList.contains('nodata')) {
      for (let j = 0; j < eleClick.length; j++) {
        eleClick[j].classList.remove('onFocus')
      }
      await eleClick[i].classList.add('onFocus')
    }
    console.log(i)
  }
  handleStraightFocus = async i => {
    // console.log(this.props.rowContent.current.childNodes[i])
    const eleClick = this.props.straightDataShow.current.childNodes
    for (let j = 0; j < eleClick.length; j++) {
      eleClick[j].classList.remove('onFocus')
    }
    eleClick[i].classList.add('onFocus')
    // console.log(i)
  }

  render() {
    // 顯示總頁數

    const handleRowFocus = this.handleRowFocus
    const handleStraightFocus = this.handleStraightFocus
    return (
      <>
        {/* 日歷模式 */}
        <div ref={this.props.rowData}>
          <div className="weekday list-unstyle d-flex jusifyCenter alignCenter">
            <div>星期日</div>
            <div>星期一</div>
            <div>星期二</div>
            <div>星期三</div>
            <div>星期四</div>
            <div>星期五</div>
            <div>星期六</div>
          </div>
          <div className="d-flex itineraryBox" ref={this.props.rowContent}>
            {this.props.Package.CurrentData.map(function(ele, index) {
              const tour = ele.matchTour
              // console.log(tour)
              return (
                <div
                  onClick={handleRowFocus.bind(this, index)}
                  key={index + +new Date()}
                  className={
                    (ele.calendarDate === '' ? 'disable' : 'active') +
                    ' jusifyCenter alignCenter itinerary ' +
                    (tour.length === 0 ? 'nodata' : '')
                  }
                >
                  <span
                    className={
                      tour.length === 0
                        ? ''
                        : tour.length > 1
                        ? ''
                        : tour[0].guaranteed === true
                        ? 'readytogo'
                        : ''
                    }
                  >
                    {tour.length === 0
                      ? ''
                      : tour.length > 1
                      ? ''
                      : tour[0].guaranteed === true
                      ? '成團'
                      : ''
                    //判斷是否無行程避免undefined在判斷是否超過一個行程顯示不同內容
                    // 如果只有一個行程在render進html
                    }
                  </span>
                  <span className={tour.length > 1 ? 'mutiTour' : ''}>
                    {ele.calendarDate === ''
                      ? ''
                      : moment(ele.calendarDate, 'YYYY/MM/DD').get('date')}
                  </span>
                  <span
                    className={
                      tour.length === 0
                        ? ''
                        : tour.length > 1
                        ? 'moreGroup  blue'
                        : tour[0].status === '報名'
                        ? 'org'
                        : tour[0].status === '預定'
                        ? 'org'
                        : tour[0].status === '後補'
                        ? 'lightg'
                        : tour[0].status === '請洽專員'
                        ? 'lightg'
                        : 'gray'
                    }
                  >
                    {tour.length === 0
                      ? ''
                      : tour.length > 1
                      ? '看更多團'
                      : tour[0].status}
                  </span>
                  <span className={tour.length > 0 ? 'dark' : ''}>
                    {tour.length === 0
                      ? ''
                      : tour.length > 1
                      ? ''
                      : '可賣：' + tour[0].available}
                  </span>
                  <span className={tour.length > 0 ? 'dark' : ''}>
                    {tour.length === 0
                      ? ''
                      : tour.length > 1
                      ? ''
                      : '團位：' + tour[0].total}
                  </span>
                  <span className={tour.length > 0 ? 'red' : ''}>
                    {/* TODO://要抓到最低價錢 */}
                    {tour.length === 0 ? '' : '$' + tour[0].price}
                    <span className={tour.length > 0 ? 'dark' : ''}>
                      {tour.length > 1 ? '起' : ''}
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        {/* 列表模式 */}
        <div className="straightContainer d-none" ref={this.props.straightData}>
          <div
            className={
              'd-flex nodata ' +
              (this.props.Package.CurrentDataPart.length === 0 ? '' : 'd-none')
            }
          >
            <span>本月無出發行程</span>
          </div>
          <div
            className="itineraryStraightBox d-flex"
            ref={this.props.straightDataShow}
          >
            {this.props.Package.CurrentDataPart.map(function(e, index) {
              const weekday = moment(e.date, 'YYYY/MM/DD').weekday()
              return (
                <div
                  onClick={handleStraightFocus.bind(this, index)}
                  key={index + +new Date()}
                  className="itineraryStraight d-none active"
                >
                  <div className="d-flex">
                    <div className="date dark  d-flex alignCenter">
                      <span>{moment(e.date, 'YYYY/MM/DD').get('date')}</span>
                      {/* TODO:星期幾 */}
                      <span>
                        {'星期' +
                          (weekday === 0
                            ? '日'
                            : weekday === 1
                            ? '一'
                            : weekday === 2
                            ? '二'
                            : weekday === 3
                            ? '三'
                            : weekday === 4
                            ? '四'
                            : weekday === 5
                            ? '五'
                            : weekday === 6
                            ? '六'
                            : '')}
                      </span>
                    </div>
                    <div className="detail d-flex jusifyCenter">
                      <div>
                        <span className="dark">{'可賣:' + e.available}</span>
                        <span className="dark">{'團位:' + e.total}</span>
                      </div>
                      <div>
                        <span className={e.guaranteed ? 'ready' : ''}>
                          {e.guaranteed ? '成團' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="priceStatus d-flex jusifyCenter">
                      <span
                        className={
                          e.length === 0
                            ? ''
                            : e.length > 1
                            ? 'blue'
                            : e.status === '報名'
                            ? 'org'
                            : e.status === '預定'
                            ? 'org'
                            : e.status === '後補'
                            ? 'lightg'
                            : e.status === '請洽專員'
                            ? 'lightg'
                            : 'gray'
                        }
                      >
                        {e.status}
                      </span>
                      <span className="red">{'$' + e.price}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="pageArea d-flex">
            <div
              className={
                'pageBtnStraight ' +
                (this.props.Package.nowPage === 1 ? ' hide' : '')
              }
              onClick={this.props.Package.handlePrevPage}
            >
              <span className="left"></span>
              上一頁
            </div>
            <div>
              {this.props.Package.nowPage +
                '/ ' +
                this.props.Package.totalPages}
            </div>
            <div
              className={
                'pageBtnStraight ' +
                (this.props.Package.nowPage === this.props.Package.totalPages
                  ? 'hide'
                  : '')
              }
              onClick={this.props.Package.handleNextPage}
            >
              下一頁
              <span className="right"></span>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default DateContainer
