<template>
  <div class="login">
    <h2 class="title">Welcome Back</h2>
    <p class="subtitle">Login to your account</p>
    
    <!-- Display validation error or server message -->
    <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

    <form @submit.prevent="onSubmit" class="login-form">
      <!-- USERNAME -->
      <div class="form-group">
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
      <div class="form-group">
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
      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { getApiUrl } from "@/utils/getUrl";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    handleLogin(payload) {
      this.loading = true;
      const path = getApiUrl("/login");

      axios
        .post(path, payload)
        .then((response) => {
          if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("is_admin", response.data.is_admin);
            this.$router.push({ name: "AppAccounts" });
          }
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = "Login failed. Check your credentials.";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSubmit() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      this.handleLogin(payload);
    },
  },
};
</script>

<style scoped>
/* General container styles */
.login {
  max-width: 360px;
  margin: 5% auto;
  padding: 30px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
}

.error-msg {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

/* Form styling */
.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 6px;
  display: block;
}

.input {
  width: 100%;
  padding: 10px 14px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.2s ease;
}

.input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

/* Button styles */
.btn {
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Additional styles */
.error {
  color: red;
  font-size: 0.85rem;
  margin-top: -5px;
}

@media (max-width: 480px) {
  .login {
    padding: 20px;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>
