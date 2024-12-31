import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useChartStore = defineStore('chartStore', () => {
  const baseAssets = ref([]);
  const quoteAsset = ref('USDT'); // Default value
  const symbols = computed(() =>
    baseAssets.value.map((base) => `${base}${quoteAsset.value}`)
  );

  const addBaseAsset = (asset) => {
    if (!baseAssets.value.includes(asset)) {
      baseAssets.value.push(asset);
      baseAssets.value.sort(); // Sort alphabetically after adding
    }
  };

  const removeBaseAsset = (asset) => {
    baseAssets.value = baseAssets.value.filter((item) => item !== asset);
    baseAssets.value.sort(); // Sort alphabetically after removing
  };

  return { baseAssets, quoteAsset, symbols, addBaseAsset, removeBaseAsset };
});