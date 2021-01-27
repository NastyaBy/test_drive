import moment from 'moment'
import { initRangeDatePicker } from './datepicker'
import { saveLogbookInfo } from './server'

let isLogbookInfoShow = false
const logbookInfo = document.querySelector('.js-logbookInfo')
const sendBtnLogbookInfo = logbookInfo.querySelector('.js-sendLogbookInfo')
const closeBtnLogbookInfo = logbookInfo.querySelector('.js-closeLogbookInfo')
const LOGBOOKINFO_CLASS_SHOW = 'logbook__info--show'
const TIMEPICKER_CLASS_OPEN = 'fieldset__dropdown--show'
const TIMEPICKER_BLACKOUT_CLASS_OPEN = 'fieldset__blackout--show'

const testDriveField = logbookInfo.querySelector('.js-testDrive')

const testDriveTimeFromField = logbookInfo.querySelector('.js-testDriveTimeFrom')
const testDriveTimeToField = logbookInfo.querySelector('.js-testDriveTimeTo')
const testDriveStatus = logbookInfo.querySelector('.js-testDriveStatus')
const testDriveType = logbookInfo.querySelector('.js-testDriveType')

const testDriveTimeSelectFrom = logbookInfo.querySelector('.js-testDriveTimeSelectFrom')
const testDriveTimeDateFrom = logbookInfo.querySelector('.js-testDriveTimeDateFrom')
let testDriveTimeDateFromCalendar = null

const testDriveTimeSelectTo = logbookInfo.querySelector('.js-testDriveTimeSelectTo')
const testDriveTimeDateTo = logbookInfo.querySelector('.js-testDriveTimeDateTo')
let testDriveTimeDateToCalendar = null

const testDriveIdentityDatePicker = logbookInfo.querySelector('.js-testDriveIdentityDatePicker')
let testDriveIdentityDatePickerCalendar = null

const testDrivePurposeOfTripSelect = document.querySelector('.js-purposeOfTrip')
const testDrivePlaygroundSelect = document.querySelector('.js-playground')

const listenerClickInputTimePicker = (event) => {
  const input = event.target
  const dropdown = input.nextElementSibling
  const blackoutTimepicker = dropdown.nextElementSibling
  dropdown.classList.toggle(TIMEPICKER_CLASS_OPEN)
  blackoutTimepicker.classList.toggle(TIMEPICKER_BLACKOUT_CLASS_OPEN)
}
const listenerClickBlackoutTimePicker = (event) => {
  const blackoutTimepicker = event.target
  const dropdown = blackoutTimepicker.previousElementSibling
  dropdown.classList.toggle(TIMEPICKER_CLASS_OPEN)
  blackoutTimepicker.classList.toggle(TIMEPICKER_BLACKOUT_CLASS_OPEN)
}

const initTimePicker = (input) => {
  const dropdown = input.nextElementSibling
  const blackoutTimePicker = dropdown.nextElementSibling
  const timeSelect = dropdown.querySelector('.js-testDriveTimeSelect')
  const dateInput = dropdown.querySelector('.js-testDriveDateInput')
  const time = moment(input.value, 'DD.MM.YYYY HH:mm').format('HH:mm')
  const date = moment(input.value, 'DD.MM.YYYY HH:mm').format('DD.MM.YYYY')

  const changeTimePicker = (element, time, date) => {
    element.value = `${date} ${time}`
    reloadCalendarOptions(input)
  }

  const reloadCalendarOptions = (input) => {
    const dateFrom = moment(testDriveTimeFromField.value, 'DD.MM.YYYY HH:mm').format('DD.MM.YYYY')
    const dateTo = moment(testDriveTimeToField.value, 'DD.MM.YYYY HH:mm').format('DD.MM.YYYY')

    if (input === testDriveTimeFromField) {
      if (!!testDriveTimeDateFromCalendar) {
        testDriveTimeDateFromCalendar.reloadOptions({
          onSelect: function (date) {
            changeTimePicker(input, timeSelect.value, date.format('DD.MM.YYYY'))
          },
        })

        if (dateFrom === dateTo) {
          console.info('-')
        }
      }
      // var op = document.getElementById("foo").getElementsByTagName("option");
      // for (var i = 0; i < op.length; i++) {
      //   // lowercase comparison for case-insensitivity
      //   (op[i].value.toLowerCase() == "stackoverflow")
      //       ? op[i].disabled = true
      //       : op[i].disabled = false ;
      // }
    } else if (input === testDriveTimeToField) {
      if (!!testDriveTimeDateToCalendar) {
        testDriveTimeDateToCalendar.reloadOptions({
          minDate: moment(testDriveTimeFromField.value, 'DD.MM.YYYY'),
          onSelect: function (date) {
            changeTimePicker(input, timeSelect.value, date.format('DD.MM.YYYY'))
          },
        })
      }
    }
  }

  const setTimePickerValue = () => {
    timeSelect.value = time
    dateInput.value = date
  }

  setTimePickerValue(input)
  reloadCalendarOptions(input)

  input.addEventListener('click', listenerClickInputTimePicker, false)
  timeSelect.addEventListener('change', (evt) => {
    changeTimePicker(input, timeSelect.value, dateInput.value ? dateInput.value : moment().format('DD.MM.YYYY'))
  })
  blackoutTimePicker.addEventListener('click', listenerClickBlackoutTimePicker, false)
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      if (dropdown.classList.contains(TIMEPICKER_CLASS_OPEN)) {
        evt.preventDefault()
        dropdown.classList.remove(TIMEPICKER_CLASS_OPEN)
        blackoutTimePicker.classList.remove(TIMEPICKER_BLACKOUT_CLASS_OPEN)
      }
    }
  })
}

