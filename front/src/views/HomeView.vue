<template>
  <div>
    <h1>Vesting Schedule</h1>

    <VestingNav :labels="vestingLabels" @load-data="loadVestingData" />

    <p v-if="vestingStore.loading">Loading...</p>
    <p v-else-if="vestingStore.error" class="error">{{ vestingStore.error }}</p>

    <VestingTable v-else-if="selectedVestingData.length" :vestingData="selectedVestingData" />
    <p v-else>No data available</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import VestingTable from "../components/vesting/VestingTable.vue";
import VestingNav from "../components/vesting/VestingNav.vue";
import { vestingStore } from "../store/vesting/vesting.store.js";

export default {
  components: { VestingTable, VestingNav },
  setup() {
    const selectedVestingData = ref([]);
    const vestingLabels = ref([]);

    onMounted(async () => {
      await vestingStore.fetchVestingData();
      vestingLabels.value = vestingStore.vestingData.map(item => item.label);
    });

    const loadVestingData = (label) => {
      selectedVestingData.value = vestingStore.getVestingDataByLabel(label);
    };

    return { vestingStore, selectedVestingData, vestingLabels, loadVestingData };
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