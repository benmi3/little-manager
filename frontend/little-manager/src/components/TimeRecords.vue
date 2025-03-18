<script setup>
import { ref } from 'vue'

const timeRecordStartDate = ref('Edit me')
const timeRecordStartTime = ref('Edit me')
const timeRecordStopDate = ref('Edit me')
const timeRecordStopTime = ref('Edit me')
</script>

<template>
  <h2>TimeRecord</h2>
  <input v-model=timeRecordStartDate">
  <input v-model=timeRecordStartTime">
  <input v-model=timeRecordStopDate">
  <input v-model=timeRecordStopTime">
</template>
