import React from 'react'
import moment from 'moment'
import DateContainer from '../components/DateContainer'
import YearMonthLeft from '../components/YearMonthLeft'
import YearMonthMiddle from '../components/YearMonthMiddle'
import YearMonthRight from '../components/YearMonthRight'

class Mainpage extends React.Component {
  constructor() {
    super()
    this.state = {
      fetchData: [],
      CurrentData: [],
      dataSource: '/data/data1.json',
      initYearMonth: 201705,
      //   currentYear: 2017,
      //   currentMonth: 9, //month index 0~11
      //   //   currentYear: moment().year(),
      //   //   currentMonth: moment().month() + 1, //month index 0~11
    }
    // this.handleMonthContent = this.handleMonthContent.bind(this)
    // this.dataInput = React.createRef()
    // this.prevMonth = this.prevMonth.bind(this)
  }

  async componentDidMount() {
    // try {
    //   const response = await fetch('/data/data1.json')
    //   const jsonObject = await response.json()
    //   //   設state方便提用傳入內容產生function
    //   await this.setState({ fetchData: jsonObject })
    //   //   console.log(jsonObject)
    //   await this.handleMonthContent(jsonObject)
    // } catch (e) {
    //   console.log(e)
    // }
  }
  handleMonthContent = async jsonData => {
    // YYYYMM大小寫影響抓到傳入的日期或現在日期,大寫抓傳入
    const init = this.state.initYearMonth
    // let nowMonth = moment(init, 'YYYYMM').get('month')
    // let nowYear = moment(init, 'YYYYMM').get('year')
    // const newyearDate = Number(
    //   moment(init, 'YYYYMM')
    //     // .add(1, 'months')
    //     .format('YYYYMM')
    // )
    // console.log(nowMonth)
    // console.log(nowYear)
    // if (nowMonth < 1) {
    //   nowMonth = 12
    //   nowYear = nowYear - 1
    //   console.log(nowYear)
    //   console.log(nowMonth)
    // }
    // if (nowMonth > 12) {
    //   nowMonth = 1
    //   nowYear = nowYear + 1
    //   console.log(nowYear)
    console.log(jsonData)
    // }

    // 存放每日日期與所有對應到行程
    const dateArray = []
    // 當前月份第幾格開始
    const monthStartWeekday = moment(init, 'YYYYMM').weekday()

    console.log(monthStartWeekday)
    // console.log(nowMonth)

    for (let i = 0; i < 42; i++) {
      //   const obj = {}
      const allDateArray = moment(init, 'YYYYMM')
        //   扣掉當月開始日期回到第一格
        .add(-monthStartWeekday + i, 'days')
      // 格式化成語json檔案相同格式方便比對
      const yearDate = allDateArray.format('YYYY/MM/DD')
      //   const date = allDateArray.date()
      const match = await jsonData.filter(
        item => item.date.indexOf(yearDate) !== -1
      )
      //   console.log(allDateArray)

      let obj = { calendarDate: yearDate, matchTour: match }
      //   console.log(obj)
      //   先設定日歷需產生之日期calendarDate = yearDate
      //   將比對後相同日期的物件放入整合obj中最後push入相同陣列matchTour = match

      //   tour可能會有多筆
      //   console.log(obj.matchTour[0])
      dateArray.push(obj)
    }
    await this.setState({
      CurrentData: dateArray,
      fetchData: jsonData,
    })
    // console.log(dateArray)
    console.log(this.state.initYearMonth)
  }

  prevMonth = async jsonData => {
    const init = this.state.initYearMonth
    const newyearDate = Number(
      moment(init, 'YYYYMM')
        .add(-1, 'months')
        .format('YYYYMM')
    )
    // console.log(this.dataInput.current.props.Package.CurrentData)
    // const newdata = this.dataInput.current.props.Package.CurrentData
    // console.log(jsonData)
    // const nowMonth = this.state.currentMonth
    await this.setState({ initYearMonth: newyearDate })
    // console.log(this.state.initYearMonth)
    // // 將fetch出資料在onclick時傳入內容產生function
    await this.handleMonthContent(this.state.fetchData)
  }
  nextMonth = async () => {
    const init = this.state.initYearMonth
    const newyearDate = Number(
      moment(init, 'YYYYMM')
        .add(1, 'months')
        .format('YYYYMM')
    )
    await this.setState({ initYearMonth: newyearDate })
    await this.handleMonthContent(this.state.fetchData)
  }
  monthswitchLeft = async () => {
    // await this.setState({ currentMonth: nowMonth - 1 })
    // console.log(e.target)
    this.prevMonth()
  }
  monthswitchRight = () => {
    // console.log(e.target)
    this.nextMonth()
  }
  monthswitchMiddle = async () => {
    // console.log(e.target)
    await this.handleMonthContent(this.state.fetchData)
  }

  render() {
    const prevMonth = moment(this.state.initYearMonth, 'YYYYMM')
      .add(-1, 'month')
      .format('YYYYMM 月')
    const nowwMonth = moment(this.state.initYearMonth, 'YYYYMM').format(
      'YYYYMM 月'
    )
    const nextMonth = moment(this.state.initYearMonth, 'YYYYMM')
      .add(1, 'month')
      .format('YYYYMM 月')
    // const dataSource = this.state.fetchData
    const Package = {
      CurrentData: this.state.CurrentData,
      dataSource: this.state.dataSource,
      initYearMonth: this.state.initYearMonth,
      method: this.handleMonthContent,
      dataKeySetting: {
        // 保證出團
        guaranteed: 'guaranteed',
        // 狀態
        status: 'status',
        // 可賣團位
        available: 'availableVancancy',
        // 團位
        total: 'totalVacnacy',
        // 價格
        price: 'price',
      },
    }
    console.log(Package.dataSource)
    return (
      <>
        <button>切換</button>
        <button onClick={this.prevMonth}>左</button>
        <button onClick={this.nextMonth}>右</button>
        <div className="wrapper">
          <div className="calender">
            <div className="monthYears">
              <div className="list-unstyle d-flex alignCenter">
                <YearMonthLeft prevMonth={prevMonth} />
                <YearMonthMiddle nowwMonth={nowwMonth} />
                <YearMonthRight nextMonth={nextMonth} />
              </div>
            </div>
            <div className="calendarMain">
              <div className="weekday list-unstyle d-flex jusifyCenter alignCenter">
                <div>星期日</div>
                <div>星期一</div>
                <div>星期二</div>
                <div>星期三</div>
                <div>星期四</div>
                <div>星期五</div>
                <div>星期六</div>
              </div>
              <div className="dateContent d-flex ">
                <DateContainer Package={Package} />
                {/* <DateContainer Package={Package} ref={this.dataInput} /> */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Mainpage
