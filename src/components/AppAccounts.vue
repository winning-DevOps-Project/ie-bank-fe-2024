<template>
  <div class="jumbotron vertical-center bg-light">
    <!-- Overlay for Background Image -->
    <div class="page-overlay"></div>

    <div class="container content">
      <!-- Header Section -->
      <div class="row align-items-center mb-4">
        <div class="col-md-6">
          <!-- Dynamic Headings -->
          <h1 class="mb-0">{{ heading1 }}</h1>
          <h4 class="text-muted">{{ heading2 }}</h4>
        </div>
        <div class="col-md-6 text-md-right text-sm-right text-left mt-3 mt-md-0">
          <!-- Button Group -->
          <div class="btn-group" role="group" aria-label="Header Actions">
            <!-- Create Account Button (Visible to non-admin users) -->
            <button
              type="button"
              class="btn btn-success btn-sm"
              v-b-modal.account-modal
              v-if="!isAdmin"
            >
              Create Account
            </button>

            <!-- Admin-Specific Button -->
            <button
              v-if="isAdmin"
              type="button"
              class="btn btn-primary btn-sm ml-2"
              @click="showAdminToolsModal"
            >
              Admin Tools
            </button>

            <!-- Transaction Button --> 
            <button 
            type="button" 
            class="btn btn-primary btn-sm ml-2" 
            v-if="!isAdmin" 
            @click="goToTransactionPage"
            > 
              Transactions 
            </button>

            <!-- Logout Button -->
            <button
              type="button"
              class="btn btn-danger btn-sm ml-2"
              @click="logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <!-- Admin Accounts Search Bar -->
      <div v-if="isAdmin" class="row mb-4">
        <div class="col-md-6">
          <b-input-group>
            <b-form-input
              v-model="accountSearchQuery"
              placeholder="Search accounts by owner or account number..."
              @input="searchAccounts"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-secondary" @click="resetAccountSearch">
                Reset
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>

      <!-- Alert Message -->
      <b-alert
        v-if="showMessage"
        :variant="messageVariant"
        dismissible
        @dismissed="showMessage = false"
      >
        {{ message }}
      </b-alert>

      <!-- Accounts Table -->
      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Account Owner</th>
              <th scope="col">Account Number</th>
              <th scope="col">Balance</th>
              <th scope="col">Country</th>
              <th scope="col">Currency</th>
              <th scope="col">Status</th>
              <th scope="col">Date Created</th>
              <th v-if="isAdmin" scope="col">Actions</th> <!-- Admin can see actions -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in filteredAccounts" :key="account.id">
              <td>{{ account.name }}</td>
              <td>{{ account.account_number }}</td>
              <td>{{ formatCurrency(account.balance, account.currency) }}</td>
              <td>{{ account.country }}</td>
              <td>{{ account.currency }}</td>
              <td>
                <span
                  :class="['badge', account.status === 'Active' ? 'badge-success' : 'badge-danger']"
                >
                  {{ account.status }}
                </span>
              </td>
              <td>{{ formatDate(account.created_at) }}</td>
              <td v-if="isAdmin">
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-info btn-sm"
                    v-b-modal.edit-account-modal
                    @click="editAccount(account)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="deleteAccount(account)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredAccounts.length === 0">
              <td :colspan="isAdmin ? 8 : 7" class="text-center">No accounts found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer Section -->
      <footer class="text-center mt-4">
        <small class="text-muted">© {{ currentYear }} DEVOPPS Bank. All Rights Reserved.</small>
      </footer>
    </div>

    <!-- Create Account Modal -->
    <b-modal ref="addAccountModal" id="account-modal" title="Create a New Account" hide-backdrop hide-footer>
      <b-form @submit.prevent="onSubmit" class="w-100">
        <b-form-group
          id="form-name-group"
          label="Account ID:"
          label-for="form-name-input"
          label-cols-sm="3"
          label-align-sm="right"
          class="d-flex align-items-center"
        >
          <b-form-input
            id="form-name-input"
            type="text"
            v-model="createAccountForm.name"
            placeholder="Enter Account ID"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-currency-group"
          label="Currency:"
          label-for="form-currency-input"
          label-cols-sm="3"
          label-align-sm="right"
          class="d-flex align-items-center"
        >
          <b-form-input
            id="form-currency-input"
            type="text"
            v-model="createAccountForm.currency"
            placeholder="e.g., USD, EUR"
            required
          ></b-form-input>
        </b-form-group>
        <div class="text-right">
          <b-button type="submit" variant="success">Submit</b-button>
        </div>
      </b-form>
    </b-modal>

    <!-- Edit Account Modal -->
    <b-modal ref="editAccountModal" id="edit-account-modal" title="Edit Account" hide-backdrop hide-footer>
      <b-form @submit.prevent="onSubmitUpdate" class="w-100">
        <b-form-group
          id="form-edit-name-group"
          label="Account Name:"
          label-for="form-edit-name-input"
          label-cols-sm="3"
          label-align-sm="right"
          class="d-flex align-items-center mb-3"
        >
          <b-form-input
            id="form-edit-name-input"
            type="text"
            v-model="editAccountForm.name"
            placeholder="Enter New Account ID"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-edit-country-group"
          label="Country:"
          label-for="form-edit-country-input"
          label-cols-sm="3"
          label-align-sm="right"
          class="d-flex align-items-center mb-3"
        >
          <b-form-input
            id="form-edit-country-input"
            type="text"
            v-model="editAccountForm.country"
            placeholder="Enter New Country"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-edit-currency-group"
          label="Currency:"
          label-for="form-edit-currency-input"
          label-cols-sm="3"
          label-align-sm="right"
          class="d-flex align-items-center mb-3"
        >
          <b-form-input
            id="form-edit-currency-input"
            type="text"
            v-model="editAccountForm.currency"
            placeholder="Enter New Currency"
          ></b-form-input>
        </b-form-group>
        <div class="text-right">
          <b-button type="submit" variant="info">Update</b-button>
        </div>
      </b-form>
    </b-modal>

    <!-- Admin Tools Modal -->
    <b-modal ref="adminToolsModal" id="admin-tools-modal" title="Admin Tools" hide-backdrop hide-footer>
      <b-form @submit.prevent="searchTransactions" class="w-100">
        <b-form-group
          id="form-transaction-user-group"
          label="User Identifier:"
          label-for="form-transaction-user-input"
          label-cols-sm="4"
          label-align-sm="right"
          class="d-flex align-items-center mb-3"
        >
          <b-form-input
            id="form-transaction-user-input"
            type="text"
            v-model="transactionSearchForm.userIdentifier"
            placeholder="Enter Username or Account Number"
            required
          ></b-form-input>
        </b-form-group>
        <div class="text-right">
          <b-button type="submit" variant="primary">Search Transactions</b-button>
          <b-button variant="secondary" @click="resetTransactionSearch" class="ml-2">Reset</b-button>
        </div>
      </b-form>

      <!-- Transactions Table -->
      <div v-if="searchedTransactions.length > 0" class="mt-4">
        <h5>Transactions for "{{ transactionSearchForm.userIdentifier }}"</h5>
        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col">Transaction ID</th>
                <th scope="col">Sender</th>
                <th scope="col">Receiver</th>
                <th scope="col">Amount</th>
                <th scope="col">Currency</th>
                <th scope="col">Status</th>
                <th scope="col">Date/Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in searchedTransactions" :key="transaction.id">
                <td>{{ transaction.id }}</td>
                <td>{{ transaction.sender }}</td>
                <td>{{ transaction.receiver }}</td>
                <td>{{ formatCurrency(transaction.amount, transaction.currency) }}</td>
                <td>{{ transaction.currency }}</td>
                <td>
                  <span
                    :class="['badge', transaction.status === 'Approved' ? 'badge-success' : 'badge-danger']"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
                <td>{{ formatDate(transaction.timestamp) }}</td>
              </tr>
              <tr v-if="searchedTransactions.length === 0">
                <td colspan="7" class="text-center">No transactions found for the specified user.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppAccounts",
  data() {
    return {
      accounts: [],
      filteredAccounts: [],
      createAccountForm: {
        name: "",
        currency: "",
      },
      editAccountForm: {
        id: "",
        country: "",
        currency: "",
        name: "",
        account_number: ""
      },
      showMessage: false,
      message: "",
      messageVariant: 'success', // For alert styling
      currentYear: new Date().getFullYear(),

      // Admin Accounts Search
      accountSearchQuery: "",

      // Admin Transactions Search
      transactionSearchForm: {
        userIdentifier: ""
      },
      searchedTransactions: [],
    };
  },
  computed: {
    // Determine if the user is an admin
    isAdmin() {
      // 'is_admin' should be stored as "true" or "false" (strings) in localStorage
      return localStorage.getItem("is_admin") === "true";
    },
    // Dynamic headings based on admin status
    heading1() {
      return this.isAdmin ? "Admin Dashboard" : "Your Accounts";
    },
    heading2() {
      return this.isAdmin
        ? "Manage all accounts and users."
        : "Manage your money. Safely.";
    },
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/

    // GET function to fetch accounts
    RESTgetAccounts() {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/accounts/`;
      console.log("Fetching accounts from:", path); // Debugging line
      axios
        .get(path, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("API Response:", response); // Debugging line
          // Adjust based on actual API response structure
          if (response.data && response.data.accounts) {
            this.accounts = response.data.accounts;
            this.filteredAccounts = response.data.accounts;
          } else {
            console.warn("Unexpected API response structure:", response.data);
            this.message = "No accounts found.";
            this.messageVariant = 'warning';
            this.showMessage = true;
            this.filteredAccounts = [];
          }
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
          this.message = "Failed to fetch accounts.";
          this.messageVariant = 'danger';
          this.showMessage = true;
          this.filteredAccounts = [];
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        });
    },

    // Navigate to Transaction Page
    goToTransactionPage() {
      this.$router.push("/transaction");
    },

    // POST function to create a new account
    RESTcreateAccount(payload) {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/accounts/`;
      axios
        .post(path, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Account created:", response);
          this.RESTgetAccounts();
          this.message = "Account created successfully!";
          this.messageVariant = 'success';
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error("Error creating account:", error);
          this.message = "Failed to create account.";
          this.messageVariant = 'danger';
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        });
    },

    // PUT function to update an existing account
    RESTupdateAccount(payload, accountNumber) {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/accounts/${accountNumber}/`;
      axios
        .put(path, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Account updated:", response);
          this.RESTgetAccounts();
          this.message = "Account updated successfully!";
          this.messageVariant = 'success';
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error("Error updating account:", error);
          this.message = "Failed to update account.";
          this.messageVariant = 'danger';
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        });
    },

    // DELETE function to remove an account
    RESTdeleteAccount(accountId) {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/accounts/${accountId}/`;
      axios
        .delete(path, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Account deleted:", response);
          this.RESTgetAccounts();
          this.message = "Account deleted successfully!";
          this.messageVariant = 'success';
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          this.message = "Failed to delete account.";
          this.messageVariant = 'danger';
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        });
    },

    // GET function to search transactions by user identifier
    RESTsearchTransactions(userIdentifier) {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/transactions/search/`;
      axios
        .get(path, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            user: userIdentifier,
          },
        })
        .then((response) => {
          console.log("Transactions Search Response:", response);
          if (response.data && response.data.transactions) {
            this.searchedTransactions = response.data.transactions;
          } else {
            console.warn("Unexpected API response structure:", response.data);
            this.searchedTransactions = [];
          }
        })
        .catch((error) => {
          console.error("Error searching transactions:", error);
          this.message = "Failed to search transactions.";
          this.messageVariant = 'danger';
          this.showMessage = true;
          this.searchedTransactions = [];
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        });
    },

    /***************************************************
     * FORM MANAGEMENT
     ***************************************************/

    // Initialize forms to empty
    initForm() {
      this.createAccountForm.name = "";
      this.createAccountForm.currency = "";
      this.editAccountForm.id = "";
      this.editAccountForm.name = "";
      this.editAccountForm.country = "";
      this.editAccountForm.currency = "";
      this.editAccountForm.account_number = "";
    },

    // Handle submit event for creating an account
    onSubmit() {
      console.log("Submitting create account form:", this.createAccountForm); // Debugging line
      this.$refs.addAccountModal.hide();
      const payload = {
        name: this.createAccountForm.name,
        currency: this.createAccountForm.currency,
      };
      this.RESTcreateAccount(payload);
      this.initForm();
    },

    // Handle submit event for updating an account
    onSubmitUpdate() {
      console.log("Submitting edit account form:", this.editAccountForm); // Debugging line
      this.$refs.editAccountModal.hide();
      const payload = {
        name: this.editAccountForm.name,
        country: this.editAccountForm.country,
        currency: this.editAccountForm.currency,
      };
      this.RESTupdateAccount(payload, this.editAccountForm.account_number);
      this.initForm();
    },

    // Handle edit button click
    editAccount(account) {
      console.log("Editing account:", account); // Debugging line
      this.editAccountForm.id = account.id;
      this.editAccountForm.name = account.name;
      this.editAccountForm.country = account.country;
      this.editAccountForm.currency = account.currency;
      this.editAccountForm.account_number = account.account_number;
      this.$refs.editAccountModal.show();
    },

    // Handle delete button click
    deleteAccount(account) {
      if (confirm(`Are you sure you want to delete the account "${account.name}"?`)) {
        console.log("Deleting account ID:", account.id); // Debugging line
        this.RESTdeleteAccount(account.account_number);
      }
    },

    // Logout user
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("is_admin"); // Optionally remove is_admin
      this.$router.push("/");
    },

    // Show Admin Tools Modal
    showAdminToolsModal() {
      this.$refs.adminToolsModal.show();
    },

    // Handle Admin Transactions Search Submit
    searchTransactions() {
      const userIdentifier = this.transactionSearchForm.userIdentifier.trim();
      if (userIdentifier) {
        this.RESTsearchTransactions(userIdentifier);
      } else {
        this.message = "Please enter a valid user identifier.";
        this.messageVariant = 'warning';
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      }
    },

    // Reset Transactions Search
    resetTransactionSearch() {
      this.transactionSearchForm.userIdentifier = "";
      this.searchedTransactions = [];
    },

    // Handle Admin Accounts Search
    searchAccounts() {
      const query = this.accountSearchQuery.trim().toLowerCase();
      if (query === "") {
        this.filteredAccounts = this.accounts;
      } else {
        this.filteredAccounts = this.accounts.filter(account => {
          return (
            account.name.toLowerCase().includes(query) ||
            account.account_number.toLowerCase().includes(query)
          );
        });
      }
    },

    // Reset Accounts Search
    resetAccountSearch() {
      this.accountSearchQuery = "";
      this.filteredAccounts = this.accounts;
    },

    // Optional: Admin-specific action
    adminAction() {
      this.showAdminToolsModal();
    },

    // Format currency based on currency code
    formatCurrency(amount, currency) {
      if (!currency || typeof currency !== 'string') {
        console.warn(`Invalid currency code: ${currency}. Using default 'USD'.`);
        currency = 'USD'; // Default currency
      }

      try {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency.toUpperCase(),
        }).format(amount);
      } catch (error) {
        console.error(`Error formatting currency with code '${currency}':`, error);
        return amount; // Fallback to raw amount
      }
    },

    // Format date to a readable format
    formatDate(dateString) {
      try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      } catch (error) {
        console.error("Error formatting date:", error);
        return dateString;
      }
    },
  },

  /***************************************************
   * LIFECYCLE HOOKS
   ***************************************************/
  created() {
    this.RESTgetAccounts();
  },
};
</script>

<style scoped>
/* General Styling */
.jumbotron {
  padding: 2rem 1rem;
  position: relative; /* To position the overlay correctly */
  background: url("@/assets/4_torres2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh; /* Full viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Overlay for Background Image */
.page-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 35, 102, 0.85); /* Semi-transparent blue overlay */
  z-index: 1; /* Positioned below the content */
}

/* Content Styling */
.content {
  position: relative;
  z-index: 2; /* Positioned above the overlay */
  width: 100%;
  max-width: 1200px;
  background-color: rgba(255, 255, 255, 0.95); /* Slightly transparent white background */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Header Section */
.row.align-items-center.mb-4 {
  margin-bottom: 1.5rem;
}

/* Button Group */
.btn-group .btn {
  min-width: 120px;
}

/* Alert Message */
.b-alert {
  margin-bottom: 1rem;
}

/* Table Styling */
.table th,
.table td {
  vertical-align: middle;
}

/* Badge Styling */
.badge-success {
  background-color: #28a745;
}

.badge-danger {
  background-color: #dc3545;
}

/* Modal Form Inputs */
.b-modal .form-group .form-control {
  border-radius: 5px;
}

/* Footer Section */
footer {
  margin-top: 2rem;
}

/* Responsive Design */
@media (max-width: 767.98px) {
  .btn-group {
    flex-direction: column;
    width: 100%;
  }
  .btn-group .btn {
    width: 100%;
    margin-bottom: 5px;
  }
  .content {
    padding: 20px;
  }
}
</style>
