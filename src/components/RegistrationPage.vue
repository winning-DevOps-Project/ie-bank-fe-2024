<template>
    <div class="register px-8 py-20 container mx-auto">
      <h2 class="text-2xl font-bold text-blue-gray-700 mb-6">Register</h2>
      <p class="text-gray-600 font-normal mb-8">
        Fill in the details below to create your account.
      </p>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- First Name and Last Name -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full">
            <label for="first-name" class="block text-sm font-medium text-blue-gray-700 mb-2">First Name</label>
            <input
              id="first-name"
              v-model="form.firstName"
              type="text"
              class="input-field"
              placeholder="First Name"
              required
            />
          </div>
          <div class="w-full">
            <label for="last-name" class="block text-sm font-medium text-blue-gray-700 mb-2">Last Name</label>
            <input
              id="last-name"
              v-model="form.lastName"
              type="text"
              class="input-field"
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <!-- USERNAME -->
        <div>
          <label for="username" class="block text-sm font-medium text-blue-gray-700 mb-2">Username</label>
          <input
            id="username"
            v-model="form.username"
            type="username"
            class="input-field"
            placeholder="Username"
            required
          />
        </div>
        
  
        <!-- PASSWORD -->
        <div>
          <label for="password" class="block text-sm font-medium text-blue-gray-700 mb-2">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="input-field"
            placeholder="Password"
            required
          />
        </div>

        <!-- CONFIRM PASSWORD -->
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-blue-gray-700 mb-2">Confirm Password</label>
          <input
            id="confirm-password"
            v-model="form.confirmPassword"
            type="password"
            class="input-field"
            placeholder="Confirm Password"
            required
          />
        </div>
  
  
        <!-- SUBMIT BUTTON -->
        <div class="mt-8">
          <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Register
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          firstName: "",
          lastName: "",
          email: "",
          confirmEmail: "",
          password: "",
          location: "",
          phone: "",
        },
      };
    },
    methods: {
      handleRegister() {
        if (this.form.email !== this.form.confirmEmail) {
          alert("Emails do not match!");
          return;
        }
        console.log("Registration Form Submitted", this.form);
        // API call for registration goes here
      },
    },
  };
  </script>
  
  <style scoped>
  .input-field {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s ease;
  }
  
  .input-field:focus {
    border-color: #3b82f6; /* blue */
  }
  </style>
  