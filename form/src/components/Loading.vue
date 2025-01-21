<template>
  <div
    v-if="loadingStore.isLoading"
    class="fixed inset-0 bg-gray-200 bg-opacity-75 flex justify-center items-center z-40"
  >
    <div class="spinner"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useLoadingStore } from '@/stores/loadingStore'

const loadingStore = useLoadingStore()
</script>

<style>
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #3498db;
  width: 50px;
  height: 50px;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
