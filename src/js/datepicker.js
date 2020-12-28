import * as Lightpick from 'Lightpick'
import dayjs from 'dayjs'
import * as server from './server'
import { showTable } from './table.js'

const prevMonth = dayjs().date(1).subtract(1, 'month')
const nextMonth = dayjs().date(31).add(1, 'month')

const GeneralDatePicker = new Lightpick({
  field: document.getElementById('generalDatePicker'),
  format: 'DD.MM.YYYY',
  inline: true,
  singleDate: true,
  numberOfColumns: 3,
  numberOfMonths: 3,
  startDate: prevMonth.format('DD.MM.YYYY'),
  onSelect: function (start) {
    const date = start.format('DD.MM.YYYY')

    server.loadLogbookCars(onLoadLogbookCarsSuccess, onLoadLogbookCarsError, date)
    console.info(start.format('DD.MM.YYYY'))
  },
})

const onLoadLogbookCarsSuccess = (response) => {
  showTable(response)
}

const onLoadLogbookCarsError = () => {
  console.info(`Ошибка загрузки 'Logbook Cars'`)
}

const RangeDatePicker = (fieldElement) => {
  return new Lightpick({
    field: fieldElement,
    format: 'DD.MM.YYYY',
    //   orientation: 'top',
    onSelect: function (date) {
      console.info(date.format('DD.MM.YYYY'))
    },
  })
}

export { GeneralDatePicker, RangeDatePicker }
