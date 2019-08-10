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
      //   當月整理好全部資料
      CurrentData: [],
      //   當月全部資料，未整
      CurrentDataPart: [],
      dataSource: '/data/data1.json',
      initYearMonth: 201807,
      //   預設顯示月曆還是列表
      switch: false,
    }
    // this.handleMonthContent = this.handleMonthContent.bind(this)
    // this.dataInput = React.createRef()
    // this.prevMonth = this.prevMonth.bind(this)
    this.rowData = React.createRef()
    // 整個列表資訊區塊
    this.straightData = React.createRef()
    // 個別列表資訊區塊
    this.straightDataShow = React.createRef()
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

    console.log(jsonData)
    // }

    // 存放每日日期與所有對應到行程
    const dateArray = []

    // 當前月份第幾格開始
    const monthStartWeekday = moment(init, 'YYYYMM').weekday()
    // 當月天數
    const monthDays = moment(init, 'YYYYMM').daysInMonth()
    // 當月總共所有行程，不分日期
    const nowMonthAlltour = await jsonData.filter(
      item => item.date.indexOf(moment(init, 'YYYYMM').format('YYYY/MM')) !== -1
    )
    // 深層複製一個用來列表模式排序的資料
    const cloneObj = Object.assign(jsonData)
    // console.log(nowMonthAlltour)

    // console.log(nowMonth)
    // 將當月所有行程排序--------------------------------------------------
    const AllNewObj = await cloneObj.filter(
      item => item.date.indexOf(moment(init, 'YYYYMM').format('YYYY/MM')) !== -1
    )
    AllNewObj.sort(function(a, b) {
      //   console.log(moment(a.date, 'YYYY/MM/DD').milliseconds())
      return moment(a.date, 'YYYY/MM/DD') - moment(b.date, 'YYYY/MM/DD')
    })
    // console.log(AllNewObj)

    // 產生月曆並將符合對應日子行程整合--------------------------------------
    for (let i = 0; i < 42; i++) {
      const allDateArray = moment(init, 'YYYYMM')
        //   扣掉當月開始日期回到第一格
        .add(-monthStartWeekday + i, 'days')
      // 格式化成語json檔案相同格式方便比對
      const yearDate = allDateArray.format('YYYY/MM/DD')
      //   const date = allDateArray.date()
      const match = await nowMonthAlltour.filter(
        item => item.date.indexOf(yearDate) !== -1
      )
      //   console.log(match)
      //   設定當月超出範圍不顯示資料
      let obj = {}
      if (i < monthStartWeekday) {
        console.log(i)
        obj = { calendarDate: '', matchTour: [] }
        dateArray.push(obj)
      } else if (i >= monthStartWeekday + monthDays) {
        obj = { calendarDate: '', matchTour: [] }
        dateArray.push(obj)
      } else {
        obj = { calendarDate: yearDate, matchTour: match }
        dateArray.push(obj)
      }
      //   console.log(obj)
      //   先設定日歷需產生之日期calendarDate = yearDate
      //   將比對後相同日期的物件放入整合obj中最後push入相同陣列matchTour = match

      //   tour可能會有多筆
      //   console.log(obj.matchTour[0])
    }
    await this.setState({
      // 排序資料
      CurrentDataPart: AllNewObj,
      //   原始順序資料
      CurrentData: dateArray,
      //   初始所有行程資料
      fetchData: jsonData,
    })
    // console.log(dateArray)
    console.log(this.state.CurrentDataPart)
  }

  //   列表顯示內容
  handleStraightPages = () => {
    const perPage = 8
    const nowPage = 3
    // const perPage = this.state.perPage
    // const nowPage = this.state.nowPage
    // ref allElement
    const allElement = this.straightDataShow.current.childNodes
    const max = allElement.length
    const pages = Math.ceil(allElement.length / perPage)
    // 超過最大比數自動選擇最後一頁顯示
    if (nowPage * perPage > max) {
      for (let i = (pages - 1) * perPage; i < max; i++) {
        allElement[i].classList.remove('d-none')
      }
    } else {
      for (let i = (nowPage - 1) * perPage; i < nowPage * perPage; i++) {
        allElement[i].classList.remove('d-none')
      }
    }
  }

  prevMonth = async () => {
    const init = this.state.initYearMonth
    const newyearDate = Number(
      moment(init, 'YYYYMM')
        .add(-1, 'months')
        .format('YYYYMM')
    )

    await this.setState({ initYearMonth: newyearDate })
    // // 將fetch出資料在onclick時傳入內容產生function
    await this.handleMonthContent(this.state.fetchData)
    await this.handleStraightPages()
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
    await this.handleStraightPages()
  }
  //   monthswitchLeft = async () => {
  //     // await this.setState({ currentMonth: nowMonth - 1 })
  //     // console.log(e.target)
  //     this.prevMonth()
  //   }
  //   monthswitchRight = () => {
  //     // console.log(e.target)
  //     this.nextMonth()
  //   }
  //   monthswitchMiddle = async () => {
  //     // console.log(e.target)
  //     await this.handleMonthContent(this.state.fetchData)
  //   }

  //   切換列表
  handleSwitch = () => {
    const status = this.straightData.current.classList.contains('d-none')
    console.log(status)
    if (status) {
      this.straightData.current.classList.remove('d-none')
      this.rowData.current.classList.add('d-none')
    } else {
      this.straightData.current.classList.add('d-none')
      this.rowData.current.classList.remove('d-none')
    }
    // this.setState({ switch: !this.state.switch })
    console.log('123')
  }

  render() {
    const prevMonth = moment(this.state.initYearMonth, 'YYYYMM')
      .add(-1, 'month')
      .format('YYYY  M月')
    const nowwMonth = moment(this.state.initYearMonth, 'YYYYMM').format(
      'YYYY  M月'
    )
    const nextMonth = moment(this.state.initYearMonth, 'YYYYMM')
      .add(1, 'month')
      .format('YYYY  M月')
    // const dataSource = this.state.fetchData
    const Package = {
      CurrentDataPart: this.state.CurrentDataPart,
      CurrentData: this.state.CurrentData,
      dataSource: this.state.dataSource,
      initYearMonth: this.state.initYearMonth,
      method: this.handleMonthContent,
      methodstraight: this.handleStraightPages,
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
    // console.log(Package.dataSource)
    return (
      <>
        <div className="wrapper">
          <div className="container">
            <div className="calender">
              <button onClick={this.handleSwitch}>切換</button>
              <div className="monthYears">
                <div className="list-unstyle d-flex alignCenter">
                  <div onClick={this.prevMonth}>左</div>
                  <YearMonthLeft prevMonth={prevMonth} />
                  <YearMonthMiddle nowwMonth={nowwMonth} />
                  <YearMonthRight nextMonth={nextMonth} />
                  <div onClick={this.nextMonth}>右</div>
                </div>
              </div>
              <div className="calendarMain">
                <div className="dateContent  ">
                  <DateContainer
                    Package={Package}
                    //設ref訪問子層元素，先在父層construct createRef，props下去子層再設ref接
                    straightData={this.straightData}
                    rowData={this.rowData}
                    straightDataShow={this.straightDataShow}
                  />
                  {/* <DateContainer Package={Package} ref={this.dataInput} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Mainpage
