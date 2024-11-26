<template>
  <div class="login">
    <h2>Login</h2>
    <!-- Display validation error or server message -->
    <p class="subtitle error-msg">{{ message }}</p>
    <!-- Form with Vee-Validate -->
    <Form :validation-schema="schema" @submit="handleLogin">
      <!-- USERNAME -->
      <div>
        <label for="username">Username</label>
        <Field
          name="username"
          type="text"
          id="username"
          placeholder="Enter your username"
          class="input"
        />
        <ErrorMessage name="username" class="error" />
      </div>

      <!-- PASSWORD -->
      <div>
        <label for="password">Password</label>
        <Field
          name="password"
          type="password"
          id="password"
          placeholder="Enter your password"
          class="input"
        />
        <ErrorMessage name="password" class="error" />
      </div>

      <!-- SUBMIT -->
      <button type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    // Define the schema for validation
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false, // Tracks form submission state
      message: "", // Error or success messages
      schema, // Validation schema
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth?.status?.loggedIn || false;
    },
  },
  created() {
    // Redirect if already logged in
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true; // Start loading state
      this.message = ""; // Clear previous messages

      // Dispatch the login action
      this.$store
        .dispatch("auth/login", user)
        .then(() => {
          this.$router.push("/accounts/"); // Redirect on success
        })
        .catch((error) => {
          this.loading = false; // Stop loading state
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            "An error occurred while logging in.";
        });
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
