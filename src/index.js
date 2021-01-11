import './styles/styles.scss'

import { getDepartmentCarsList } from './js/server'
import { initFilter } from './js/filter'
import { initGeneralDatePicker } from './js/datepicker'

getDepartmentCarsList()

const logbook = document.querySelector('.js-logbook')

window.setTimeout(() => {
  initFilter(getDepartmentCarsList())
  initGeneralDatePicker(getDepartmentCarsList())
  logbook.classList.remove(`logbook--loading`)
}, 2000)
