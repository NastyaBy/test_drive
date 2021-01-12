import { timeIntervals } from './constants'
import { timepicker } from './timepicker'
import { getDepartmentCarsList } from './server'
import { initRangeDatePicker } from './datepicker'

const logbookInfo = document.querySelector('.js-logbookInfo')
const closeLogbookInfo = logbookInfo.querySelector('.js-closeLogbookInfo')
const LOGBOOKINFO_CLASS_SHOW = 'logbook__info--show'

const autoTest = logbookInfo.querySelector('.js-autoTest')
const onTimeTest = logbookInfo.querySelector('.js-timeOn')
const offTimeTest = logbookInfo.querySelector('.js-timeOff')

let logbookInfoTimepicker

export function openLogbookInfo(evt) {
  console.log(evt.target.dataset.carId)
  console.log(evt.target.dataset.carTime)
  console.log(evt.target.dataset.carTd)
  console.log(evt.target.dataset.carStatus)

  logbookInfo.classList.add(LOGBOOKINFO_CLASS_SHOW)

  logbookInfoTimepicker = []
  logbookInfoTimepicker.push(new timepicker())
  logbookInfoTimepicker.forEach((element) => {
    element.destroy()
    element.init()
  })

  timeIntervals.forEach((time) => {
    const html = `<option class="form-select__optional" value="${time}">${time}</option>`

    onTimeTest.innerHTML += html
  })

  timeIntervals.forEach((time) => {
    const html = `<option class="form-select__optional" value="${time}">${time}</option>`

    offTimeTest.innerHTML += html
  })

  autoTest.value = evt.target.dataset.carTd
  // onTimeTest.value = evt.target.dataset.catTime

  const purposeOfTrip = document.querySelector('.js-purposeOfTrip')
  const playground = document.querySelector('.js-playground')
  const renderPlayground = document.querySelector('.js-renderPlayground')

  const playgroundList = getDepartmentCarsList().Departments

  playgroundList.forEach((playground) => {
    const html = `<option class="form-select__optional" value="${playground[0]}">${playground[1]}</option>`

    renderPlayground.innerHTML += html
  })

  const changeShroud = () => {
    if (purposeOfTrip.value !== 'Move') {
      playground.setAttribute('disabled', 'disabled')
    } else {
      playground.removeAttribute('disabled')
    }
  }
  changeShroud()

  purposeOfTrip.addEventListener('change', () => {
    changeShroud()
  })

  closeLogbookInfo.addEventListener('click', () => {
    logbookInfoTimepicker.forEach((element) => {
      element.destroy()
    })
    logbookInfoTimepicker = []
    logbookInfo.classList.remove(LOGBOOKINFO_CLASS_SHOW)
  })

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      console.info(logbookInfo.classList.value)

      if (logbookInfo.classList.contains(LOGBOOKINFO_CLASS_SHOW)) {
        console.info(logbookInfo.classList.value)
        evt.preventDefault()

        logbookInfoTimepicker.forEach((element) => {
          element.destroy()
        })
        logbookInfoTimepicker = []
        logbookInfo.classList.remove(LOGBOOKINFO_CLASS_SHOW)
      }
    }
  })
}
