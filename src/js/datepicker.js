import * as Lightpick from 'Lightpick'
import dayjs from 'dayjs'
import { initTable } from './table'
import { getLogbookCarsList } from './server'

const prevMonth = dayjs().date(1).subtract(1, 'month')
const nextMonth = dayjs().date(31).add(1, 'month')

const initGeneralDatePicker = (departmentsList) => {
  const getTableInfo = (date) => {
    getLogbookCarsList(date)
    initTable(departmentsList, getLogbookCarsList())
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
      const currentDate = dayjs().format('DD.MM.YYYY')
      this.setDate(currentDate)
      getTableInfo(currentDate)
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
