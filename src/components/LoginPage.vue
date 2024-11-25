<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username</label>
        <input type="text" v-model="form.username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="form.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: '', // Changed from email to username
        password: '',
      },
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Send the API call
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/login`, {
          username: this.form.username, // Updated to send username
          password: this.form.password,
        });

        // Handle success (assuming a token is returned)
        const token = response.data.access_token;
        localStorage.setItem('authToken', token); // Save the token for later use
        this.$router.push('/dashboard'); // Redirect to a secure page
      } catch (err) {
        // Handle errors
        this.error = err.response?.data?.message || 'Login failed. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
