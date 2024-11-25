<template>
  <div class="home">
      <div class="jumbotron vertical-center">
        <div class="container">
          <h1>Welcome to IE Bank</h1>
          <p class="lead">
            Manage the accounts of your clients with ease.
          </p>
          <hr class="my-4" />
          <div class="button-group">
            <!-- LOGIN -->
          <router-link :to="authRedirect">
            <button class="btn btn-primary btn-lg">Login</button>
          </router-link>
          <!-- REGISTER -->
          <router-link :to="'/register'">
            <button class="btn btn-primary btn-lg">Register</button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Help Section at the Bottom -->
    <footer>
      <p>For help contact bank@ie.com</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    // Dynamically determine the redirect path
    authRedirect() {
      // Check if the user is authenticated (example using localStorage)
      const token = localStorage.getItem("jwt");
      return token ? "/accounts" : "/login";
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px;
}

.jumbotron {
  background-color: #f8f9fa;
  padding: 60px;
}

.lead {
  font-size: 1.25rem;
  font-weight: 300;
}

/* MARGIN BETWEEN LOGIN AND REGISTER BUTTONS */
.button-group {
  display: flex;
  justify-content: center;
  gap: 30px; 
}

/* FOOTER */
.footer {
  text-align: center;
  padding: 10px;
  background-color: #f8f9fa;
  position: sticky;
  bottom: 40;
  width: 100%;
  font-size: 1rem;
}
</style>



