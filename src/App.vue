<script setup>


</script>

<template>
  <div>
    <nav class="p-4 flex justify-center space-x-40 fixed pt-10 pb-7 top-0 left-0 right-0 bg-orange-200 z-10">
      <div class="font-outfit text-black-800 flex space-x-2">
        <h1 class="text-4xl font-semibold ">simple</h1>
        <span class="mt-2 pl-0.5">
          <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M4 4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4H4Zm0 6h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Zm10.707 5.707a1 1 0 0 0-1.414-1.414l-.293.293V12a1 1 0 1 0-2 0v2.586l-.293-.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l2-2Z" clip-rule="evenodd"/>
          </svg>
        </span>
        <h1 class="text-4xl font-semibold ">contacts</h1>
      </div>
      <div class="flex justify-between space-x-4 mx-auto ">
        <router-link class="px-4 py-2 bg-blue-400 text-white rounded hover:bg-white hover:text-black" to="/">Home</router-link>
        <router-link class="px-4 py-2 bg-blue-400 text-white rounded hover:bg-white hover:text-black" to="/add">Add Invidual Contact</router-link>
        <router-link class="px-4 py-2 bg-blue-400 text-white rounded hover:bg-white hover:text-black" to="/import">Import Contacts</router-link>
        <router-link class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-400 hover:text-black" to="#">Logout</router-link>
      </div>
    </nav>
    <main class="max-w-15xl"> 
      <router-view></router-view>
    </main>
  </div>
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