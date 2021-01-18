import moment from 'moment'
import { timeIntervals } from './constants'
import { timepicker } from './timepicker'

let isLogbookInfoShow = false
const logbookInfo = document.querySelector('.js-logbookInfo')
const closeBtnLogbookInfo = logbookInfo.querySelector('.js-closeLogbookInfo')
const LOGBOOKINFO_CLASS_SHOW = 'logbook__info--show'

const testDriveField = logbookInfo.querySelector('.js-testDrive')
const testDriveTimeFromField = logbookInfo.querySelector('.js-testDriveTimeFrom')
const testDriveTimeToField = logbookInfo.querySelector('.js-testDriveTimeTo')

const clearLogbookInfo = () => {
  testDriveField.value = ''
  testDriveTimeFromField.value = ''
  testDriveTimeToField.value = ''
}

const updateLogbookInfo = (data) => {
  console.info({ data })

  const carInfo = data.car
  const selectedDate = data.currentMomentFormatted
  const carLogbookInfo = data.logbookCar
  const departmentsList = data.departmentsList

  testDriveField.value = carInfo.UF_TEST_DRIVE

  if (!!carLogbookInfo.ID) {
    testDriveTimeFromField.value = carLogbookInfo.UF_DATE_FROM.slice(0, -3)
    testDriveTimeToField.value = carLogbookInfo.UF_DATE_TO.slice(0, -3)

    console.info(carLogbookInfo.UF_TYPE)
  } else {
    testDriveTimeFromField.value = selectedDate
  }
}

const closeLogbookInfo = (evt) => {
  evt.preventDefault()
  isLogbookInfoShow = false
  clearLogbookInfo()
  logbookInfo.classList.remove(LOGBOOKINFO_CLASS_SHOW)
  closeBtnLogbookInfo.removeEventListener('click', () => {}, false)
}

const openLogbookInfo = (evt, data) => {
  isLogbookInfoShow = true
  evt.preventDefault()
  logbookInfo.classList.add(LOGBOOKINFO_CLASS_SHOW)

  clearLogbookInfo()
  updateLogbookInfo(data)

  // logbookInfoTimepicker = []
  // logbookInfoTimepicker.push(new timepicker())
  // logbookInfoTimepicker.forEach((element) => {
  //   element.destroy()
  //   element.init()
  // })
  //
  // timeIntervals.forEach((time) => {
  //   const html = `<option class="form-select__optional" value="${time}">${time}</option>`
  //   onTimeTest.innerHTML += html
  // })
  //
  // timeIntervals.forEach((time) => {
  //   const html = `<option class="form-select__optional" value="${time}">${time}</option>`
  //   offTimeTest.innerHTML += html
  // })
  //
  // autoTest.value = evt.target.dataset.carTd
  //
  // const purposeOfTrip = document.querySelector('.js-purposeOfTrip')
  // const playground = document.querySelector('.js-playground')
  //
  // playgroundList.forEach((item) => {
  //   const html = `<option class="form-select__optional" value="${item[0]}">${item[1]}</option>`
  //
  //   playground.innerHTML += html
  // })
  //
  // const changeShroud = () => {
  //   if (purposeOfTrip.value !== 'Move') {
  //     playground.setAttribute('disabled', 'disabled')
  //   } else {
  //     playground.removeAttribute('disabled')
  //   }
  // }
  // changeShroud()
  //
  // purposeOfTrip.addEventListener('change', () => {
  //   changeShroud()
  // })
  //

  closeBtnLogbookInfo.addEventListener('click', (evt) => {
    if (isLogbookInfoShow) {
      closeLogbookInfo(evt)
    }
  })

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27 && isLogbookInfoShow) {
      closeLogbookInfo(evt)
    }
  })
}

export { openLogbookInfo }
