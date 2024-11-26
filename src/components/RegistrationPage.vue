<template>
  <div class="register">
    <h2>Register</h2>
    <!-- Display validation error or server message -->
    <p class="subtitle error-msg">{{ message }}</p>
    <form @submit.prevent="onSubmit">
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

      <!-- CONFIRM PASSWORD -->
      <div>
        <label for="password_2">Confirm Password</label>
        <input
          v-model="password_2"
          name="password_2"
          type="password"
          id="password_2"
          placeholder="Confirm your password"
          class="input"
        />
      </div>

      <!-- SUBMIT -->
      <button type="submit" :disabled="loading">
        {{ loading ? "Registering..." : "Register" }}
      </button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      password_2: "",
      loading: false,
      message: "",
      errorMessage: "",
    };
  },

  methods: {
    handleRegister(payload) {
      this.loading = true;
      const path = process.env.VUE_APP_API_URL + "/register/";

      axios
        .post(path, payload)
        .then(() => {
          this.loading = false;
          this.message = "Registration successful. You can now log in.";
          this.$router.push({ name: "AppAccounts" });
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
          this.errorMessage = "Registration failed. Please try again.";
        });
    },

    onSubmit() {
      const payload = {
        username: this.username,
        password: this.password,
        password_2: this.password_2,
      };
      console.log("payload", payload);
      this.handleRegister(payload);
    },
  },
};
</script>

<style scoped>
/* Basic styles for the register form */
.register {
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
