import './styles/styles.scss'

import { getDepartmentCarsList, departmentCarsList } from './js/server'
import { initFilter } from './js/filter'
import { initGeneralDatePicker } from './js/datepicker'

getDepartmentCarsList()

const logbook = document.querySelector('.js-logbook')

window.setTimeout(() => {
  initFilter(departmentCarsList)
  initGeneralDatePicker(departmentCarsList)
  logbook.classList.remove(`logbook--loading`)
}, 2000)
