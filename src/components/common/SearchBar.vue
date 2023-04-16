<script setup>
import AutoComplete from 'primevue/autocomplete'
import { isProxy, ref, watch } from 'vue'
import { countriesObservableByCapitalQuery } from '@/core/services/country_service'
import { useCapitalStore } from '@/stores/capital'

const capitalState = useCapitalStore()

const selectedCapital = ref(capitalState.capital)
const fetchedCapitals = ref([])

watch(selectedCapital, (newSelectedCapital) => {
  if (isProxy(newSelectedCapital)) {
    capitalState.updateCapital(newSelectedCapital)
  }
})

const search = (event) => {
  countriesObservableByCapitalQuery(event.query).subscribe((capitals) => {
    fetchedCapitals.value = capitals.map((country) => {
      return { name: country.capital[0] ?? '', countryFlag: country.flags.png ?? '' }
    })
  })
}
</script>
<template>
  <div class="w-full sm:w-9 lg:w-6 px-3">
    <AutoComplete
      v-model="selectedCapital"
      optionLabel="name"
      :suggestions="fetchedCapitals"
      @complete="search"
      placeholder="Search of capital"
      forceSelection
      class="p-fluid block"
    >
      <template #option="slotProps">
        <div class="flex align-options-center">
          <img :alt="slotProps.option.name" :src="slotProps.option.countryFlag" class="mr-2 w-1" />
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </AutoComplete>
  </div>
</template>
<style scoped></style>
