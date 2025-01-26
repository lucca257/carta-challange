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
        <td>{{ row.amount !== undefined ? row.amount.toFixed(2) : 'N/A' }}</td>
        <td>{{ row.cumulativeAmount !== undefined ? row.cumulativeAmount.toFixed(2) : 'N/A' }}</td>
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