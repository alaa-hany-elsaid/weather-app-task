import { ajax } from 'rxjs/ajax'
const BASE_PATH = 'https://restcountries.com/v3.1/capital'

function countriesObservableByCapitalQuery(value) {
  return ajax.getJSON(`${BASE_PATH}/${encodeURIComponent(value)}`)
}

export { countriesObservableByCapitalQuery }
