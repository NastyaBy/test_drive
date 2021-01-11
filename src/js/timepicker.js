import { initRangeDatePicker } from './datepicker.js'

export function timepicker() {
  const identityDatePicker = document.getElementById('identityDatePicker')
  const identityDatePickerCalendar = new initRangeDatePicker(identityDatePicker)

  const initDropdown = (inputTimepickerClass) => {
    const input = document.querySelector(`${inputTimepickerClass}`)
    const dropdown = input.nextElementSibling
    const selectTime = dropdown.querySelector('.js-timeTimepicker')
    const rangePiker = dropdown.querySelector('.js-dateTimepicker')
    const blackoutTimepicker = dropdown.nextElementSibling

    const openTimepickerClass = 'fieldset__dropdown--show'
    const openBlackoutTimepicker = 'fieldset__blackout--show'

    const rangePikerCalendar = new initRangeDatePicker(rangePiker)

    input.addEventListener('click', (evt) => {
      evt.preventDefault()
      dropdown.classList.toggle(openTimepickerClass)
      blackoutTimepicker.classList.toggle(openBlackoutTimepicker)
    })

    selectTime.addEventListener('change', (evt) => {
      changeTimePicker(input, selectTime.value, rangePikerCalendar.toString('DD.MM.YYYY'))
    })

    rangePikerCalendar.reloadOptions({
      onSelect: function (date) {
        changeTimePicker(input, selectTime.value, date.format('DD.MM.YYYY'))
      },
    })

    blackoutTimepicker.addEventListener('click', () => {
      dropdown.classList.toggle(openTimepickerClass)
      blackoutTimepicker.classList.toggle(openBlackoutTimepicker)
    })

    const changeTimePicker = (element, timeStart, dataStart) => {
      element.value = `${timeStart} - ${dataStart}`
    }

    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        if (dropdown.classList.contains(openTimepickerClass)) {
          evt.preventDefault()
          dropdown.classList.remove(openTimepickerClass)
          blackoutTimepicker.classList.remove(openBlackoutTimepicker)
        }
      }
    })
  }

  return {
    init: function () {
      initDropdown('.js-timepickerInputOn')
      initDropdown('.js-timepickerInputOff')
    },
    destroy: function () {
      console.info('destroy')
    },
  }
}
