<template>
  <div class="vesting-nav">
    <ul>
      <li v-for="(label, index) in sortedLabels" :key="index" @click="loadVestingData(label)">
        {{ label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedLabels() {
      return this.labels.sort((a, b) => {
        const numA = parseInt(a.split('-')[1]);
        const numB = parseInt(b.split('-')[1]);
        return numA - numB;
      });
    }
  },
  methods: {
    loadVestingData(label) {
      this.$emit('load-data', label);
    }
  }
};
</script>

<style scoped>
.vesting-table {
  width: 100%;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 10px;
  text-align: left;
  color: #2c3e50;
}

th {
  background: #ecf0f1;
  color: #2c3e50;
}

tr:nth-child(even) {
  background: #f4f4f4;
}

tr:hover {
  background: #e0e0e0;
}
</style>