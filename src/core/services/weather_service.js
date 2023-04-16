import { ajax } from 'rxjs/ajax'
const BASE_PATH = 'https://api.weatherapi.com/v1'
const key = '83bb8a6e64df493eab924848231604'

function generateEndpoint(apiMethod) {
  return `${BASE_PATH}/${apiMethod}?key=${key}`
}

function currentWeatherOfCapitalObservable(capital) {
  return ajax.getJSON(`${generateEndpoint('current.json')}&q=${encodeURIComponent(capital)}`)
}

function forecastWeatherOfCapitalObservable(capital, days = 5) {
  return ajax.getJSON(
    `${generateEndpoint('forecast.json')}&q=${encodeURIComponent(capital)}&days=${days}`
  )
}

export { currentWeatherOfCapitalObservable, forecastWeatherOfCapitalObservable }
