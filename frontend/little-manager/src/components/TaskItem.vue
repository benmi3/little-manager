<script setup>
import { ref } from 'vue'

const taskName = ref('Edit me')
const taskID = ref(0)
</script>

<template>
  <h2>Text Input</h2>
  <input v - model="taskName">
  <p>Task ID:{{ taskID }}</p>
</template>
