<template>
  <div class="home">
    <div class="hero-section">
      <div class="overlay">
        <div class="content">
          <h1>Welcome to IE Bank</h1>
          <p class="subtext">Manage the accounts of your clients with ease.</p>
          <hr class="divider" />
          <div class="button-group">
            <!-- LOGIN -->
            <router-link :to="authRedirect">
              <button class="btn btn-primary">Login</button>
            </router-link>
            <!-- REGISTER -->
            <router-link :to="'/register'">
              <button class="btn btn-secondary">Register</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <p>For help contact <a href="mailto:bank@ie.com">bank@ie.com</a></p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    authRedirect() {
      const token = localStorage.getItem("jwt");
      return token ? "/accounts" : "/login";
    },
  },
};
</script>

<style scoped>
/* Main Section Styling */

.hero-section {
  height: 100vh; /* Full height of the viewport */
  background: url('@/assets/4_TOWER.jpg') no-repeat center center/cover; /* Correct path */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}


/* Blue overlay */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 35, 102, 0.8); /* Blue overlay with transparency */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.content {
  z-index: 2; /* Ensure content appears above the overlay */
  text-align: center;
}

.content h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.content .subtext {
  font-size: 1.2rem;
  color: #d6e4f0; /* Lighter text color for better contrast */
  margin-bottom: 1.5rem;
}

.divider {
  margin: 20px auto;
  width: 60%;
  border: 1px solid #d6e4f0;
}

/* Buttons */
.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-primary {
  background-color: #0056b3;
  color: white;
}

.btn-primary:hover {
  background-color: #003f8a;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

/* Footer */
footer {
  margin-top: 40px;
  text-align: center;
  font-size: 0.9rem;
  color: #d6e4f0;
}

footer a {
  color: #0056b3;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
</style>
