<script setup>
import { ref } from 'vue'

const text = ref('Edit me')
</script>

<template>
  <h2>Text Input</h2>
  <input v - model="text">
  <p>{{ text }}</p>
</template>
