import { timeIntervals } from './constants'
import { showDepartmentsTable } from './filter'
import { openLogbookInfo } from './logbook-info'

const intervals = timeIntervals

const renderTableRow = (car, logbookCars, selectedDate) => {
  const logbookCar = logbookCars.find((logbookCar) => logbookCar['UF_CAR_ID'] === car.ID)
  const carStatus = logbookCar ? logbookCar.UF_STATUS : null
  const carBookedDateFrom = logbookCar ? logbookCar.UF_DATE_FROM : null
  const carBookedDateTo = logbookCar ? logbookCar.UF_DATE_TO : null

  const dayPeriod = logbookCar ? `с ${carBookedDateFrom.slice(11, -3)} по ${carBookedDateTo.slice(11, -3)}` : ''

  if (isCarBooked(car, logbookCars)) {
    console.info(`${car['ID']} -> %c BOOKED - ${dayPeriod}`, `color: #bada55`)
  } else {
    console.info(`${car['ID']} -> %c NOT_BOOKED`, `color: red`)
  }

  return `<tr class="table__row">
              <td class="table__cell table__cell--car-title">${car['LAST_NAME']}</td>
              ${intervals.map((time) => renderTableCell(car, carStatus, time, selectedDate)).join('')}
          </tr>`
}

const renderTableCell = (car, carStatus, time, selectedDate) => {
  const statusText = carStatus ? carStatus : ''
  let statusClass = ''
  switch (carStatus) {
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

  return `<td class="table__cell ${statusClass} js-tableCell" 
             data-car-id=${car['ID']}
             data-car-time=${time}
             data-car-td=${car['UF_TEST_DRIVE']}>
             <span class="table__cell-text">${statusText}</span>
          </td>`
}

const isCarBooked = (car, logbookCars) => {
  return logbookCars.some((logbookCar) => logbookCar['UF_CAR_ID'] === car.ID)
}

const initTable = (departmentCars, logbookCars, selectedDate) => {
  const departmentsList = departmentCars.Departments
  const carsList = departmentCars.Cars

  const tableBox = document.querySelector('.js-logbookTable')
  tableBox.innerHTML = ''

  departmentsList.forEach((item) => {
    const cars = carsList[item[0]]

    // console.info(`%c ${item[0]}`, 'color: red', '\n', { cars }, '\n', { logbookCars }, '\n')

    // logbookCars.forEach((itemLogbookCars) => {
    //   const found = itemDepartmentCarsIds.some((carId) => itemLogbookCars.UF_CAR_ID.includes(carId))
    //
    //   // if (found) console.info(`${itemLogbookCars.UF_CAR_ID} -> %c${found}`, `color: #bada55`)
    //   if (found) {
    //     const Status = {
    //       PASSED: 'Пройден',
    //       CANCELLED: 'Отменён',
    //       RECORDER: 'Запланирован',
    //       EXPIRED: 'Просрочен',
    //     }
    //
    //     const status = itemLogbookCars.UF_STATUS
    //     const dateOn = itemLogbookCars.UF_DATE_FROM.split(/\s* \s*/)
    //     const dateOff = itemLogbookCars.UF_DATE_TO.split(/\s* \s*/)
    //
    //     console.log(`${status} c ${itemLogbookCars.UF_DATE_FROM} по ${itemLogbookCars.UF_DATE_TO}`)
    //
    //     if (selectedDate > dateOn[0]) {
    //       console.log('календарная дата меньше даты начала')
    //       const timeOn = '9:00'
    //     } else if (selectedDate === dateOn[0]) {
    //       console.log('календарная дата равно дате начала')
    //       const timeOn = dateOn[1]
    //     } else if (selectedDate < dateOn[0]) {
    //       console.log('Ошибка даты, календарная дата не может быть дата меньше даты начала')
    //     }
    //
    //     if (selectedDate > dateOff[0]) {
    //       console.log('Ошибка даты, календарная дата не может быть больше дате оканчание')
    //     } else if (selectedDate === dateOff[0]) {
    //       console.log('календарная дата равно дате оканчание')
    //       const timeOff = dateOff[1]
    //     } else if (selectedDate < dateOff[0]) {
    //       console.log('календарная дата меньше дате оканчание')
    //       const timeOff = '18:00'
    //     }
    //
    //     // функция которв будет окрашивать в зависемости от статуса
    //
    //     // const autoStatus = document.querySelector('.table__cell')
    //
    //     // if (status === Status.CANCELLED) {
    //     //   autoStatus.classList.add('table__cell--cancelled')
    //     //   autoStatus.textContent = 'Отменен'
    //     // }
    //     // if (status === Status.RECORDER) {
    //     //   autoStatus.classList.add('table__cell--recorded')
    //     //   autoStatus.textContent = 'Записан'
    //     // }
    //     // if (status === Status.PASSED) {
    //     //   autoStatus.classList.add('table__cell--passed')
    //     //   autoStatus.textContent = 'Пройден'
    //     // }
    //     // if (status === Status.EXPIRED) {
    //     //   autoStatus.classList.add('table__cell--expired')
    //     //   autoStatus.textContent = 'Просрочен'
    //     // }
    //   }
    // })

    console.info(`-----------------------------------------`, `\n${item[1]} (${selectedDate})\n`)

    const table = `<table class="table js-table" id="department-${item[0]}">
                         <tr class="table__row">
                            <td class="table__cell table__cell--playground">${item[1]}</td>
                            ${intervals
                              .map((time) => `<td class="table__cell table__cell--time">${time}</td>`)
                              .join('')}
                         </tr>

                          ${cars.map((car) => renderTableRow(car, logbookCars, selectedDate)).join('')}
                       </table>`

    tableBox.innerHTML += table
  })
  // функция которвя будет перебирать время и находить нужные ячейки

  const tableCell = document.querySelectorAll('.js-tableCell')
  tableCell.forEach((item) => {
    item.addEventListener(
      'click',
      (evt) => {
        openLogbookInfo(evt)
      },
      true
    )
  })

  showDepartmentsTable()
}

export { initTable }
