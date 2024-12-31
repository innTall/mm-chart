<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import CandleChart from './CandleChart.vue';
import { useChartStore } from '../stores/chartStore.js';
const { baseAssets, quoteAsset } = storeToRefs(useChartStore());

// Compute the sorted list of symbols
const sortedSymbols = computed(() => {
  return baseAssets.value
    .map((baseAsset) => ({
      baseAsset,
      symbol: `${baseAsset}${quoteAsset.value}`,
    }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol)); // Sort alphabetically
});
const candleCount = ref(30); // Number of candles visible on each chart
</script>

<template>
  <div class="grid grid-cols-6 gap-1 p-2">
    <div
      v-for="item in sortedSymbols"
      :key="item.symbol"
      class="border border-gray-700 rounded-lg bg-gray-900"
    >
      <!-- Display Base Asset in the Top Left -->
      <div class="top-1 left-2 text-white text-xs">
        {{ item.baseAsset }}
      </div>
      <!-- Render Candle Chart -->
      <CandleChart :symbol="item.symbol" :baseAsset="item.baseAsset" :candleCount="candleCount"/>
    </div>
  </div>
</template>
<style scoped></style>