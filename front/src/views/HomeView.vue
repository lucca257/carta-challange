<template>
  <div>
    <h1>Vesting Schedule</h1>
    <VestingTable v-if="vestingData.length" :vestingData="vestingData" />
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import VestingTable from "../components/vesting/VestingTable.vue";
import { VestingService } from "../services/Vesting/vesting.service.js";

export default {
  components: { VestingTable },
  setup() {
    const vestingData = ref([]);

    onMounted(async () => {
      vestingData.value = (await VestingService.getVestingSchedules())[0].vestingSchedule; // Using first schedule
    });

    return { vestingData };
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
