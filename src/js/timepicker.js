import { initRangeDatePicker } from './datepicker.js'

const identityDatePicker = document.getElementById('identityDatePicker')
let identityDatePickerCalendar
let rangePikerCalendar = []
let rangePikerCalendarItem = 0

export function timepicker() {
  const initDropdown = (inputTimepickerClass) => {
    const input = document.querySelector(`${inputTimepickerClass}`)
    const dropdown = input.nextElementSibling
    const selectTime = dropdown.querySelector('.js-timeTimepicker')
    const rangePiker = dropdown.querySelector('.js-dateTimepicker')
    const blackoutTimepicker = dropdown.nextElementSibling

    const TIMEPICKER_CLASS_OPEN = 'fieldset__dropdown--show'
    const TIMEPICKER_BLACKOUT_CLASS_OPEN = 'fieldset__blackout--show'

    rangePikerCalendar = []
    rangePikerCalendarItem = 0
    rangePikerCalendar.push(new initRangeDatePicker(rangePiker))

    input.addEventListener('click', (evt) => {
      console.info({ evt })
      evt.preventDefault()
      dropdown.classList.toggle(TIMEPICKER_CLASS_OPEN)
      blackoutTimepicker.classList.toggle(TIMEPICKER_BLACKOUT_CLASS_OPEN)
    })

    selectTime.addEventListener('change', (evt) => {
      changeTimePicker(input, selectTime.value, rangePikerCalendar[rangePikerCalendarItem].toString('DD.MM.YYYY'))
    })

    rangePikerCalendar[rangePikerCalendarItem].reloadOptions({
      onSelect: function (date) {
        changeTimePicker(input, selectTime.value, date.format('DD.MM.YYYY'))
      },
    })

    blackoutTimepicker.addEventListener('click', () => {
      dropdown.classList.toggle(TIMEPICKER_CLASS_OPEN)
      blackoutTimepicker.classList.toggle(TIMEPICKER_BLACKOUT_CLASS_OPEN)
    })

    const changeTimePicker = (element, timeStart, dataStart) => {
      element.value = `${timeStart} - ${dataStart}`
    }

    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        if (dropdown.classList.contains(TIMEPICKER_CLASS_OPEN)) {
          evt.preventDefault()
          dropdown.classList.remove(TIMEPICKER_CLASS_OPEN)
          blackoutTimepicker.classList.remove(TIMEPICKER_BLACKOUT_CLASS_OPEN)
        }
      }
    })

    rangePikerCalendarItem++
  }

  return {
    init: function () {
      identityDatePickerCalendar = new initRangeDatePicker(identityDatePicker)
      initDropdown('.js-timepickerInputOn')
      initDropdown('.js-timepickerInputOff')
    },
    destroy: function () {
      if (!!identityDatePickerCalendar) identityDatePickerCalendar.destroy()

      if (rangePikerCalendar && rangePikerCalendar.length) {
        rangePikerCalendar.forEach((element) => {
          element.destroy()
        })
      }
    },
  }
}
