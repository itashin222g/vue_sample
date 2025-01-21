<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Loading from './components/Loading.vue'
</script>

<template>
  <Loading />
  <main class="w-full mx-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
