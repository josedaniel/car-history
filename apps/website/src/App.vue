<script setup lang="ts">
import { ref } from "vue";
import MileageInput from "./components/checklist/MileageInput.vue";
import ChecklistView from "./components/checklist/ChecklistView.vue";

const currentMileage = ref<number | null>(null);
</script>

<template>
  <MileageInput v-if="currentMileage === null" @submit="(km) => (currentMileage = km)" />
  <ChecklistView v-else :mileage="currentMileage" @back="currentMileage = null" />
</template>
