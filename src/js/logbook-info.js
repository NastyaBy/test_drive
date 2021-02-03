import moment from 'moment'
import { initRangeDatePicker, selectedGeneralDate } from './datepicker'
import { getDepartmentCarsList, getLogbookCarsList, saveLogbookInfo, getLogbookInfo, getLogbookPeople } from './server'
import { initTable } from './table'

let isLogbookInfoShow = false
const logbookInfo = document.querySelector('.js-logbookInfo')
const sendBtnLogbookInfo = logbookInfo.querySelector('.js-sendLogbookInfo')
const closeBtnLogbookInfo = logbookInfo.querySelector('.js-closeLogbookInfo')
const LOGBOOKINFO_CLASS_SHOW = 'logbook__info--show'
const TIMEPICKER_CLASS_OPEN = 'fieldset__dropdown--show'
const TIMEPICKER_BLACKOUT_CLASS_OPEN = 'fieldset__blackout--show'

const urlParams = new URLSearchParams(window.location.search)
const dealId = urlParams.get('deal_id')

const form = logbookInfo.querySelector('.js-logbookForm')

const testDriveField = logbookInfo.querySelector('.js-testDrive')
const testDriveTimeFromField = logbookInfo.querySelector('.js-testDriveTimeFrom')
const testDriveTimeToField = logbookInfo.querySelector('.js-testDriveTimeTo')
const testDriveStatus = logbookInfo.querySelector('.js-testDriveStatus')
const testDriveType = logbookInfo.querySelector('.js-testDriveType')
const testDriveClientName = logbookInfo.querySelector('.js-testDriveClientName')
const testDriveClientPhone = logbookInfo.querySelector('.js-testDriveClientPhone')
const testDriveRunBefore = logbookInfo.querySelector('.js-testDriveRunBefore')
const testDriveRunAfter = logbookInfo.querySelector('.js-testDriveRunAfter')
const testDriveCommentary = logbookInfo.querySelector('.js-testDriveCommentary')
const testDriveByNumber = logbookInfo.querySelector('.js-testDriveByNumber')
const testDriveAssigned = logbookInfo.querySelector('.js-testDriveAssigned')
const testDriveCarId = logbookInfo.querySelector('.js-testDriveCarId')
const testDriveId = logbookInfo.querySelector('.js-testDriveId')

const testDriveAssignedId = logbookInfo.querySelector('.js-testDriveAssignedId')
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
  testDriveAssignedId.value = ''
  testDriveField.value = ''
  testDriveTimeFromField.value = ''
  testDriveTimeToField.value = ''
  testDriveType.value = ''
  testDriveIdentityDatePicker.value = ''
  testDriveCarId.value = ''
  testDriveClientName.value = ''
  testDriveClientPhone.value = ''
  testDriveCommentary.value = ''
  testDrivePlaygroundSelect.value = ''
  testDriveRunBefore.value = ''
  testDriveRunAfter.value = ''
  testDriveByNumber.value = ''
  testDriveStatus.value = ''
  testDriveAssigned.value = ''
  testDriveId.value = ''

  if (!!testDriveIdentityDatePickerCalendar) testDriveIdentityDatePickerCalendar.destroy()
  if (!!testDriveTimeDateFromCalendar) testDriveTimeDateFromCalendar.destroy()
  if (!!testDriveTimeDateToCalendar) testDriveTimeDateToCalendar.destroy()
}

