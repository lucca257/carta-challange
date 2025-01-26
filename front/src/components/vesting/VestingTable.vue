<template>
  <div class="vesting-table">
    <table>
      <thead>
      <tr>
        <th>Vesting Date</th>
        <th>Shares Vesting</th>
        <th>Cumulative Shares Vested</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in vestingData" :key="index">
        <td>{{ formatDate(row.date) }}</td>
        <td>{{ row.amount.toFixed(2) }}</td>
        <td>{{ row.cumulativeAmount.toFixed(2) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    vestingData: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }
};
</script>

<style scoped>
.vesting-table {
  width: 100%;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}

table {
  width: 90%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-collapse: collapse;
}

th {
  background-color: #2c3e50;
  color: #ffffff;
  padding: 12px;
  text-align: left;
}

td {
  padding: 12px;
  text-align: left;
  color: #2c3e50;
}

tbody tr:nth-child(even) {
  background-color: #f4f4f4;
}

tbody tr:hover {
  background-color: #e0e0e0;
}

@media (max-width: 768px) {
  table {
    width: 100%;
  }
  .vesting-table {
    padding: 10px;
  }
}
</style>