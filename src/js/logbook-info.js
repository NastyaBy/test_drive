import { timeIntervals } from './constants'
import { timepicker } from './timepicker'
import { getDepartmentCarsList } from './server'

export function openLogbookInfo(evt) {
  const logbookInfo = document.querySelector('.js-logbookInfo')
  const closeLogbookInfo = logbookInfo.querySelector('.js-closeLogbookInfo')
  const show = 'logbook__info--show'

  console.log(evt.target.dataset.carId)
  console.log(evt.target.dataset.carTime)
  console.log(evt.target.dataset.carTd)

  evt.preventDefault()
  logbookInfo.classList.add(show)

  const logbookInfoTimepicker = timepicker()
  logbookInfoTimepicker.init()

  const autoTest = logbookInfo.querySelector('.js-autoTest')
  const onTimeTest = logbookInfo.querySelector('.js-timeOn')
  const offTimeTest = logbookInfo.querySelector('.js-timeOff')

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

  closeLogbookInfo.addEventListener('click', () => {
    logbookInfo.classList.remove(show)
  })

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      if (logbookInfo.classList.contains(show)) {
        evt.preventDefault()
        logbookInfo.classList.remove(show)
        logbookInfoTimepicker.destroy()
      }
    }
  })

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
}
