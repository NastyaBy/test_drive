import * as Lightpick from 'Lightpick'
import dayjs from 'dayjs'
import * as server from './server'
import { showTable } from './table.js'

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
            const date = start.format('DD.MM.YYYY')

            server.loadLogbookCars(onLoadLogbookCarsSuccess, onLoadLogbookCarsError, date)
            console.info(start.format('DD.MM.YYYY'))
        },
    })
}

const onLoadLogbookCarsSuccess = (response) => {
    showTable(response)
}

const onLoadLogbookCarsError = () => {
    console.info(`Ошибка загрузки 'Logbook Cars'`)
}

export function initRangeDatePickerOnOff(fieldId, secondFildId, startDay, endDay) {
    return new Lightpick({
        field: document.getElementById(fieldId),
        secondField: document.getElementById(secondFildId),
        format: 'DD.MM.YYYY',
        repick: true,
        startDate: startDay,
        endDate: endDay,
        onSelect: function (startDate, endDate) {
            console.log(startDate.format('DD.MM.YYYY'), endDate.format('DD.MM.YYYY'))
        }
    })
}

export function initRangeDatePicker(dataPicker) {
    return new Lightpick({
        field: dataPicker,
        format: 'DD.MM.YYYY',
        orientation: 'top',
        onSelect: function (date) {
            console.info(date.format('DD.MM.YYYY'))
        }
    })
}







