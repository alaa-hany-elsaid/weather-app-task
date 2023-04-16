<script setup>
import ProgressSpinner from 'primevue/progressspinner'
import { useCapitalStore } from '@/stores/capital'
import { ref, onMounted, computed } from 'vue'
import { forecastWeatherOfCapitalObservable } from '@/core/services/weather_service'
import Card from 'primevue/card'

const capitalState = useCapitalStore()
const currentWeather = ref(null)
const forecast = ref(null)
const isInit = computed(() => {
  return currentWeather.value && forecast.value
})

const allWeatherInfo = computed(() => {
  return [
    { date: 'Today', ...currentWeather.value },
    ...forecast.value.map((forecasrday) => {
      return {
        date: forecasrday.date,
        temperature: forecasrday.day.avgtemp_c,
        description: forecasrday.day.condition.text,
        icon: forecasrday.day.condition.icon
      }
    })
  ]
})

onMounted(() => {
  if (capitalState.capital) {
    fetchForecast()
  }
})

capitalState.$subscribe((mutation, state) => {
  if (state.fetchWeatherInfo && state.capital) {
    fetchForecast()
  }
})

function fetchForecast() {
  forecastWeatherOfCapitalObservable(capitalState.capital.name).subscribe((res) => {
    currentWeather.value = {
      temperature: res.current.temp_c,
      description: res.current.condition.text,
      icon: res.current.condition.icon
    }
    forecast.value = res.forecast.forecastday
  })
}
</script>
<template>
  <div
    v-if="!isInit"
    class="absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center align-content-center"
  >
    <div class="card flex justify-content-center">
      <ProgressSpinner
        class="w-9rem h-9rem"
        strokeWidth="2"
        animationDuration="2s"
        aria-label="Load weather data"
      />
    </div>
  </div>
  <div v-else class="mt-3">
    <div class="p-fluid flex flex-row flex-wrap justify-content-evenly">
      <Card v-for="forecastday in allWeatherInfo" :key="forecastday.date" class="w-22rem mb-6 mx-3">
        <template #title>
          <img style="width: 64px" :alt="forecastday.description" :src="forecastday.icon" />
          {{ forecastday.date }}, {{ forecastday.temperature }} C<sup><small>o</small></sup>
        </template>
        <template #content> {{ forecastday.description }}</template>
      </Card>
    </div>
    <div></div>
  </div>
</template>
