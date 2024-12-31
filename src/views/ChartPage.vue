<script setup>
import CandleChart from '../components/CandleChart.vue';
import BaseAssets from '../components/BaseAssets.vue';
</script>

<template>
  <BaseAssets />
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <CandleChart />
  </div>
</template>
<style scoped></style>