const clearLogbookInfo = () => {
  testDriveField.value = ''
  testDriveTimeFromField.value = ''
  testDriveTimeToField.value = ''
  testDriveIdentityDatePicker.value = ''
  if (!!testDriveIdentityDatePickerCalendar) testDriveIdentityDatePickerCalendar.destroy()
  if (!!testDriveTimeDateFromCalendar) testDriveTimeDateFromCalendar.destroy()
  if (!!testDriveTimeDateToCalendar) testDriveTimeDateToCalendar.destroy()
}

let emptyLogbookInfo = false

const updateLogbookInfo = (data) => {
  const carInfo = data.car
  const selectedDate = data.currentMomentFormatted
  const carLogbookInfo = data.lastLogbookCar
  const departmentsList = data.departmentsList

  testDriveField.value = carInfo.UF_TEST_DRIVE
  testDriveStatus.value = 'Записан'
  testDriveType.value = 'Тест-драйв'

  if (!!carLogbookInfo && !!carLogbookInfo.ID) {
    emptyLogbookInfo = false
    testDriveTimeFromField.value = carLogbookInfo.UF_DATE_FROM.slice(0, -3)
    testDriveTimeToField.value = carLogbookInfo.UF_DATE_TO.slice(0, -3)

    switch (carLogbookInfo.UF_STATUS) {
      case 'Пройден':
        testDriveStatus.value = 'Пройден'
        break
      case 'Отменён':
        testDriveStatus.value = 'Отменён'
        break
      case 'Запланирован':
        testDriveStatus.value = 'Записан'
        break
      case 'Просрочен':
        testDriveStatus.value = 'Просрочен'
        break
      default:
        testDriveStatus.value = 'Записан'
    }

    switch (carLogbookInfo.UF_TYPE) {
      case 'Тест-драйв':
        testDriveType.value = 'Тест-драйв'
        break
      case 'Длительный тест-драйв':
        testDriveType.value = 'Длительный тест-драйв'
        break
      case 'Служебный':
        testDriveType.value = 'Служебная'
        break
      case 'Перемещение':
        testDriveType.value = 'Перемещение'
        break
      default:
        testDriveType.value = 'Тест-драйв'
    }
  } else {
    testDriveTimeFromField.value = selectedDate
    testDriveTimeToField.value = moment(selectedDate, 'DD.MM.YYYY HH:mm').add(30, 'minutes').format('DD.MM.YYYY HH:mm')
    if (data.emptyLogbookCar) emptyLogbookInfo = true
  }

  testDriveTimeDateFromCalendar = new initRangeDatePicker(testDriveTimeDateFrom)
  initTimePicker(testDriveTimeFromField)

  testDriveTimeDateToCalendar = new initRangeDatePicker(testDriveTimeDateTo)
  initTimePicker(testDriveTimeToField)

  testDriveIdentityDatePickerCalendar = new initRangeDatePicker(testDriveIdentityDatePicker)

  departmentsList.forEach((item) => {
    testDrivePlaygroundSelect.innerHTML += `<option class="form-select__optional" value="${item[0]}">${item[1]}</option>`
  })

  testDrivePlaygroundSelect.value = carInfo.UF_DEPARTMENT

  const changeShroud = () => {
    if (testDrivePurposeOfTripSelect.value !== 'Перемещение') {
      testDrivePlaygroundSelect.setAttribute('disabled', 'disabled')
    } else {
      testDrivePlaygroundSelect.removeAttribute('disabled')
    }
  }
  changeShroud()

  testDrivePurposeOfTripSelect.addEventListener('change', () => {
    changeShroud()
  })
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
}

sendBtnLogbookInfo.addEventListener('click', (evt) => {
  evt.preventDefault()
  sendForm()
})

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

const sendForm = () => {
  const form = logbookInfo.querySelector('.js-logbookForm')

  const data = {
    UF_TEST_DRIVE: '',
    UF_CLIENT_NAME: '',
    UF_CLIENT_PHONE: '',
    UF_DATE_FROM: '',
    UF_DATE_TO: '',
    UF_TYPE: '',
    UF_DEPARTMENT: '',
    UF_RUN_BEFORE: '',
    UF_RUN_AFTER: '',
    UF_COMMENTARY: '',
    UF_BY_NUMBER: '',
    UF_DATE_GIVE: '',
    UF_STATUS: '',
    UF_ASSIGNED: '',
  }

  form.classList.add(`form--loading`)
  saveLogbookInfo(data, emptyLogbookInfo)
    .then((response) => {
      console.info(response)
    })
    .catch((error) => {
      console.info('error: ' + error)
    })
    .finally(() => {
      form.classList.remove(`form--loading`)
    })
}

export { openLogbookInfo }
