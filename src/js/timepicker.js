import {initRangeDatePicker} from './datepicker.js'
import {initRangeDatePickerOnOff} from './datepicker.js'

export function timepicker() {
    const inputTimepicker = document.querySelectorAll('.js-openTimepicker')
    const openTimepickerClass = 'fieldset__dropdown--show'
    const openBlackoutTimepicker = 'fieldset__blackout--show'

    const rangePiker = initRangeDatePickerOnOff('onDatePicker', 'offDatePicker')

    inputTimepicker.forEach((trigger) => {
        const dropdown = trigger.nextElementSibling
        const selectTime = dropdown.querySelector('.js-timeTimepicker')
        const blackoutTimepicker = dropdown.nextElementSibling

        trigger.addEventListener('click', (evt) => {
            evt.preventDefault()
            dropdown.classList.toggle(openTimepickerClass)
            blackoutTimepicker.classList.toggle(openBlackoutTimepicker)
        })

        selectTime.addEventListener('change', (evt) => {
            // changeTimePicker(trigger, selectTime.value, startDate.format('DD.MM.YYYY'))
        })

        blackoutTimepicker.addEventListener('click', () => {
            dropdown.classList.toggle(openTimepickerClass)
            blackoutTimepicker.classList.toggle(openBlackoutTimepicker)
        })

        window.addEventListener('keydown', (evt) => {
            if (evt.keyCode === 27) {
                if (dropdown.classList.contains(openTimepickerClass)) {
                    evt.preventDefault()
                    dropdown.classList.remove(openTimepickerClass)
                    blackoutTimepicker.classList.remove(openBlackoutTimepicker)
                }
            }
        })
    })

    const changeTimePicker = (element, timeStart, dataStart) => {
        element.value = `${timeStart} - ${dataStart}`
    }

    const identityDatePicker = document.getElementById('identityDatePicker')
    initRangeDatePicker(identityDatePicker)
}
