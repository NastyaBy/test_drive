import moment from 'moment'
import { openLogbookInfo } from './logbook-info'

const minTime = '9:00'
const maxTime = '18:00'
const step = { minutes: 30 }
const defaultCellData = {
  UF_STATUS: '',
  UF_DATE_FROM: Infinity,
  UF_DATE_TO: Infinity,
}

const getStatusClass = (status) => {
  switch (status) {
    case 'Пройден':
      return 'table__cell--passed'
    case 'Отменен':
      return 'table__cell--cancelled'
    case 'Запланирован':
      return 'table__cell--recorded'
    case 'Просрочен':
      return 'table__cell--expired'
    default:
      return ''
  }
}

const initTable = (departmentCars, logbookCars, selectedDate) => {
  const departmentsList = departmentCars.Departments
  const carsList = departmentCars.Cars

  const tableCurrentDateMoment = moment(selectedDate, 'DD.MM.YYYY')
  const tableStartMoment = moment(`${selectedDate} ${minTime}`, 'DD.MM.YYYY HH:mm')
  const tableEndMoment = moment(`${selectedDate} ${maxTime}`, 'DD.MM.YYYY HH:mm')

  const renderTableRow = (car, logbookCars, tdFormat = 'HH:mm', departmentTitle) => {
    if (!!logbookCars) {
      let tmpLogbookCar = []
      logbookCars.map((item) => {
        if (
          tableCurrentDateMoment.isBetween(
            moment(item.UF_DATE_FROM, 'DD.MM.YYYY'),
            moment(item.UF_DATE_TO, 'DD.MM.YYYY'),
            undefined,
            '[]'
          )
        ) {
          tmpLogbookCar.push(item)
        }
      })

      logbookCars = tmpLogbookCar
    } else {
      logbookCars = [defaultCellData]
    }

    logbookCars.sort((a, b) => moment(a.UF_DATE_TO, 'DD.MM.YYYY HH:mm') - moment(b.UF_DATE_TO, 'DD.MM.YYYY HH:mm'))

    const tr = document.createElement('tr')
    tr.className = 'table__row'

    const currentMoment = tableStartMoment.clone()
    if (departmentTitle && tdFormat) {
      tr.appendChild(renderTableCell(departmentTitle, null, 'table__cell--playground', null))

      while (currentMoment.isSameOrBefore(tableEndMoment)) {
        tr.appendChild(renderTableCell(currentMoment.format(tdFormat), null, 'table__cell--time', null))
        currentMoment.add(step)
      }
    } else {
      tr.appendChild(renderTableCell(car ? car.LAST_NAME : '' || '', null, 'table__cell--car-title', null))

      let statusColSpan = 0
      let lastLogbookCar
      while (currentMoment.isSameOrBefore(tableEndMoment)) {
        const currentMomentFormatted = currentMoment.format('DD.MM.YYYY HH:mm')

        const currentLogbookCar = getStatus(logbookCars, currentMoment)

        if (currentLogbookCar) {
          if (lastLogbookCar && currentLogbookCar.ID !== lastLogbookCar.ID) {
            const td = renderTableCell(
              lastLogbookCar.UF_STATUS,
              statusColSpan,
              getStatusClass(lastLogbookCar.UF_STATUS),
              {
                car,
                lastLogbookCar,
                departmentsList,
                currentMomentFormatted,
              }
            )
            tr.appendChild(td)
            statusColSpan = 0
          }

          statusColSpan++
        } else {
          if (statusColSpan > 0) {
            const td = renderTableCell(
              lastLogbookCar.UF_STATUS,
              statusColSpan,
              getStatusClass(lastLogbookCar.UF_STATUS),
              {
                car,
                lastLogbookCar,
                departmentsList,
                currentMomentFormatted,
              }
            )
            tr.appendChild(td)
            statusColSpan = 0
          }

          const emptyLogbookCar = true
          const td = renderTableCell('', null, '', { car, emptyLogbookCar, departmentsList, currentMomentFormatted })
          tr.appendChild(td)
        }

        lastLogbookCar = currentLogbookCar
        currentMoment.add(step)
      }

      if (statusColSpan > 0) {
        const currentMomentFormatted = currentMoment.format('DD.MM.YYYY HH:mm')

        const td = renderTableCell(lastLogbookCar.UF_STATUS, statusColSpan, getStatusClass(lastLogbookCar.UF_STATUS), {
          car,
          lastLogbookCar,
          departmentsList,
          currentMomentFormatted,
        })
        tr.appendChild(td)
      }
    }

    return tr
  }

  const getStatus = (logbookCars, time) => {
    return logbookCars.find((s) =>
      time.isBetween(
        moment(s.UF_DATE_FROM, 'DD.MM.YYYY HH:mm'),
        moment(s.UF_DATE_TO, 'DD.MM.YYYY HH:mm'),
        undefined,
        '[]'
      )
    )
  }

  const renderTableCell = (text, colSpan, cellClass, data) => {
    const td = document.createElement('td')

    if (!!data) {
      td.addEventListener('click', (evt) => openLogbookInfo(evt, data))

      if (!!data.lastLogbookCar && data.lastLogbookCar.UF_TYPE === 'Перемещение') {
        const departmentName = departmentsList.filter((x) => x[0] === data.lastLogbookCar.UF_DEPARTMENT)

        cellClass = 'table__cell--unavailable'
        text = `ЗАПИСЬ НЕДОСТУПНА - Авто перемещен на площадку
         ${departmentName[0][1]} до ${data.lastLogbookCar.UF_DATE_TO.slice(0, -3)}`
      }
    }

    td.className = `table__cell ${cellClass}`
    td.innerHTML = text
    if (colSpan) {
      td.colSpan = colSpan
    }
    return td
  }

  const tableBox = document.querySelector('.js-logbookTable')
  tableBox.innerHTML = ''

  departmentsList.forEach((item) => {
    const cars = carsList[item[0]]

    if (cars) {
      const tableHeaderRow = renderTableRow(null, null, 'HH:mm', item[1])

      const table = document.createElement('table')
      table.className = 'table js-table'
      table.id = `department-${item[0]}`
      const tableHeader = table.createTHead()
      tableHeader.appendChild(tableHeaderRow)

      const tableBody = table.createTBody()
      cars.forEach((car) => {
        const foundedLogbookCar = logbookCars.filter((item) => item['UF_CAR_ID'] === car.ID)

        const tr = renderTableRow(car, foundedLogbookCar ? foundedLogbookCar : null, null, null)
        tableBody.appendChild(tr)
      })

      tableBox.appendChild(table)
    }
  })
}

export { initTable }
