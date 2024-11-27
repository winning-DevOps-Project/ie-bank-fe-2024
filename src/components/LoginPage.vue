<template>
  <div class="login">
    <h2>Login</h2>
    <!-- Display validation error or server message -->
    <p class="subtitle error-msg">{{ message }}</p>
    <!-- Form with Vee-Validate -->
    <form @submit.prevent="onSubmit">
      <!-- USERNAME -->
      <!-- USERNAME -->
    <div>
      <label for="username">Username</label>
      <input
        v-model="username"
        name="username"
        type="text"
        id="username"
        placeholder="Enter your username"
        class="input"
      />
    </div>

    <!-- PASSWORD -->
    <div>
      <label for="password">Password</label>
      <input
        v-model="password"
        name="password"
        type="password"
        id="password"
        placeholder="Enter your password"
        class="input"
      />
    </div>

      <!-- SUBMIT -->
      <button type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </form>
    <p v-if = "errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: ""
    };
  },

  //Handle the login request
  methods: {
    handleLogin(payload) {
        console.log("Login request");
        
        const path = process.env.VUE_APP_API_URL + "/login/";

        axios.post(path, payload)
            .then((response) => {
                if (response.data.access_token) {
                    localStorage.setItem("access_token", response.data.access_token);
                    localStorage.setItem("is_admin", response.data.is_admin);
                    this.$router.push({ name: "AppAccounts" });
                }
            })
            .catch((error) => {
                console.log(error);
                this.errorMessage =  "Login failed. Check your credentials.";
            });
    },
    onSubmit() {
        const payload = {
            username: this.username,
            password: this.password
        }
        console.log("payload", payload);
        this.handleLogin(payload);
    }
  }
};

</script>

<style scoped>
/* Basic styles for the login form */
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>