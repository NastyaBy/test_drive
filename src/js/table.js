import { timeIntervals } from './constants'
import { openLogbookInfo } from './logbook-info'

const initTable = (departmentCars, logbookCars) => {
  const departmentsList = departmentCars.Departments
  const carsList = departmentCars.Cars
  const intervals = timeIntervals

  const tableBox = document.querySelector('.js-logbookTable')
  const autoStatus = document.querySelector('.table__cell')

  const Status = {
    PASSED: 'Пройден',
    CANCELLED: 'Отменён',
    RECORDER: 'Запланирован',
    EXPIRED: 'Просрочен',
  }

  departmentsList.forEach((item) => {
    const cars = carsList[item[0]]

    const html = `<table class="table js-table" id="department-${item[0]}">
                         <tr class="table__row">
                            <td class="table__cell table__cell--playground">${item[1]}</td>
                            ${intervals
                              .map((time) => `<td class="table__cell table__cell--time">${time}</td>`)
                              .join('')}
                         </tr>
                        
                          ${cars
                            .map(
                              (car) => `
                                <tr class="table__row">
                                    <td class="table__cell table__cell--auto">${car['LAST_NAME']}</td>
                                    ${intervals
                                      .map(
                                        (time) =>
                                          `<td class="table__cell js-tableCell" 
                                               data-car-id=${car['ID']}
                                               data-car-time=${time}
                                               data-car-status=${car['UF_STATUS']}
                                               data-car-td=${car['UF_TEST_DRIVE']}
                                           </td>`
                                      )
                                      .join('')}
                                 </tr>`
                            )
                            .join('')}
                       </table>`

    tableBox.innerHTML += html
  })

  const getCellColor = (evt, autoStatus) => {
    autoStatus.value = evt.target.dataset.carTd
    if (car['UF_STATUS'].value === Status.CANCELLED) {
      autoStatus.classList.add('table__cell--cancelled')
      autoStatus.textContent = 'Отменен'
    }
    if (autoStatus.value === Status.RECORDER) {
      autoStatus.classList.add('table__cell--recorded')
      autoStatus.textContent = 'Записан'
    }
    if (autoStatus.value === Status.PASSED) {
      autoStatus.classList.add('table__cell--passed')
      autoStatus.textContent = 'Пройден'
    }
    if (autoStatus.value === Status.EXPIRED) {
      autoStatus.classList.add('table__cell--expired')
      autoStatus.textContent = 'Просрочен'
    }
  }

  const tableCell = document.querySelectorAll('.js-tableCell')
  tableCell.forEach((item) => {
    item.addEventListener(
      'click',
      (evt) => {
        openLogbookInfo(evt)
      },
      false
    )
  })
}

export { initTable }
