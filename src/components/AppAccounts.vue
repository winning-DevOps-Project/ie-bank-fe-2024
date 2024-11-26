<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Accounts</h1>
          <hr />
          <br />
          <!-- Alert Message -->
          <b-alert v-if="showMessage" variant="success" show>
            {{ message }}
          </b-alert>

          <!-- Create Account Button -->
          <button
            type="button"
            class="btn btn-success btn-sm"
            v-b-modal.account-modal
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

          <!-- Logout Button -->
          <button
            type="button"
            class="btn btn-danger btn-sm ml-2"
            @click="logout"
          >
            Logout
          </button>
        </div>

        <br /><br />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Account ID</th>
              <th scope="col">Account Balance</th>
              <th scope="col">Account Currency</th>
              <th scope="col">Account Country</th>
              <th scope="col">Account Status</th>
              <th scope="col">Date Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.id">
              <td>{{ account.name }}</td>
              <td>{{ account.account_number }}</td>
              <td>{{ account.balance }}</td>
              <td>{{ account.currency }}</td>
              <td>
                <span
                  v-if="account.status == 'Active'"
                  class="badge badge-success"
                  >{{ account.status }}</span
                >
                <span v-else class="badge badge-danger">{{ account.status }}</span>
              </td>
              <td>
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
          </tbody>
        </table>
        <footer class="text-center">
          Copyright &copy; All Rights Reserved.
        </footer>
      </div>
    </div>

    <!-- Create Account Modal -->
    <b-modal ref="addAccountModal" id="account-modal" title="Create a New Account" hide-backdrop hide-footer>
      <b-form @submit="onSubmit" class="w-100">
        <b-form-group
          id="form-name-group"
          label="Account ID:"
          label-for="form-name-input"
        >
          <b-form-input
            id="form-name-input"
            type="text"
            v-model="createAccountForm.name"
            placeholder="Account ID"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="form-currency-group"
          label="Currency:"
          label-for="form-currency-input"
        >
          <b-form-input
            id="form-currency-input"
            type="text"
            v-model="createAccountForm.currency"
            placeholder="$ or €"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="outline-info">Submit</b-button>
      </b-form>
    </b-modal>

    <!-- Edit Account Modal -->
    <b-modal ref="editAccountModal" id="edit-account-modal" title="Edit Account">
      <b-form @submit="onSubmitUpdate" class="w-100">
        <b-form-group
          id="form-edit-name-group"
          label="Account ID:"
          label-for="form-edit-name-input"
        >
          <b-form-input
            id="form-edit-name-input"
            type="text"
            v-model="editAccountForm.name"
            placeholder="Account ID"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="outline-info">Update</b-button>
      </b-form>
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
      createAccountForm: {
        name: "",
        currency: "",
      },
      editAccountForm: {
        id: "",
        name: "",
      },
      showMessage: false,
      message: "",
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/

    //GET function
    RESTgetAccounts() {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/accounts/`;
      console.log("Token", token);
      console.log(path);
      axios
        .get(path, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.accounts = response.data.accounts;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    goToTransactionPage() {
      console.log("Navigating to Transaction Page...");
      this.$router.push("/transactions");
    },

    // POST function
    RESTcreateAccount(payload) {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/accounts/`;
      axios
        .post(path, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.RESTgetAccounts();
          this.message = "Account Created successfully!";
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // Update function
    RESTupdateAccount(payload, accountId) {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/accounts/${accountId}/`;
      axios
        .put(path, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.RESTgetAccounts();
          this.message = "Account Updated successfully!";
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // Delete account
    RESTdeleteAccount(accountId) {
      const token = localStorage.getItem("access_token");
      const path = `${process.env.VUE_APP_API_URL}/accounts/${accountId}/`;
      axios
        .delete(path, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.RESTgetAccounts();
          this.message = "Account Deleted successfully!";
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /***************************************************
     * FORM MANAGEMENT
     * *************************************************/

    // Initialize forms empty
    initForm() {
      this.createAccountForm.name = "";
      this.createAccountForm.currency = "";
      this.editAccountForm.id = "";
      this.editAccountForm.name = "";
    },

    // Handle submit event for create account
    onSubmit(e) {
      e.preventDefault();
      this.$refs.addAccountModal.hide();
      const payload = {
        name: this.createAccountForm.name,
        currency: this.createAccountForm.currency,
      };
      this.RESTcreateAccount(payload);
      this.initForm();
    },

    // Handle submit event for edit account
    onSubmitUpdate(e) {
      e.preventDefault();
      this.$refs.editAccountModal.hide();
      const payload = {
        name: this.editAccountForm.name,
      };
      this.RESTupdateAccount(payload, this.editAccountForm.id);
      this.initForm();
    },

    // Handle edit button
    editAccount(account) {
      this.editAccountForm.id = account.id;
      this.editAccountForm.name = account.name;
      this.$refs.editAccountModal.show();
    },

    // Handle Delete button
    deleteAccount(account) {
      this.RESTdeleteAccount(account.id);
    },

    // Logout
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push("/");
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