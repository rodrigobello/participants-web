<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div >
    <h1 class="text-3xl font-bold underline">
    Hello world!
    </h1>
  </div>
</template>

<style scoped>
</style>