const initLogbookInfoLogic = (departmentsList) => {
  testDriveTimeDateFromCalendar = new initRangeDatePicker(testDriveTimeDateFrom)
  initTimePicker(testDriveTimeFromField)

  testDriveTimeDateToCalendar = new initRangeDatePicker(testDriveTimeDateTo)
  initTimePicker(testDriveTimeToField)

  testDriveIdentityDatePickerCalendar = new initRangeDatePicker(testDriveIdentityDatePicker)

  departmentsList.forEach((item) => {
    testDrivePlaygroundSelect.innerHTML += `<option class="form-select__optional" value="${item[0]}">${item[1]}</option>`
  })

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

let emptyLogbookInfo = false

const updateLogbookInfo = (data) => {
  form.classList.add(`form--loading`)

  const carInfo = data.car
  const selectedDate = data.currentMomentFormatted
  const carLogbookInfo = data.lastLogbookCar
  const departmentsList = data.departmentsList

  testDriveField.value = carInfo.UF_TEST_DRIVE
  testDriveCarId.value = carInfo.ID

  // получаем данные клиента и пользователя
  let currentPeople = []

  getLogbookPeople(dealId)
    .then((data) => {
      currentPeople = data
    })
    .catch(() => {
      currentPeople = null
    })
    .finally(() => {
      if (!!currentPeople) {
        testDriveClientName.value = currentPeople[0].FULL_NAME
        testDriveClientPhone.value = currentPeople[0].PHONE
        testDriveAssigned.value = currentPeople[1].FULL_NAME
        testDriveAssignedId.value = currentPeople[1].ID
      }
    })

  //проверяем на заполнотость logbookInfo

  if (!!carLogbookInfo && !!carLogbookInfo.ID) {
    const recordId = data.lastLogbookCar.ID
    let currentLogbookData = {}

    getLogbookInfo(recordId)
      .then((data) => {
        currentLogbookData = data
      })
      .catch(() => {
        currentLogbookData = null
      })
      .finally(() => {
        if (!!currentLogbookData) {
          testDriveId.value = currentLogbookData.ID
          testDriveAssignedId.value = currentLogbookData.UF_ASSIGNED
          emptyLogbookInfo = false
          testDriveCarId.value = currentLogbookData.UF_CAR_ID
          testDriveClientName.value = currentLogbookData.UF_CLIENT_NAME
          testDriveClientPhone.value = currentLogbookData.UF_CLIENT_PHONE
          testDriveTimeFromField.value = currentLogbookData.UF_DATE_FROM.slice(0, -3)
          testDriveTimeToField.value = currentLogbookData.UF_DATE_TO.slice(0, -3)
          testDriveType.value = currentLogbookData.UF_TYPE
          testDriveRunBefore.value = currentLogbookData.UF_RUN_BEFORE
          testDriveRunAfter.value = currentLogbookData.UF_RUN_AFTER
          testDriveCommentary.value = currentLogbookData.UF_COMMENTARY
          testDriveByNumber.value = currentLogbookData.UF_BY_NUMBER
          testDriveIdentityDatePicker.value = currentLogbookData.UF_DATE_GIVE
          testDriveStatus.value = currentLogbookData.UF_STATUS
          testDriveAssigned.value = currentLogbookData.UF_ASSIGNED_NAME

          switch (currentLogbookData.UF_STATUS) {
            case 'Пройден':
              testDriveStatus.value = 'Пройден'
              break
            case 'Отменен':
              testDriveStatus.value = 'Отменен'
              break
            case 'Запланирован':
              testDriveStatus.value = 'Запланирован'
              break
            case 'Просрочен':
              testDriveStatus.value = 'Просрочен'
              break
            default:
              testDriveStatus.value = 'Запланирован'
          }

          switch (currentLogbookData.UF_TYPE) {
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
          initLogbookInfoLogic(departmentsList)

          testDrivePlaygroundSelect.value = carLogbookInfo.UF_DEPARTMENT
          form.classList.remove(`form--loading`)
        }
      })
  } else if (data.emptyLogbookCar) {
    emptyLogbookInfo = true
    testDriveStatus.value = 'Запланирован'
    testDriveType.value = 'Тест-драйв'
    testDriveTimeFromField.value = selectedDate
    testDriveTimeToField.value = moment(selectedDate, 'DD.MM.YYYY HH:mm').add(30, 'minutes').format('DD.MM.YYYY HH:mm')
    initLogbookInfoLogic(departmentsList)
    testDrivePlaygroundSelect.value = carInfo.UF_DEPARTMENT[0].toString()
    form.classList.remove(`form--loading`)
  }
}

const closeLogbookInfo = (evt) => {
  if (!!evt) evt.preventDefault()
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
  const data = {
    UF_DEAL_ID: dealId,
    UF_ASSIGNED_NAME: testDriveAssigned.value,
    UF_CAR_ID: testDriveCarId.value,
    UF_TEST_DRIVE: testDriveField.value,
    UF_CLIENT_NAME: testDriveClientName.value,
    UF_CLIENT_PHONE: testDriveClientPhone.value,
    UF_DATE_FROM: testDriveTimeFromField.value,
    UF_DATE_TO: testDriveTimeToField.value,
    UF_TYPE: testDriveType.value,
    UF_DEPARTMENT: testDrivePlaygroundSelect.value,
    UF_RUN_BEFORE: testDriveRunBefore.value,
    UF_RUN_AFTER: testDriveRunAfter.value,
    UF_COMMENTARY: testDriveCommentary.value,
    UF_BY_NUMBER: testDriveByNumber.value,
    UF_DATE_GIVE: testDriveIdentityDatePicker.value,
    UF_STATUS: testDriveStatus.value,
    UF_ASSIGNED: testDriveAssignedId.value,
  }

  if (!emptyLogbookInfo) {
    data.ID = testDriveId.value
  }

  form.classList.add(`form--loading`)
  saveLogbookInfo(data)
    .then((response) => {
      console.info(response)
    })
    .catch((error) => {
      console.info('error: ' + error)
    })
    .finally(() => {
      getDepartmentCarsList().then((departmentCarsList) => {
        const date = selectedGeneralDate
        console.log(date)
        getLogbookCarsList(date)
          .then((data) => {
            console.log(departmentCarsList)
            console.log(data)
            console.log(date)
            initTable(departmentCarsList, data, date)
          })
          .finally(() => {
            form.classList.remove(`form--loading`)
            closeLogbookInfo()
          })
      })
    })
}

export { openLogbookInfo }
