<script setup>
import { ref } from 'vue'

const projectName = ref('Edit me')
const projectID = ref(0)
</script>

<template>
  <h2>Text Input</h2>
  <input v - model="projectName">
  <p>Project ID:{{ projectID }}</p>
</template>
