<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="title">Login</h1>
      <form @submit.prevent="login">
        <div class="input-group">
          <input type="text" v-model="username" required />
          <label>Username</label>
          <span class="highlight"></span>
        </div>
        <div class="input-group">
          <input type="password" v-model="password" required />
          <label>Password</label>
          <span class="highlight"></span>
        </div>
        <button type="submit" class="login-btn">
          <span>Login</span>
          <svg viewBox="0 0 24 24">
            <path
              d="M4,12V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V12A2,2 0 0,0 18,10H6A2,2 0 0,0 4,12M6,12H18V20H6V12M12,2A2,2 0 0,1 14,4V8H10V4A2,2 0 0,1 12,2Z"
            />
          </svg>
        </button>
      </form>
    </div>
    <div v-if="showError" class="error-toast">
      <p>Error</p>
      <p>Username or Password is incorrect.</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      username: '',
      password: '',
      showError: false
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName: this.username,
            password: this.password
          })
        })

        if (response.status === 200) {
          console.log('Login successful')
          // Set the authentication status
          localStorage.setItem('isAuthenticated', 'true')
          this.showError = false
          // Redirect the user to the task page
          this.$router.push('/task')
        } else {
          console.log('Login failed')
          this.showError = true
          setTimeout(() => {
            this.showError = false
          }, 3000)
        }
      } catch (error) {
        console.error('Error during login:', error)
        this.showError = true
        setTimeout(() => {
          this.showError = false
        }, 3000)
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

body {
  background: linear-gradient(-45deg, #e7886a, #e47ba3, #67abc4, #68c7b1);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-box {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 40px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.title {
  color: #ffffff;
  font-size: 2.5em;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.input-group {
  position: relative;
  margin-bottom: 30px;
}

input {
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #ffffff;
  background: transparent;
  color: #ffffff;
}

input:focus {
  outline: none;
}

label {
  color: #ffffff;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
}

input:focus ~ label,
input:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #ffffff;
}

.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

input:focus ~ .highlight {
  animation: inputHighlighter 0.3s ease;
}

@keyframes inputHighlighter {
  from {
    background: #ffffff;
  }
  to {
    width: 0;
    background: transparent;
  }
}

.login-btn {
  background: #ffffff;
  color: #667eea;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.login-btn:hover {
  background: #667eea;
  color: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.login-btn span {
  margin-right: 10px;
}

.login-btn svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.error-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #ffcccb; /* Pastel red */
  color: #d8000c;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.error-toast p {
  margin: 0;
}

.error-toast p:first-child {
  font-weight: bold;
  margin-bottom: 5px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
