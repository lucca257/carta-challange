<template>
  <div class="vesting-nav">
    <nav>
      <ul>
        <li
            v-for="schedule in vestingStore.vestingData"
            :key="schedule.label"
            :class="{ active: vestingStore.selectedVestingSchedule?.label === schedule.label }"
            @click="onSelect(schedule.label)">
          {{ schedule.label }}
        </li>
      </ul>
    </nav>
    <p v-if="vestingStore.selectedVestingSchedule" class="vesting-manager">
      {{ vestingStore.selectedVestingSchedule.vesting_manager_name }}
    </p>
  </div>
</template>

<script>
import { vestingStore } from "../../store/vesting/vesting.store.js";

export default {
  methods: {
    onSelect(label) {
      this.$emit('load-data', label);
    }
  },
  computed: {
    vestingStore() {
      return vestingStore;
    }
  }
};
</script>

<style scoped>
.vesting-nav {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  text-align: center;
}

nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

nav li {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #2c3e50;
  color: white;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  border: 3px solid transparent;
  font-weight: 500;
}

nav li.active {
  background-color: #1abc9c;
  border-color: #16a085;
  font-weight: bold;
  color: white;
}

nav li:hover {
  background-color: #16a085;
  border-color: #0e6655;
}

.vesting-manager {
  margin-top: 10px;
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.2em;
}
</style>
