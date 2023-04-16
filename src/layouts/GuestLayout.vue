<script setup>
import { RouterView } from 'vue-router'
import GuestHeader from '@/components/guest/GuestHeader.vue'
import GuestFooter from '@/components/guest/GuestFooter.vue'
</script>
<template>
  <div class="flex flex-column min-h-screen w-screen overflow-x-hidden">
    <div class="flex-none">
      <GuestHeader />
    </div>
    <main class="flex-grow-1 bg-black-alpha-10 relative">
      <div class="mx-auto px-2 py-3 sm:w-full ">
        <RouterView />
      </div>
    </main>
    <div class="flex-none">
      <GuestFooter />
    </div>
  </div>
</template>
<style scoped></style>
