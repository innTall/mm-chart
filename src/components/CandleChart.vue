<script setup>
import { ref, onMounted } from 'vue';
import { createChart } from 'lightweight-charts';
import { fetchKlines } from '../utils/fetchKlines.js';

const chartContainer = ref(null);

onMounted(async () => {
  const chart = createChart(chartContainer.value, {
    width: chartContainer.value.clientWidth,
    height: 400,
    layout: {
      background: { color: '#f1f5f9' },
      textColor: '#374151',
    },
    grid: {
      vertLines: { color: '#e5e7eb' },
      horzLines: { color: '#e5e7eb' },
    },
  });

  const candlestickSeries = chart.addCandlestickSeries();

  const klines = await fetchKlines('DOTUSDT', '15', 200);
  candlestickSeries.setData(klines);
});
</script>

<template>
  <div ref="chartContainer" id="chart-container" class="relative w-full"></div>
</template>