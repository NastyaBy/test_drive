import { isDev } from './constants'

const DATA_URL = {
  DEPARTMENT_CARS: isDev
    ? `http://my-json-server.typicode.com/Gover/test-data/DEPARTMENT_CARS`
    : `https://crm.atlantm.com/esoft/test-drive/requests/departmentsandcarshttp.php`,
  LOGBOOK_CARS: isDev
    ? `http://my-json-server.typicode.com/Gover/test-data/LOGBOOK_CARS`
    : `https://crm.atlantm.com/esoft/test-drive/requests/highloadhttp.php`,
}

const getDepartmentCarsList = async () => {
  const response = await fetch(`${DATA_URL.DEPARTMENT_CARS}`)
  return await response.json()
}

const getLogbookCarsList = async (date) => {
  const response = await fetch(`${DATA_URL.LOGBOOK_CARS}?date=${date}`)
  return await response.json()
}

const getLogbookInfo = async (id) => {
  const response = await fetch(`${DATA_URL.LOGBOOK_CARS}?id=${id}`)
  return await response.json()
}

const saveLogbookInfo = async (data = {}) => {
  const response = await fetch(`${DATA_URL.LOGBOOK_CARS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

export { getDepartmentCarsList, getLogbookCarsList, saveLogbookInfo, getLogbookInfo }
