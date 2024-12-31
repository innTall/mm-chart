<script setup>
import { ref, onMounted, watch } from 'vue';
import { createChart } from 'lightweight-charts';
import { fetchKlines } from '../utils/fetchKlines.js';
const props = defineProps({
  symbol: {
    type: String,
    required: true,
  },
  baseAsset: {
    type: String,
    required: true,
  },
  candleCount: {
    type: Number,
    default: 30, // Default number of candles visible
  },
});
const chartContainer = ref(null);

onMounted(async () => {
  console.log(chartContainer.value); // Should not be null
  const chart = createChart(chartContainer.value, {
    width: chartContainer.value.clientWidth,
    height: chartContainer.value.clientHeight,
    layout: {
      background: { color: '#111827' },
      textColor: '#fff',
      fontSize: 8,
    },
    grid: {
      vertLines: { color: '#1f2937' },
      horzLines: { color: '#1f2937' },
    },
    timeScale: {
      visible: false, // Hide the date scale
      rightOffset: 3,
    },
    rightPriceScale: {
      visible: false, // Hide the price scale
    },
    crosshair: {
      mode: 0
    }
  });

  const candlestickSeries = chart.addCandlestickSeries();
  const klines = await fetchKlines(props.symbol, '15', 200);
  console.log('Fetched klines:', klines);
  if (klines.length === 0) {
    console.error('No data fetched for symbol:', props.symbol);
  }
  if (klines.length > 0) {
    // Set data and configure visible range
    candlestickSeries.setData(klines);
    chart.timeScale().setVisibleRange({
      from: klines[klines.length - props.candleCount]?.time || 0,
      to: klines[klines.length - 1]?.time || 0,
    });
  } else {
    console.error('No data available for:', props.symbol);
  }
});
</script>

<template>
  <div ref="chartContainer" id="chart-container" class="relative w-full h-[100px]"></div>
</template>