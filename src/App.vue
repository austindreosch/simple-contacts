<template>
  <nav class="p-4 flex justify center space-x-4">
    <div class="flex justify-between space-x-4 mx-auto">
      <router-link class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-200" to="/">Home</router-link>
      <router-link class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-200" to="/import">Import Contacts</router-link>
    </div>
  </nav>
  <main class="max-w-8xl">
    <router-view></router-view>
  </main>
</template>

<script setup>

</script>