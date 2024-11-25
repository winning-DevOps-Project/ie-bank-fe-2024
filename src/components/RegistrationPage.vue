<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="username">Username</label>
          <input type="text" v-model="form.username" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="form.email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="form.password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          username: '',
          email: '',
          password: '',
        },
      };
    },
    methods: {
      handleRegister() {
        console.log(this.form);
        // HAVE TO ADD API REGISTRATION HERE
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>
  