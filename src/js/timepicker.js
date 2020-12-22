export function timepicker () {
  const inputTimepicker = document.querySelectorAll('.js-openTimepicker')
  const openTimepickerClass = 'fieldset__dropdown--show'
  const openBlackoutTimepicker = 'fieldset__blackout--show'

  inputTimepicker.forEach((trigger) => {
    const dropdown = trigger.nextElementSibling
    const selectTime = dropdown.querySelector('.js-timeTimepicker')
    const inputDate = dropdown.querySelector('.js-dateTimepicker')
    const blackoutTimepicker = dropdown.nextElementSibling

    const rangeDatePicker = new Lightpick({
      field: document.getElementById('onDatePicker'),
      onSelect: function(date){
        document.getElementById('result-1').innerHTML = date.format('DD.MM.YYYY');
      }
    });

    trigger.addEventListener('click', (evt) => {
      evt.preventDefault()
      dropdown.classList.toggle(openTimepickerClass)
      blackoutTimepicker.classList.toggle(openBlackoutTimepicker)
    })

    selectTime.addEventListener('change', (evt) => {
      changeTimePicker(trigger, selectTime.value, rangeDatePicker.getDate('dd.mm.yyyy'))
    })

    inputDate.addEventListener('changeDate', (evt) => {
      changeTimePicker(trigger, selectTime.value, rangeDatePicker.getDate('dd.mm.yyyy'))
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
}
