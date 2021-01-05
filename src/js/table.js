import { timeIntervals } from './constants'
import { openLogbookInfo } from './logbook-info'

const initTable = (departmentCars, logbookCars) => {
  const departmentsList = departmentCars.Departments
  const carsList = departmentCars.Cars
  const intervals = timeIntervals

  const tableBox = document.querySelector('.js-logbookTable')

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

  const tableCell = document.querySelectorAll('.js-tableCell')
  tableCell.forEach((item) => {
    item.addEventListener(
      'click',
      (event) => {
        openLogbookInfo(event)
      },
      true
    )
  })
}

export { initTable }
