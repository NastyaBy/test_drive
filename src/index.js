import './styles/styles.scss'

import { getDepartmentCarsList } from './js/server'
import { initFilter } from './js/filter'
import { initGeneralDatePicker } from './js/datepicker'

getDepartmentCarsList()
  .then((data) => {
    initFilter(data)
    initGeneralDatePicker(data)
  })
  .finally(() => {
    const logbook = document.querySelector('.js-logbook')
    logbook.classList.remove(`logbook--loading`)
  })
