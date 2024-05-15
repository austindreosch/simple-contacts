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
    <div>
      <!-- LOGIN VS REGISTER TABS -->
      <div>
        <div class="flex justify-center overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap">
          <button class="inline-flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 border-transparent sm:px-4 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 hover:text-gray-400"
                  :class="{'text-blue-600 border-blue-600 hover:text-blue-500' : !register}"
                  @click="register = false">
            <LoginIcon />
            <span class="mx-1 text-sm sm:text-base">Login</span>
          </button>
          <button class="inline-flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 border-transparent sm:px-4 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 hover:text-gray-400"
                  :class="{'text-blue-600 border-blue-600 hover:text-blue-500' : register}"
                  @click="register = true">
            <RegisterIcon />
            <span class="mx-1 text-sm sm:text-base">Register</span>
          </button>
        </div>
      </div>
  
      <!-- FORMS -->
      <div class="mt-2">
        <!-- LOGIN FORM -->
        <div v-if="!register">
          <form @submit.prevent="onSubmitLogin" class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-6">
              <label class="w-full block text-gray-700 text-xs font-bold mb-2" for="email">EMAIL</label>
              <input v-model="credentials.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter an email">
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-xs font-bold mb-2" for="password">PASSWORD</label>
              <input v-model="credentials.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter a password">
            </div>
            <div class="flex items-center justify-between">
              <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign In</button>
              <a class="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800" href="#">Forgot Password?</a>
            </div>
          </form>
        </div>
  
        <!-- REGISTER FORM -->
        <div v-if="register">
          <form @submit.prevent="onSubmitRegister" class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">Email</label>
                <input v-model="registerCredentials.email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Email">
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
                <input v-model="registerCredentials.password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="********">
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">First Name</label>
                <input v-model="registerCredentials.firstName" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Name">
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Last Name</label>
                <input v-model="registerCredentials.lastName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last Name">
              </div>
            </div>
            <div class="flex items-center justify-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>