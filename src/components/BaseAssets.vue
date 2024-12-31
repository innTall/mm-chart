<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useChartStore } from '../stores/chartStore.js';
const { baseAssets, quoteAsset, symbols } = storeToRefs(useChartStore());
const { addBaseAsset: addAssetToStore, removeBaseAsset } = useChartStore();

const newBaseAsset = ref('');
const deleteMode = ref(false); // Tracks whether delete mode is active

const addBaseAsset = () => {
  if (newBaseAsset.value.trim()) {
    addAssetToStore(newBaseAsset.value.trim().toUpperCase());
    newBaseAsset.value = '';
  }
};
const toggleDeleteMode = () => {
  deleteMode.value = !deleteMode.value;
};

const deleteBaseAsset = (asset) => {
  if (deleteMode.value) {
    removeBaseAsset(asset);
    deleteMode.value = false; // Exit delete mode after deletion
  }
};
</script>

<template>
  <div class="text-sm">
    <!-- Add Base Asset -->
    <div class="flex items-center gap-2 mb-1">
      <input
        v-model="newBaseAsset"
        type="text"
        placeholder="Coin"
        class="w-[6ch] border border-gray-300 bg-gray-900 px-2 py-1 rounded uppercase"
      />
      <button
        @click="addBaseAsset()"
        class="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
      >
        Add
      </button>
      <button
        @click="toggleDeleteMode()"
        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
      {{ deleteMode ? 'Cancel' : 'Delete' }}
      </button>
    </div>

    <!-- Display Base Assets and Symbols -->
    <div  class="flex flex-wrap items-center gap-2">
      <span v-for="asset in baseAssets"
        :key="asset"
        class="px-2 py-1 rounded cursor-pointer hover:bg-gray-800"
        :class="deleteMode ? 'bg-red-300 text-red-700' : 'bg-gray-700 text-white'"
        @click="deleteMode ? deleteBaseAsset(asset) : null"
      >
        {{ asset }}
      </span>
    </div>
    <hr class="border-green-600 mt-2"
  </div>
</template>
<style scoped></style>