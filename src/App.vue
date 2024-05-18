<script setup>
import { getUser, user } from '@/composables/getUser';
getUser();

</script>

<template>

    <!-- NAV -->
  <header class="bg-my-lightteal">
    <div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">

        <!-- LEFT SIDE OF NAV -->
        <div class="flex-1 md:flex md:items-center md:gap-12">
          <router-link class="block text-white" to="/">
            <span class="sr-only">Home</span>
            <div class="font-outfit text-my-dark flex space-x-2 items-center pr-20">
              <span class="mt-[.45rem] pl-0.5">
                <svg class="w-8 h-8 text-my-dark dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4H4Zm0 6h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Zm10.707 5.707a1 1 0 0 0-1.414-1.414l-.293.293V12a1 1 0 1 0-2 0v2.586l-.293-.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l2-2Z" clip-rule="evenodd"/>
                </svg>
              </span>
              <h1 class="text-4xl font-semibold">simple</h1>
              <h1 class="text-4xl font-semibold ">contacts</h1>
            </div>
          </router-link>
        </div>
        
        <!-- RIGHT SIDE OF NAV -->
        <div class="md:flex md:items-center md:gap-12">
          <!-- PAGES -->
          <nav aria-label="Global" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <router-link class="text-white transition hover:text-gray-500/75"to="/"> Home </router-link>
              </li>
              <li>
                <router-link class="text-white transition hover:text-gray-500/75"to="/about"> About </router-link>
              </li>
              <!-- <li>
                <router-link class="text-gray-500 transition hover:text-gray-500/75" to="/import"> Import Contacts </router-link>
              </li> -->
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <!-- LOGIN+REGISTER/PROFILE -->
            <div class="sm:flex sm:gap-4">
              <router-link
                class="rounded-md bg-my-peach px-5 py-2.5 text-sm font-medium text-gray-800 shadow"
                to="/auth"
              >
                Login
              </router-link>
  
              <div class="hidden sm:flex">
                <router-link
                  class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-my-dark"
                  to="/auth"
                >
                  Register
                </router-link>
              </div>
            </div>

            <!-- MOBILE SELECTOR -->
            <div class="block md:hidden">
              <button class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  </header>
  
  
  <!-- Header -->
  <div class="bg-my-dark mb-2">
    <div class="mx-auto max-w-screen-2xl px-4 py-2 sm:px-6 sm:py-4 lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        
        
        <!-- welcome -->
        <div class="text-center sm:text-left">
          <h1 class="text-2xl text-white sm:text-3xl">Welcome Back, Austin!</h1>
        
          <p class="mt-1.5 text-sm text-gray-200">Let's get started! 🎉</p>
        </div>

        <!-- Buttons -->
        <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <button
            class="block rounded-lg bg-my-peach px-5 py-3 text-sm font-medium text-gray-800 transition hover:bg-orange-300 focus:outline-none focus:ring"
            type="button"
            >
            Add Individual Contact
            </button>
            <button
            class="block rounded-lg bg-my-peach px-5 py-3 text-sm font-medium text-gray-800 transition hover:bg-orange-300 focus:outline-none focus:ring"
            type="button"
            >
            Import Contacts
            </button>
            <button
            class="inline-flex items-center justify-center gap-1.5 rounded-lg  bg-my-peach px-5 py-3 text-gray-800 "
            type="button"
            >
              <span class="text-sm font-medium"> Settings </span>

              <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              >
              <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg> -->
          </button>
          
        </div>







      </div>
    </div>
  </div>


  <!-- BODY -->
  <main class="max-w-10xl px-4 mx-auto"> 
    <router-view></router-view>
  </main>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

.font-outfit {
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
}
</style>