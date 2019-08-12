import React from 'react'
import moment from 'moment'
import DateContainer from '../components/DateContainer'
import MonthTab from '../components/MonthTab'

class Mainpage extends React.Component {
  constructor() {
    super()
    this.state = {
      fetchData: [],
      // 上月資料
      prevData: [],
      // 下月資料
      nextData: [],
      //   當月整理好全部資料
      CurrentData: [],
      //   當月全部資料，未整
      CurrentDataPart: [],
      dataSource: '/data/data1try.json',
      initYearMonth: 201708,
      //   預設顯示月曆還是列表
      switch: false,
      perPage: 8,
      nowPage: 3,
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
    // this.prevMonth()
  }

  handleNextWithData = async () => {
    const stateYear = this.state.initYearMonth
    // 最近之後有資料距離月數
    const month = this.nextDataSearch()[0]
    await this.setState({
      initYearMonth: moment(stateYear, 'YYYYMM')
        .add(month, 'months')
        .format('YYYY/MM'),
    })
    await this.handleMonthContent(this.state.fetchData)
    await this.handleStraightPages()
  }
  handlePrevWithData = async () => {
    const stateYear = this.state.initYearMonth
    // 最近之後有資料距離月數
    const month = this.prevDataSearch()[0]
    await this.setState({
      initYearMonth: moment(stateYear, 'YYYYMM')
        .add(-month, 'months')
        .format('YYYY/MM'),
    })
    await this.handleMonthContent(this.state.fetchData)
    await this.handleStraightPages()
  }

  // 往後找空資料
  nextDataSearch = () => {
    const stateYear = this.state.initYearMonth
    const fetchData = this.state.fetchData
    for (let m = 1; m < 24; m++) {
      const next = fetchData.filter(
        item =>
          item.date.indexOf(
            moment(stateYear, 'YYYYMM')
              .add(m, 'months')
              .format('YYYY/MM')
          ) !== -1
      )
      if (next.length !== 0) {
        console.log(next)
        return [m, next.length]
      }
    }
    // 如果往後沒有任何資料就回傳0不再增加月數切換月曆
    return [0, 0]
  }
  // 往前找空資料F
  prevDataSearch = () => {
    const stateYear = this.state.initYearMonth
    const fetchData = this.state.fetchData
    console.log(fetchData)
    for (let n = 1; n < 24; n++) {
      const prev = fetchData.filter(
        item =>
          item.date.indexOf(
            moment(stateYear, 'YYYYMM')
              .add(-n, 'months')
              .format('YYYY/MM')
          ) !== -1
      )
      if (prev.length !== 0) {
        return [n, prev.length]
      }
    }
    // 如果往前沒有任何資料就回傳0不再減少月數切換月曆
    return [0, 0]
  }

  // 判斷當月是否沒資料
  handleDataSearch = async () => {
    const stateYear = this.state.initYearMonth
    const CurrentDataPart = this.state.CurrentDataPart
    // console.log(CurrentDataPart)
    if (CurrentDataPart.length === 0) {
      // 往後資料
      let m = this.nextDataSearch()[0] //資料距離
      let nextLength = this.nextDataSearch()[1] //資料數量
      // console.log(this.nextDataSearch())
      // 往前資料
      let n = this.prevDataSearch()[0] //資料距離
      let prevlength = this.prevDataSearch()[1] //資料數量

      if (m > n) {
        this.setState({
          initYearMonth: moment(stateYear, 'YYYYMM')
            .add(-n, 'months')
            .format('YYYY/MM'),
        })
      } else if (m < n) {
        this.setState({
          initYearMonth: moment(stateYear, 'YYYYMM')
            .add(m, 'months')
            .format('YYYY/MM'),
        })
      } else if ((m = n)) {
        // 如果兩筆最近資料距離相同，則判斷哪邊的資料數最多，
        // 如果資料數也相等，預設抓上個月
        if (nextLength > prevlength) {
          this.setState({
            initYearMonth: moment(stateYear, 'YYYYMM')
              .add(m, 'months')
              .format('YYYY/MM'),
          })
        } else {
          this.setState({
            initYearMonth: moment(stateYear, 'YYYYMM')
              .add(-n, 'months')
              .format('YYYY/MM'),
          })
        }
      }
      // console.log(this.state.initYearMonth)
      await this.handleMonthContent(this.state.fetchData)
      await this.handleStraightPages()
    }
  }

  handleMonthContent = async jsonData => {
    // YYYYMM大小寫影響抓到傳入的日期或現在日期,大寫抓傳入
    const init = this.state.initYearMonth

    // console.log(jsonData)
    // }

    // 存放每日日期與所有對應到行程
    const dateArray = []

    // 當前月份第幾格開始
    const monthStartWeekday = moment(init, 'YYYYMM').weekday()
    // 當月天數
    const monthDays = moment(init, 'YYYYMM').daysInMonth()

    // 上個月所有資料
    const PrevMonthAlltour = await jsonData.filter(
      item =>
        item.date.indexOf(
          moment(init, 'YYYYMM')
            .add(-1, 'months')
            .format('YYYY/MM')
        ) !== -1
    )
    // console.log(PrevMonthAlltour)
    // 下個月所有資料
    const NextMonthAlltour = await jsonData.filter(
      item =>
        item.date.indexOf(
          moment(init, 'YYYYMM')
            .add(1, 'months')
            .format('YYYY/MM')
        ) !== -1
    )
    // console.log(NextMonthAlltour)

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
        // console.log(i)
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
      prevData: PrevMonthAlltour,
      nextData: NextMonthAlltour,
    })
    // console.log(dateArray)
    // console.log(this.state.CurrentDataPart)
  }

  prevMonth = async () => {
    const prevDataCheck = this.prevDataSearch()[0]
    // console.log(prevDataCheck)
    const init = this.state.initYearMonth
    if (prevDataCheck !== 0) {
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
  }
  nextMonth = async () => {
    const nextDataCheck = this.nextDataSearch()[0]
    const init = this.state.initYearMonth
    if (nextDataCheck !== 0) {
      const newyearDate = Number(
        moment(init, 'YYYYMM')
          .add(1, 'months')
          .format('YYYYMM')
      )
      await this.setState({ initYearMonth: newyearDate })
      await this.handleMonthContent(this.state.fetchData)
      await this.handleStraightPages()
    }
  }
  monthswitchLeft = async () => {
    this.prevMonth()
  }
  monthswitchRight = () => {
    this.nextMonth()
  }
  //   monthswitchMiddle = async () => {
  //     // console.log(e.target)
  //     this.nextMonth()
  //   }

  //   列表顯示內容
  handleStraightPages = (x, y) => {
    // const perPage = x
    // const nowPage = y
    const perPage = this.state.perPage
    const nowPage = this.state.nowPage
    // ref allElement
    const allElement = this.straightDataShow.current.childNodes
    const max = allElement.length
    const pages = Math.ceil(allElement.length / perPage)
    // 超過最大比數自動選擇最後一頁顯示
    if (max > 0) {
      if (nowPage * perPage > max) {
        this.setState({ nowPage: pages })
        for (let i = (pages - 1) * perPage; i < max; i++) {
          allElement[i].classList.remove('d-none')
        }
      } else {
        for (let i = (nowPage - 1) * perPage; i < nowPage * perPage; i++) {
          allElement[i].classList.remove('d-none')
        }
      }
    } else {
      // 沒資料顯示第一頁
      this.setState({ nowPage: 1 })
    }
  }

  // TODO:改掉切換顯示內容渲染的頁面
  handlePrevPage = async () => {
    const perPage = this.state.perPage
    const nowPage = this.state.nowPage
    console.log(nowPage)
    if (nowPage > 1) {
      await this.setState({ nowPage: nowPage - 1 })
      await this.handleMonthContent(this.state.fetchData)
      await this.handleStraightPages(perPage, nowPage)
    }
  }
  // TODO:改掉切換顯示內容渲染的頁面
  handleNextPage = async () => {
    const perPage = this.state.perPage
    const nowPage = this.state.nowPage
    const allElement = this.straightDataShow.current.childNodes
    const pages = Math.ceil(allElement.length / perPage)
    console.log(nowPage)
    if (nowPage < pages) {
      await this.setState({ nowPage: nowPage + 1 })
      await this.handleMonthContent(this.state.fetchData)
      await this.handleStraightPages(perPage, nowPage)
    }
  }

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
    const MonthTabPack = {
      monthswitchLeft: this.monthswitchLeft,
      monthswitchRight: this.monthswitchRight,
      initYearMonth: this.state.initYearMonth,
      CurrentDataPart: this.state.CurrentDataPart,
      prevDataLength: this.state.prevData.length,
      nextDataLength: this.state.nextData.length,
    }

    // 計算總頁數
    const perPage = this.state.perPage
    const allElement = this.state.CurrentDataPart
    const pages = Math.ceil(allElement.length / perPage)
    const Package = {
      CurrentDataPart: this.state.CurrentDataPart,
      CurrentData: this.state.CurrentData,
      method: this.handleMonthContent,
      methodstraight: this.handleStraightPages,
      handlePrevPage: this.handlePrevPage,
      handleNextPage: this.handleNextPage,
      dataSearch: this.handleDataSearch,
      nowPage: this.state.nowPage,
      perPage: this.state.perPage,
      //   如果沒有資料顯示第1頁
      totalPages: pages === 0 ? '1' : pages,

      dataSource: this.state.dataSource,
      initYearMonth: this.state.initYearMonth,
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
          <div className="switchBtn d-flex">
            <button onClick={this.handleSwitch}>切換列表顯示</button>
            <button onClick={this.handlePrevWithData}>往前找有資料</button>
            <button onClick={this.handleNextWithData}>往後找有資料</button>
          </div>
          <div className="container">
            <div className="calender">
              <div className="monthYears d-flex alignCenter">
                <div className="pageBtn prev" onClick={this.prevMonth}></div>
                <div className="monthTab d-flex">
                  <MonthTab className="" MonthTabPack={MonthTabPack} />
                </div>
                <div className="pageBtn next" onClick={this.nextMonth}></div>
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
