import * as server from './server'
import { isDev, timeIntervals } from './constants'
import { openLogbookInfo } from './logbook-info'

const initTable = (response) => {
  const departmentsList = response.Departments
  const carsList = response.Cars
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
                                               data-car-td=${car['UF_TEST_DRIVE']}>
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

const onLoadTableError = () => {
  const errorElement = document.createElement(`div`)
  errorElement.innerText = `Ошибка при попытке загрузки данных`
  errorElement.style.position = `absolute`
  errorElement.style.width = `100%`
  errorElement.style.height = `40px`
  errorElement.style.textAlign = `center`
  errorElement.style.backgroundColor = `#ff000021`
  errorElement.style.borderWidth = `1px`
  errorElement.style.borderStyle = `solid`
  errorElement.style.borderColor = `red`
  errorElement.style.lineHeight = `40px`
  errorElement.style.top = `100px`
  errorElement.style.color = `red`

  window.body.appendChild(errorElement)
}

export function showTable() {
  if (isDev) {
    return initTable(server.STATIC_DATE.departmentSandCars)
  } else {
    return server.load(initTable, onLoadTableError)
  }
}
