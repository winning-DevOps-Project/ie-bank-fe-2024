<template>
  <div class="transaction-page">
    <h2 class="main-title">Transaction Page</h2>

    <!-- Top Section: Input Form -->
    <div class="transaction-form">
      <form @submit.prevent="handleTransaction">
        <!-- Amount Input -->
        <div class="form-group">
          <label for="amount">Amount</label>
          <input
            type="number"
            id="amount"
            v-model="transaction.amount"
            placeholder="Enter amount"
            required
          />
        </div>

        <!-- Currency Selection -->
        <div class="form-group">
          <label for="currency">Currency</label>
          <select id="currency" v-model="transaction.currency" required>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
        </div>

        <!-- Recipient Account ID -->
        <div class="form-group">
          <label for="recipient">Recipient Account ID</label>
          <input
            type="text"
            id="recipient"
            v-model="transaction.toAccountId"
            placeholder="Enter recipient account ID"
            required
          />
        </div>

        <button type="submit" class="btn-submit">Submit Transaction</button>
      </form>
    </div>

    <hr />

    <!-- Bottom Section: Transaction Summary -->
    <div class="transaction-summary">
      <h3>Transaction Summary</h3>
      <p><strong>Account Balance:</strong> {{ summary.accountBalance }}</p>
      <p><strong>Date:</strong> {{ summary.date }}</p>
      <p><strong>Currency:</strong> {{ summary.currency }}</p>
      <p><strong>From Account ID:</strong> {{ transaction.fromAccountId }}</p>
      <p><strong>To Account ID:</strong> {{ transaction.toAccountId }}</p>
      <p><strong>Status:</strong> <span :class="summary.status">{{ summary.status }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Transaction Input Fields
      transaction: {
        amount: "",
        currency: "USD",
        toAccountId: "",
        fromAccountId: "12345678", // Example from ID (can be dynamic)
      },
      // Transaction Summary
      summary: {
        accountBalance: "$5000", // Placeholder value
        date: new Date().toLocaleString(),
        currency: "USD",
        status: "Pending", // Status can be 'Approved' or 'Not Approved'
      },
    };
  },
  methods: {
    handleTransaction() {
      // Simulate transaction processing
      this.summary.accountBalance = `$${5000 - this.transaction.amount}`; // Update balance
      this.summary.currency = this.transaction.currency;
      this.summary.date = new Date().toLocaleString();
      this.summary.status = "Approved"; // You can add logic for approval/rejection

      alert("Transaction submitted successfully!");
    },
  },
};
</script>

<style scoped>
/* General Page Styling */
.transaction-page {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  color: #333;
}

.main-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

/* Form Styling */
.transaction-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 5px;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

/* Submit Button */
.btn-submit {
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px 15px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

/* Summary Section */
.transaction-summary {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.transaction-summary h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.transaction-summary p {
  font-size: 1rem;
  margin: 8px 0;
}

.transaction-summary span.Approved {
  color: green;
  font-weight: bold;
}

.transaction-summary span.NotApproved {
  color: red;
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
  .transaction-page {
    padding: 20px;
  }

  .btn-submit {
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>
