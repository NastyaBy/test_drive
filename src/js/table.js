import moment from 'moment'
import { showDepartmentsTable } from './filter'
import { openLogbookInfo } from './logbook-info'

const minTime = '9:00'
const maxTime = '18:00'
const step = { minutes: 30 }

const renderTableRow = (car, logbookCar, tdFormat = 'HH:mm', startMoment, endMoment, departmentTitle) => {
  const tr = document.createElement('tr')
  tr.className = 'table__row'

  if (departmentTitle) {
    tr.appendChild(renderTableCell(departmentTitle, null, 'table__cell--playground'))
  } else {
    tr.appendChild(renderTableCell(car ? car.LAST_NAME : '' || '', null, 'table__cell--car-title'))
  }

  const carStartMoment = logbookCar.UF_DATE_FROM && moment(logbookCar.UF_DATE_FROM, 'DD.MM.YYYY HH:mm')
  const carEndMoment = logbookCar.UF_DATE_TO && moment(logbookCar.UF_DATE_TO, 'DD.MM.YYYY HH:mm')
  const currentMoment = startMoment.clone()

  let statusClass = ''
  switch (logbookCar.UF_STATUS) {
    case 'Пройден':
      statusClass = 'table__cell--passed'
      break
    case 'Отменён':
      statusClass = 'table__cell--cancelled'
      break
    case 'Запланирован':
      statusClass = 'table__cell--recorded'
      break
    case 'Просрочен':
      statusClass = 'table__cell--expired'
      break
    default:
      statusClass = ''
  }

  let statusColSpan = 0
  while (currentMoment.isSameOrBefore(endMoment)) {
    if (currentMoment.isBetween(carStartMoment, carEndMoment, undefined, '[]')) {
      statusColSpan++
    } else {
      if (statusColSpan > 0) {
        const td = renderTableCell(logbookCar.UF_STATUS, statusColSpan, statusClass)
        tr.appendChild(td)
        statusColSpan = 0
      }

      const td = renderTableCell(
        tdFormat ? currentMoment.format(tdFormat) : '',
        null,
        tdFormat ? 'table__cell--time' : ''
      )
      tr.appendChild(td)
    }

    currentMoment.add(step)
  }

  if (statusColSpan > 0) {
    const td = renderTableCell(logbookCar.UF_STATUS, statusColSpan, statusClass)
    tr.appendChild(td)
  }

  return tr
}

const renderTableCell = (text, colSpan, cellClass) => {
  const td = document.createElement('td')
  td.className = `table__cell ${cellClass} js-tableCell`

  td.innerHTML = text
  if (colSpan) {
    td.colSpan = colSpan
  }
  return td
}

const initTable = (departmentCars, logbookCars, selectedDate) => {
  const departmentsList = departmentCars.Departments
  const carsList = departmentCars.Cars

  const startMoment = moment(`${selectedDate} ${minTime}`, 'DD.MM.YYYY HH:mm')
  const endMoment = moment(`${selectedDate} ${maxTime}`, 'DD.MM.YYYY HH:mm')

  const tableBox = document.querySelector('.js-logbookTable')
  tableBox.innerHTML = ''

  departmentsList.forEach((item) => {
    const cars = carsList[item[0]]

    console.info(`-----------------------------------------`, `\n${item[1]} (${selectedDate})\n`)

    const defaultCellData = {
      UF_STATUS: '',
      UF_DATE_FROM: Infinity,
      UF_DATE_TO: Infinity,
    }
    const tableHeaderRow = renderTableRow(null, defaultCellData, 'HH:mm', startMoment, endMoment, item[1])

    const table = document.createElement('table')
    table.className = 'table js-table'
    table.id = `department-${item[0]}`
    const tableHeader = table.createTHead()
    tableHeader.appendChild(tableHeaderRow)

    const tableBody = table.createTBody()
    cars.forEach((car) => {
      const logbookCar = logbookCars.find((item) => item['UF_CAR_ID'] === car.ID)
      const tr = renderTableRow(car, logbookCar ? logbookCar : defaultCellData, null, startMoment, endMoment)
      tableBody.appendChild(tr)
    })

    tableBox.appendChild(table)
  })

  showDepartmentsTable()
}

export { initTable }
