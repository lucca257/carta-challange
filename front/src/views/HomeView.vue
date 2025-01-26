<template>
  <div>
    <h1>Vesting Schedule</h1>

    <VestingNav @load-data="loadVestingData" />

    <p v-if="vestingStore.loading">Loading...</p>
    <p v-else-if="vestingStore.error" class="error">{{ vestingStore.error }}</p>

    <VestingTable
        v-else-if="selectedVestingData.length"
        :vestingData="selectedVestingData"
        :vestingManagerName="vestingStore.selectedVestingSchedule?.vestingManager"
    />
    <p v-else>No data available</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import VestingTable from "../components/vesting/VestingTable.vue";
import VestingNav from "../components/vesting/VestingNav.vue";
import { vestingStore } from "../store/vesting/vesting.store.js";

export default {
  components: { VestingTable, VestingNav },
  setup() {
    const selectedVestingData = computed(() => vestingStore.selectedVestingSchedule?.vestingSchedule || []);

    onMounted(async () => {
      await vestingStore.fetchVestingData();
    });

    const loadVestingData = (label) => {
      vestingStore.selectVestingSchedule(label);
    };

    return { vestingStore, selectedVestingData, loadVestingData };
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