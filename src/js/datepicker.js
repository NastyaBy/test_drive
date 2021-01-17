import * as Lightpick from 'Lightpick'
import moment from 'moment'
import { initTable } from './table'
import { getLogbookCarsList } from './server'
import { showDepartmentsTable } from './filter'

const prevMonth = moment().date(1).subtract(1, 'month')
const nextMonth = moment().date(31).add(1, 'month')

const initGeneralDatePicker = (departmentsList) => {
  const getTableInfo = (date) => {
    getLogbookCarsList(date).then((data) => {
      initTable(departmentsList, data, date)
      showDepartmentsTable()
    })
  }

  return new Lightpick({
    field: document.getElementById('generalDatePicker'),
    format: 'DD.MM.YYYY',
    inline: true,
    singleDate: true,
    numberOfColumns: 3,
    numberOfMonths: 3,
    startDate: prevMonth.format('DD.MM.YYYY'),
    onOpen: function () {
      const currentDate = moment().format('DD.MM.YYYY')
      this.setDate(currentDate)
    },
    onSelect: function (date) {
      const selectedDate = date.format('DD.MM.YYYY')
      getTableInfo(selectedDate)
    },
  })
}

const initRangeDatePicker = (fieldElement) => {
  return new Lightpick({
    field: fieldElement,
    format: 'DD.MM.YYYY',
    //   orientation: 'top',
    onSelect: function (date) {
      console.info(date.format('DD.MM.YYYY'))
    },
  })
}

export { initGeneralDatePicker, initRangeDatePicker }
