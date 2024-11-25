<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <!-- USERNAME -->
        <div>
          <label for="username">Username</label>
          <input type="text" id="username" v-model="form.username" placeholder="Enter your username" required />
        </div>
  
        <!-- PASSWORD -->
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" placeholder="Enter your password" required />
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
          email: '',
          password: '',
        },
      };
    },
    methods: {
      handleLogin() {
        console.log(this.form); // LOGIN API CALL HERE
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
