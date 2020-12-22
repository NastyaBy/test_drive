import * as server from './server'
import { isDev } from './constants'

const initFilter = (response) => {
  const departmentsList = response.Departments
  const filterBox = document.querySelector('.js-filterBox')

  departmentsList.forEach((item, i, departmentsList) => {
    filterBox.innerHTML += `<div class="form-checkbox">
                              <input class="form-checkbox__control js-checkbox"
                                     type="checkbox"
                                     name="playground"
                                     id="department-${i}"
                                     value="${item[0]}"/>
                              <label class="form-checkbox__text" for="department-${i}">${item[1]}</label>
                            </div>`
  })

  const getCheckedCheckBoxes = () => {
    const selectedCheckBoxes = document.querySelectorAll('.js-checkbox:checked')
    return Array.from(selectedCheckBoxes).map((cb) => cb.value)
  }

  const showDepartmentsTable = (item) => {
    const allTables = document.querySelectorAll(`.js-table`)
    allTables.forEach((item) => {
      if (item.classList.contains('showTable')) {
        item.classList.remove('showTable')
      }
    })

    item.forEach((item) => {
      const table = document.querySelector(`#department-${item}`)
      if (table) table.classList.add('showTable')
    })
  }

  const activateCheckbox = () => {
    const checkboxes = document.querySelectorAll('.js-checkbox-group')
    Array.prototype.forEach.call(checkboxes, (item) => {
      const count = item.getElementsByClassName('js-checkbox').length
      let currentCount = 0

      item.addEventListener(
        'change',
        (evt) => {
          if (evt.target.classList.contains('js-checkbox-main')) {
            if (evt.target.checked) {
              setAllCheckboxes(item, true)
              currentCount = count
            } else {
              setAllCheckboxes(item, false)
              currentCount = 0
            }
          } else {
            evt.target.checked ? ++currentCount : --currentCount

            if (currentCount === count) {
              setAllCheckboxes(item, true)
            } else if (currentCount === count - 1) {
              if (!evt.target.checked) {
                item.getElementsByClassName('js-checkbox-main')[0].checked = false
              }
            }
          }

          getCheckedCheckBoxes()

          showDepartmentsTable(getCheckedCheckBoxes())
        },
        false
      )
    })

    const setAllCheckboxes = (where, value) => {
      const checkboxes = where.querySelectorAll('input[type="checkbox"]')
      Array.prototype.forEach.call(checkboxes, (item) => {
        item.checked = !!value
      })
    }
  }

  activateCheckbox()
}

const onLoadFilterError = () => {
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

export function showFilter() {
  if (isDev) {
    return initFilter(server.STATIC_DATE.departmentSandCars)
  } else {
    return server.load(initFilter, onLoadFilterError)
  }
}
