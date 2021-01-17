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
  let response = await fetch(`${DATA_URL.DEPARTMENT_CARS}`)
  return await response.json()
}

const getLogbookCarsList = async (date) => {
  let response = await fetch(`${DATA_URL.LOGBOOK_CARS}?date=${date}`)
  return await response.json()
}

export { getDepartmentCarsList, getLogbookCarsList }
