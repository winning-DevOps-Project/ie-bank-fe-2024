<template>
  <div class="transaction-page">
    <!-- Page Background Image and Overlay -->
    <div class="page-overlay"></div>

    <!-- Main Content -->
    <div class="content">
      <h2 class="main-title">Transaction Page</h2>

      <!-- Action Buttons to show/hide forms -->
      <div class="action-buttons">
        <button @click="toggleSendForm" class="btn-action">Send Money</button>
        <button @click="toggleDepositForm" class="btn-action">Deposit Money</button>
      </div>

      <!-- Conditionally show Send Money form -->
      <div v-if="showSendForm" class="form-overlay">
        <div class="form-box">
          <h3>Send Money</h3>
          <button class="close-btn" @click="toggleSendForm">×</button>
          <form @submit.prevent="handleTransaction">
            <!-- From Account Selection -->
            <div class="form-group">
              <label for="fromAccount">From Account</label>
              <select id="fromAccount" v-model="transaction.fromAccountId" required>
                <option value="" disabled>Select an account</option>
                <option
                  v-for="account in accounts"
                  :key="account.account_number"
                  :value="account.account_number"
                >
                  {{ account.name }} ({{ account.account_number }})
                </option>
              </select>
            </div>

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
              <label for="recipient">Recipient Account Number</label>
              <input
                type="text"
                id="recipient"
                v-model="transaction.toAccountId"
                placeholder="Enter recipient account number"
                required
              />
            </div>

            <button type="submit" class="btn-submit">Send Money</button>
          </form>
        </div>
      </div>

      <!-- Conditionally show Deposit form -->
      <div v-if="showDepositForm" class="form-overlay">
        <div class="form-box">
          <h3>Deposit Money</h3>
          <button class="close-btn" @click="toggleDepositForm">×</button>
          <form @submit.prevent="handleDeposit">
            <div class="form-group">
              <label for="depositAccount">Account Number</label>
              <input
                type="text"
                id="depositAccount"
                v-model="deposit.accountNumber"
                placeholder="Enter your account number"
                required
              />
            </div>

            <div class="form-group">
              <label for="depositAmount">Amount</label>
              <input
                type="number"
                id="depositAmount"
                v-model="deposit.amount"
                placeholder="Enter amount to deposit"
                required
              />
            </div>

            <button type="submit" class="btn-submit">Deposit</button>
          </form>
        </div>
      </div>

      <hr />

      <!-- Account Information -->
      <div class="account-info">
        <h3>Your Accounts</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Account Number</th>
              <th>Balance</th>
              <th>Currency</th>
              <th>Status</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.account_number">
              <td>{{ account.name }}</td>
              <td>{{ account.account_number }}</td>
              <td>{{ account.balance }}</td>
              <td>{{ account.currency }}</td>
              <td>{{ account.status }}</td>
              <td>{{ account.country }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <!-- Transaction History -->
      <div class="transaction-history">
        <h3>Your Transaction History</h3>
        <table>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tr in transactions" :key="tr.id">
              <td>{{ tr.sender }}</td>
              <td>{{ tr.receiver }}</td>
              <td>{{ tr.amount }}</td>
              <td>{{ formatDate(tr.timestamp) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <!-- Transaction Summary -->
      <div class="transaction-summary">
        <h3>Last Transaction Summary</h3>
        <p><strong>Transferred Amount:</strong> {{ summary.transferAmount }}</p>
        <p><strong>Date:</strong> {{ summary.date }}</p>
        <p><strong>Currency:</strong> {{ summary.currency }}</p>
        <p><strong>From Account ID:</strong> {{ summary.fromAccountId }}</p>
        <p><strong>To Account ID:</strong> {{ summary.toAccountId }}</p>
        <p><strong>Status:</strong> <span :class="summary.status">{{ summary.status }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transaction: {
        amount: "",
        currency: "USD",
        toAccountId: "",
        fromAccountId: "",
      },
      summary: {
        transferAmount: "",
        date: "",
        currency: "",
        status: "",
        fromAccountId: "",
        toAccountId: "",
      },
      deposit: {
        accountNumber: "",
        amount: ""
      },
      accounts: [],
      transactions: [],
      token: "",
      showSendForm: false,
      showDepositForm: false
    };
  },
  methods: {
    toggleSendForm() {
      this.showSendForm = !this.showSendForm;
    },
    toggleDepositForm() {
      this.showDepositForm = !this.showDepositForm;
    },
    RESTgetAccounts() {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/accounts/`;
      axios
        .get(path, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.accounts) {
            this.accounts = response.data.accounts;
            if (this.accounts.length > 0 && !this.transaction.fromAccountId) {
              this.transaction.fromAccountId = this.accounts[0].account_number;
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
        });
    },
    async RESTgetTransactions() {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/user/transactions/`;
      axios
        .get(path, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          if (response.data && response.data.transactions) {
            // Ensure transactions are sorted descending by date
            this.transactions = response.data.transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            this.updateSummaryWithLastTransaction();
          }
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    },
    updateSummaryWithLastTransaction() {
      if (this.transactions.length > 0) {
        const lastTransaction = this.transactions[0]; // Latest transaction
        console.log("Last Transaction:", lastTransaction); // Debugging

        this.summary.transferAmount = lastTransaction.amount;
        this.summary.date = this.formatDate(lastTransaction.timestamp);
        this.summary.currency = lastTransaction.currency || "USD"; // Adjust based on your data structure
        this.summary.status = lastTransaction.status || "Approved"; // Update based on transaction status if available
        this.summary.fromAccountId = lastTransaction.sender;
        this.summary.toAccountId = lastTransaction.receiver;
      } else {
        // No transactions available
        console.log("No transactions found."); // Debugging
        this.summary.transferAmount = "N/A";
        this.summary.date = "N/A";
        this.summary.currency = "N/A";
        this.summary.status = "N/A";
        this.summary.fromAccountId = "N/A";
        this.summary.toAccountId = "N/A";
      }
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
    async handleTransaction() {
      const path = `${process.env.VUE_APP_API_URL}/transfer/`;
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.post(path, {
          sender_account_number: this.transaction.fromAccountId,
          recipient_account_number: this.transaction.toAccountId,
          amount: Number(this.transaction.amount)
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          alert("Transaction submitted successfully!");
          // Clear the transaction form
          this.transaction.amount = "";
          this.transaction.toAccountId = "";
          // Update accounts and transactions
          await this.RESTgetAccounts();
          await this.RESTgetTransactions();
          // Close the form
          this.toggleSendForm();
        }
      } catch (error) {
        console.error("Error in transaction:", error);
        this.summary.status = "NotApproved";
        alert("Transaction failed!");
      }
    },
    async handleDeposit() {
      const path = `${process.env.VUE_APP_API_URL}/deposit/`;
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.post(path, {
          account_number: this.deposit.accountNumber,
          amount: Number(this.deposit.amount)
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          alert("Deposit completed successfully!");
          // Clear the deposit form
          this.deposit.accountNumber = "";
          this.deposit.amount = "";
          // Update accounts and transactions
          await this.RESTgetAccounts();
          await this.RESTgetTransactions();
          // Close the form
          this.toggleDepositForm();
        }
      } catch (error) {
        console.error("Error during deposit:", error);
        alert("Deposit failed!");
      }
    }
  },
  created() {
    this.RESTgetAccounts();
    this.RESTgetTransactions();
    // Removed the redundant call to updateSummaryWithLastTransaction()
  }
};
</script>

<style scoped>
/* Transaction Page Styling */
.transaction-page {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/4_towers.jpg') no-repeat center center/cover; /* Set background image */
  position: relative;
  font-family: "Arial", sans-serif;
  color: #333;
}

/* Overlay for the background image */
.page-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 35, 102, 0.85); /* Blue overlay with transparency */
  z-index: 1;
}

/* Main content container */
.content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Main Title */
.main-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.btn-action {
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

.btn-action:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

/* Overlay for Forms (Send Money and Deposit) */
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3; /* Above the page overlay and content */
}

/* Form Box Styling */
.form-box {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  position: relative;
  width: 400px;
  max-width: 80%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* Close Button for Forms */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

/* Form Groups */
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

/* Submit Button Styling */
.btn-submit {
  width: 100%;
  background-color: #28a745; /* Green for success */
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
  background-color: #218838;
  transform: scale(1.02);
}

/* Tables and Summary Sections */
.account-info, .transaction-history, .transaction-summary {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.account-info h3, .transaction-history h3, .transaction-summary h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table th, table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
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

  .form-box {
    width: 90%;
  }
}
</style>
