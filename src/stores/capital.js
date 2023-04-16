import { defineStore } from 'pinia'
import store from 'store/dist/store.legacy'
import _ from 'lodash'

export const useCapitalStore = defineStore('capitalState', {
  state: () => {
    let storedCapital = store.get('capital')
    if (storedCapital) {
      return { capital: storedCapital, fetchWeatherInfo: true }
    }
    return { capital: null, fetchWeatherInfo: false }
  },

  actions: {
    updateCapital(capital) {
      if (!_.isEqual(capital, this.capital)) {
        this.capital = capital
        this.fetchWeatherInfo = true
        store.set('capital', capital)
      } else {
        this.fetchWeatherInfo = false
      }
    }
  }
})
