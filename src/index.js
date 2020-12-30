import './styles/styles.scss'

import { getDepartmentCarsList, departmentCarsList } from './js/server'
import { initGeneralDatePicker } from './js/datepicker'
import { initFilter } from './js/filter'

initGeneralDatePicker()
getDepartmentCarsList()
initFilter(departmentCarsList)
