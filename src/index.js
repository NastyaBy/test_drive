import './styles/styles.scss'

import { getDepartmentCarsList } from './js/server'
import { initFilter } from './js/filter'
import { initGeneralDatePicker } from './js/datepicker'

const logbook = document.querySelector('.js-logbook')

getDepartmentCarsList()
  .then((data) => {
    initFilter(data)
    initGeneralDatePicker(data)
  })
  .finally(() => logbook.classList.remove(`logbook--loading`))
