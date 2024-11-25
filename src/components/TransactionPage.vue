<template>
    <div class="transaction-page">
      <h2>Transaction Page</h2>
      
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
  
          <button type="submit">Submit Transaction</button>
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
          amount: '',
          currency: 'USD',
          toAccountId: '',
          fromAccountId: '12345678', // Example from ID (can be dynamic)
        },
        // Transaction Summary
        summary: {
          accountBalance: '$5000', // Placeholder value
          date: new Date().toLocaleString(),
          currency: 'USD',
          status: 'Pending', // Status can be 'Approved' or 'Not Approved'
        },
      };
    },
    methods: {
      handleTransaction() {
        // Simulate transaction processing
        this.summary.accountBalance = `$${5000 - this.transaction.amount}`; // Update balance
        this.summary.currency = this.transaction.currency;
        this.summary.date = new Date().toLocaleString();
        this.summary.status = 'Approved'; // You can add logic for approval/rejection
  
        alert('Transaction submitted successfully!');
      },
    },
  };
  </script>
  
  <style scoped>
  .transaction-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .transaction-form,
  .transaction-summary {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .transaction-summary {
    border-top: 1px solid #ddd;
    padding-top: 10px;
  }
  
  .transaction-summary p {
    margin: 5px 0;
  }
  
  .transaction-summary span.Approved {
    color: green;
    font-weight: bold;
  }
  
  .transaction-summary span.NotApproved {
    color: red;
    font-weight: bold;
  }
  </style>
  