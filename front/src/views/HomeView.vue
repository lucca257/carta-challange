<template>
  <div>
    <h1>Vesting Schedule</h1>
    <button @click="loadData">Load Data</button>

    <p v-if="vestingStore.loading">Loading...</p>
    <p v-else-if="vestingStore.error" class="error">{{ vestingStore.error }}</p>
    <VestingTable v-else-if="vestingStore.vestingData.length" :vestingData="vestingStore.vestingData" />
    <p v-else>No data available</p>
  </div>
</template>

<script>
import { onMounted } from "vue";
import VestingTable from "../components/vesting/VestingTable.vue";
import { vestingStore } from "../store/vesting/vesting.store.js";

export default {
  components: { VestingTable },
  setup() {
    const loadData = () => {
      vestingStore.fetchVestingData();
    };

    onMounted(loadData);

    return { vestingStore, loadData };
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
