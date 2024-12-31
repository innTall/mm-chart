<script setup>
import { ref } from 'vue';
import LogoItem from './layouts/LogoItem.vue';

// Reactive variables
const interval = ref('15'); // Default value: '15'
const quoteAsset = ref('USDT'); // Default value: 'USDT'
const limit = ref(200); // Default value: 200

// Function to handle interval change
const setIntervalValue = (value) => {
  interval.value = value;
  console.log('Selected Interval:', interval.value);
};

// Function to handle input changes
const updateQuoteAsset = (event) => {
  quoteAsset.value = event.target.value.toUpperCase();
  console.log('Updated Quote Asset:', quoteAsset.value);
};

const updateLimit = (event) => {
  limit.value = Number(event.target.value);
  console.log('Updated Limit:', limit.value);
};
</script>

<template>
	<div class="">
		<div class="flex justify-between">
			<div>
				<LogoItem />
			</div>
			<!-- Buttons and Inputs -->
			<div class="flex items-center text-sm gap-1">
        <!-- Interval Buttons -->
        <div class="flex space-x-2">
          <button
            v-for="btnValue in ['5', '15', '60', '240', 'D']"
            :key="btnValue"
            class="px-2 py-1 rounded  bg-gray-900 text-white hover:bg-gray-700"
            :class="{ 'bg-gray-700': interval === btnValue }"
            @click="setIntervalValue(btnValue)"
          >
            {{ btnValue }}
          </button>
        </div>
        <!-- Quote Asset Input -->
        <div>
          <input
            id="quoteAsset"
            type="text"
            v-model="quoteAsset"
						placeholder="USDT"
            @input="updateQuoteAsset"
            class="w-[6ch] border border-gray-300 bg-gray-900 px-2 py-1 rounded text-xs uppercase"
          />
        </div>
        <!-- Limit Input -->
        <div>
          <input
            id="limit"
            type="number"
            v-model="limit"
						placeholder="200-1000"
            @input="updateLimit"
            class="w-[6ch] border border-gray-300 bg-gray-900 px-2 py-1 rounded text-xs"
          />
        </div>
      </div>
			<!-- Navigation Links -->
			<div class="flex justify-between text-sm">
				<div class="text-center">
					<RouterLink :to="{ name: 'ChartPage' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Chart |</span>
					</RouterLink>
					<RouterLink :to="{ name: 'TestPage' }" v-slot="{ isActive }">
						<span :class="[isActive ? 'text-blue-500 font-bold' : 'text-gray-500']"> Test</span>
					</RouterLink>
				</div>
			</div>
		</div>
		<hr class="border-green-600 mt-2">
	</div>
</template>
<style scoped></style>
