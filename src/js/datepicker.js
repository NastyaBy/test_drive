import * as Lightpick from 'Lightpick'
import dayjs from 'dayjs'

// const datePicker = () => {
//   const inlineDatePicker1 = document.getElementById('inlineDatePicker1')
//   const inlineDatePicker2 = document.getElementById('inlineDatePicker2')
//   const inlineDatePicker3 = document.getElementById('inlineDatePicker3')
//
//   let currentMonth = dayjs()
//   let prevMonth = dayjs().subtract(1, 'month')
//   let nextMonth = dayjs().add(1, 'month')
//
//   const calendar1 = new Datepicker(inlineDatePicker1, {
//     language: 'ru',
//     format: 'dd.mm.yyyy',
//     defaultViewDate: prevMonth.format('DD.MM.YYYY'),
//   })
//
//   const calendar2 = new Datepicker(inlineDatePicker2, {
//     language: 'ru',
//     format: 'dd.mm.yyyy',
//     todayHighlight: true,
//     defaultViewDate: currentMonth.format('DD.MM.YYYY'),
//   })
//
//   const calendar3 = new Datepicker(inlineDatePicker3, {
//     language: 'ru',
//     format: 'dd.mm.yyyy',
//     defaultViewDate: nextMonth.format('DD.MM.YYYY'),
//   })
//
//   const prevDataBtn = inlineDatePicker1.querySelector('.prev-btn')
//   const nextDataBtn = inlineDatePicker3.querySelector('.next-btn')
//
//   prevDataBtn.addEventListener('click', (evt) => {
//     currentMonth = currentMonth.subtract(1, 'month')
//     prevMonth = prevMonth.subtract(1, 'month')
//     nextMonth = nextMonth.subtract(1, 'month')
//
//     calendar1.setDate(prevMonth.format('DD.MM.YYYY'))
//     calendar2.setDate(currentMonth.format('DD.MM.YYYY'))
//     calendar3.setDate(nextMonth.format('DD.MM.YYYY'))
//   })
//
//   nextDataBtn.addEventListener('click', (evt) => {
//     currentMonth = currentMonth.add(1, 'month')
//     prevMonth = prevMonth.add(1, 'month')
//     nextMonth = nextMonth.add(1, 'month')
//
//     calendar1.setDate(prevMonth.format('DD.MM.YYYY'))
//     calendar2.setDate(currentMonth.format('DD.MM.YYYY'))
//     calendar3.setDate(nextMonth.format('DD.MM.YYYY'))
//   })
//
//   inlineDatePicker1.addEventListener('changeDate', (evt) => {
//     changeDataPicker(calendar1.getDate('dd.mm.yyyy'))
//   })
//
//   inlineDatePicker2.addEventListener('changeDate', (evt) => {
//     changeDataPicker(calendar2.getDate('dd.mm.yyyy'))
//   })
//
//   inlineDatePicker3.addEventListener('changeDate', (evt) => {
//     changeDataPicker(calendar3.getDate('dd.mm.yyyy'))
//   })
//
//   const changeDataPicker = (date) => {
//     console.log(date)
//   }
// }
//
// datePicker()

export function initGeneralDatePicker() {
  const prevMonth = dayjs().date(1).subtract(1, 'month')
  const nextMonth = dayjs().date(31).add(1, 'month')

  return new Lightpick({
    field: document.getElementById('generalDatePicker'),
    format: 'DD.MM.YYYY',
    inline: true,
    singleDate: true,
    numberOfColumns: 3,
    numberOfMonths: 3,
    lang: 'ru',
    locale: {
      tooltip: {
        one: 'день',
        few: 'дня',
        many: 'дней',
      },
      pluralize: function (i, locale) {
        if ('one' in locale && i % 10 === 1 && !(i % 100 === 11)) return locale.one
        if (
          'few' in locale &&
          i % 10 === Math.floor(i % 10) &&
          i % 10 >= 2 &&
          i % 10 <= 4 &&
          !(i % 100 >= 12 && i % 100 <= 14)
        )
          return locale.few
        if (
          'many' in locale &&
          (i % 10 === 0 ||
            (i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9) ||
            (i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14))
        )
          return locale.many
        if ('other' in locale) return locale.other

        return ''
      },
    },
    startDate: prevMonth.format('DD.MM.YYYY'),
    onSelect: function (start) {
      console.info(start.format('DD.MM.YYYY'))
    },
  })
}
