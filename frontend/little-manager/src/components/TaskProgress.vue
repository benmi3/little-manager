<script setup>
import { ref } from 'vue'

const taskName = ref('Edit me')
const taskID = ref(0)
const taskProgress = ref(0.0)
</script>

<template>
  <h2>Text Input</h2>
  <p>Task ID:{{ taskID }}</p>
  <input v - model="taskProgress">
</template>
