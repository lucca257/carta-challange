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
/* 🎨 Soft background for better readability */
.vesting-table {
  width: 100%;
  background-color: #f8f9fa; /* Light gray background */
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}

/* 🏛️ Table Styling */
table {
  width: 90%;
  max-width: 800px;
  background-color: #fff; /* White table */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-collapse: collapse;
}

/* 📌 Header Styling */
th {
  background-color: #2c3e50; /* Dark gray header */
  color: #ffffff;
  padding: 12px;
  text-align: left;
}

/* 📌 Table Rows Styling */
td {
  padding: 12px;
  text-align: left;
  color: #2c3e50; /* Dark gray text */
}

/* 🌓 Alternate Row Colors */
tbody tr:nth-child(even) {
  background-color: #f4f4f4; /* Light gray rows */
}

tbody tr:hover {
  background-color: #e0e0e0; /* Hover effect */
}

/* ✨ Responsive Design */
@media (max-width: 768px) {
  table {
    width: 100%;
  }
  .vesting-table {
    padding: 10px;
  }
}
</style>