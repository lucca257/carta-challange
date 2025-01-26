<template>
  <div>
    <h1>Vesting Schedule</h1>
    <VestingTable v-if="vestingData.length" :vestingData="vestingData" />
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import VestingTable from "../components/vesting/VestingTable.vue";
import useVestingData from "../mixins/vesting/vesting.mixin.js";

export default {
  components: { VestingTable },
  setup() {
    const { vestingData } = useVestingData();

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
