<template>
  <div class="jumbotron vertical-center bg-light">
    <div class="container">
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

            <!-- Transaction Button -->
            <button
              type="button"
              class="btn btn-primary btn-sm ml-2"
              @click="goToTransactionPage"
            >
              Transactions
            </button>

            <!-- Admin-Specific Button -->
            <button
              v-if="isAdmin"
              type="button"
              class="btn btn-warning btn-sm ml-2"
              @click="adminAction"
            >
              Admin Tools
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
            <tr v-for="account in accounts" :key="account.id">
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
            <tr v-if="accounts.length === 0">
              <td :colspan="isAdmin ? 8 : 7" class="text-center">No accounts available.</td>
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
  </div>
</template>

<script>
import axios from "axios";
import { getApiUrl } from "@/utils/getUrl";

export default {
  name: "AppAccounts",
  data() {
    return {
      accounts: [],
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
    };
  },
  computed: {
    isAdmin() {
      return localStorage.getItem("is_admin") === "true";
    },
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
    RESTgetAccounts() {
      const token = localStorage.getItem("access_token");
      const path = getApiUrl("accounts");
      console.log("Fetching accounts from:", path);
      axios
        .get(path, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("API Response:", response);
          if (response.data && response.data.accounts) {
            this.accounts = response.data.accounts;
          } else {
            console.warn("Unexpected API response structure:", response.data);
            this.message = "No accounts found.";
            this.messageVariant = 'warning';
            this.showMessage = true;
          }
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
          this.message = "Failed to fetch accounts.";
          this.messageVariant = 'danger';
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        });
    },

    RESTcreateAccount(payload) {
      const token = localStorage.getItem("access_token");
      const path = getApiUrl("accounts");
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

    RESTupdateAccount(payload, accountNumber) {
      const token = localStorage.getItem("access_token");
      const path = getApiUrl(`accounts/${accountNumber}`);
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

    RESTdeleteAccount(accountId) {
      const token = localStorage.getItem("access_token");
      const path = getApiUrl(`accounts/${accountId}`);
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

    /***************************************************
     * FORM MANAGEMENT
     ***************************************************/
    initForm() {
      this.createAccountForm.name = "";
      this.createAccountForm.currency = "";
      this.editAccountForm.id = "";
      this.editAccountForm.name = "";
    },

    onSubmit() {
      console.log("Submitting create account form:", this.createAccountForm);
      this.$refs.addAccountModal.hide();
      const payload = {
        name: this.createAccountForm.name,
        currency: this.createAccountForm.currency,
      };
      this.RESTcreateAccount(payload);
      this.initForm();
    },

    onSubmitUpdate() {
      console.log("Submitting edit account form:", this.editAccountForm);
      this.$refs.editAccountModal.hide();
      const payload = {
        name: this.editAccountForm.name,
        country: this.editAccountForm.country,
        currency: this.editAccountForm.currency,
      };
      this.RESTupdateAccount(payload, this.editAccountForm.account_number);
      this.initForm();
    },

    editAccount(account) {
      console.log("Editing account:", account);
      this.editAccountForm.id = account.id;
      this.editAccountForm.name = account.name;
      this.editAccountForm.country = account.country;
      this.editAccountForm.currency = account.currency;
      this.editAccountForm.account_number = account.account_number;
      this.$refs.editAccountModal.show();
    },

    deleteAccount(account) {
      if (confirm(`Are you sure you want to delete the account "${account.name}"?`)) {
        console.log("Deleting account ID:", account.id);
        this.RESTdeleteAccount(account.account_number);
      }
    },

    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("is_admin");
      this.$router.push("/");
    },

    adminAction() {
      alert("Admin action triggered.");
    },

    formatCurrency(amount, currency) {
      if (!currency || typeof currency !== 'string') {
        console.warn(`Invalid currency code: ${currency}. Using default 'USD'.`);
        currency = 'USD';
      }

      try {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency.toUpperCase(),
        }).format(amount);
      } catch (error) {
        console.error(`Error formatting currency with code '${currency}':`, error);
        return amount;
      }
    },

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
.jumbotron {
  padding: 2rem 1rem;
}

.vertical-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.table th,
.table td {
  vertical-align: middle;
}

.btn-group .btn {
  min-width: 100px;
}

@media (max-width: 767.98px) {
  .btn-group {
    flex-direction: column;
    width: 100%;
  }
  .btn-group .btn {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
