import './styles/styles.scss'

import { getDepartmentCarsList, departmentCarsList } from './js/server'
import { initFilter } from './js/filter'
import { initGeneralDatePicker } from './js/datepicker'

getDepartmentCarsList()
initFilter(departmentCarsList)
initGeneralDatePicker(departmentCarsList)
