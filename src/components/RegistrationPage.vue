<template>
  <div class="register">
    <h2 class="main-title">Register</h2>
    <p class="subtitle">Create an account to get started</p>

    <!-- Display error or success messages -->
    <p v-if="message" class="success-msg">{{ message }}</p>
    <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

    <form @submit.prevent="onSubmit" class="register-form">
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

      <!-- COUNTRY -->
      <div class="form-group">
        <label for="country">Country</label>
        <input
          v-model="country"
          name="country"
          type="text"
          id="country"
          placeholder="Enter your country"
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

      <!-- CONFIRM PASSWORD -->
      <div class="form-group">
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
      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? "Registering..." : "Register" }}
      </button>
    </form>
  </div>
</template>

<script>
import { getApiUrl } from "@/utils/getUrl";
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      password_2: "",
      country: "",
      loading: false,
      message: "",
      errorMessage: "",
    };
  },

  methods: {
    handleRegister(payload) {
      this.loading = true;
      const path = getApiUrl("/register");

      axios
        .post(path, payload)
        .then((response) => {
          if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("is_admin", response.data.is_admin);
          }
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
        country: this.country,
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
/* General Styles */
.register {
  max-width: 400px;
  margin: 5% auto;
  padding: 30px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.main-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.subtitle {
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 25px;
  color: #666;
}

/* Form Styles */
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  outline: none;
}

/* Button Styles */
.btn {
  font-size: 1rem;
  font-weight: bold;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Messages */
.success-msg {
  color: #28a745;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.error-msg {
  color: #dc3545;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

/* Responsive Design */
@media (max-width: 480px) {
  .register {
    padding: 20px;
  }

  .main-title {
    font-size: 1.5rem;
  }

  .input {
    padding: 10px;
  }

  .btn {
    font-size: 0.9rem;
    padding: 10px 15px;
  }
}
</style>
