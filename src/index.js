import './styles/styles.scss'

import * as server from './js/server'
import { showFilter } from './js/filter.js'
import { GeneralDatePicker } from './js/datepicker.js'

const onLoadDepartmentCarsSuccess = (response) => {
  showFilter(response)
}
const onLoadDepartmentCarsError = () => {
  console.info(`Ошибка загрузки 'Department Cars'`)
}

server.loadDepartmentCars(onLoadDepartmentCarsSuccess, onLoadDepartmentCarsError)
