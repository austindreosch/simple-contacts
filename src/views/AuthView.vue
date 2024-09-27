<script setup>
import { auth } from '@/assets/firebase';
import LoginIcon from '@/assets/login-icon.svg';
import RegisterIcon from '@/assets/register-icon.svg';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const register = ref(false);
const error = ref(null);

const credentials = reactive({
  email: '',
  password: '',
});
const registerCredentials = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
});

const showPassword = ref({
  login: false,
  register: false,
});

const togglePasswordVisibility = (form) => {
  showPassword.value[form] = !showPassword.value[form];
};

const onSubmitLogin = async () => {
  console.log('Login submitted with credentials:', credentials);
  if (!credentials.email || !credentials.password) {
    alert('Please fill in all fields.');
    return;
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    console.log('Login successful, user:', userCredential.user);
    router.push('/');
  } catch (err) {
    console.error('Login error:', err.message);
    error.value = err.message;
    alert(`Login failed: ${err.message}`);
  }
};

const onSubmitRegister = async () => {
  console.log('Register submitted with credentials:', registerCredentials);
  if (!registerCredentials.email || !registerCredentials.password || !registerCredentials.firstName || !registerCredentials.lastName) {
    alert('Please fill in all fields.');
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, registerCredentials.email, registerCredentials.password);
    console.log('Register successful, user:', userCredential.user);
  } catch (err) {
    console.error('Register error:', err.message);
    error.value = err.message;
    alert(`Registration failed: ${err.message}`);
  }
};
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <!-- Tabs for Login and Register -->
    <div class="flex justify-center mb-6">
      <button
        @click="register = false"
        :class="[
          'w-1/2 py-2 text-center font-semibold border-b-2',
          !register ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800',
        ]"
      >
        <!-- Login Icon -->
        <svg class="inline-block h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 3h12a2 2 0 012 2v4h-2V5H3v10h12v-4h2v4a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
          <path d="M12 9l4-4m0 0l-4-4m4 4H6" />
        </svg>
        Login
      </button>
      <button
        @click="register = true"
        :class="[
          'w-1/2 py-2 text-center font-semibold border-b-2',
          register ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800',
        ]"
      >
        <!-- Register Icon -->
        <svg class="inline-block h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 5a2 2 0 100-4 2 2 0 000 4zM4 8a4 4 0 014-4h4a4 4 0 014 4v8a2 2 0 01-2 2h-1v-4H7v4H6a2 2 0 01-2-2V8z" />
        </svg>
        Register
      </button>
    </div>

    <!-- Forms -->
    <div>
      <!-- Login Form -->
      <div v-if="!register">
        <form @submit.prevent="onSubmitLogin" class="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label for="login-email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="credentials.email"
              type="email"
              id="login-email"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label for="login-password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="credentials.password"
              type="password"
              id="login-password"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
          <div class="text-center mt-4">
            <a href="#" class="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>
        </form>
      </div>

      <!-- Register Form -->
      <div v-else>
        <form @submit.prevent="onSubmitRegister" class="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label for="register-email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="registerCredentials.email"
              type="email"
              id="register-email"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label for="register-password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="registerCredentials.password"
              type="password"
              id="register-password"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              v-model="registerCredentials.firstName"
              type="text"
              id="first-name"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              v-model="registerCredentials.lastName"
              type="text"
              id="last-name"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your last name"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
