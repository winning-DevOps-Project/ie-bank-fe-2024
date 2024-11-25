<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <!-- USERNAME -->
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            placeholder="Enter your username"
            required
          />
        </div>
  
        <!-- PASSWORD -->
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Enter your password"
            required
          />
        </div>
  
        <!-- SUBMIT -->
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          username: '', // Added username
          password: '',
        },
      };
    },
    methods: {
      handleLogin() {
        // Simulate API call for login
        const { username, password } = this.form;
  
        if (username === 'testuser' && password === 'testpass') {
          // Simulating successful login
          console.log('Login successful');
          alert('Login successful! Redirecting to Accounts page...');
          
          // Redirect to AppAccounts page
          this.$router.push('/accounts');
        } else {
          alert('Invalid username or password');
        }
      },
    },
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
  
  input {
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
  </style>
  