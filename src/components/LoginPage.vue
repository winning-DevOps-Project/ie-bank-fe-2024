<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="form.email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="form.password" required />
        </div>
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
        console.log(this.form);
        // LOGIN API CALL HERE
      },
    },
  };
  </script>
  
  <style scoped>
  /* css */
  </style>
  