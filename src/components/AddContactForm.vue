<script setup>
import { db } from '@/assets/firebase';
import FullCheckmark from '@/assets/full-checkmark.svg';
import { user } from '@/composables/getUser';
import { addDoc, collection } from 'firebase/firestore';
import { reactive, ref } from 'vue';



const formData = reactive({
  userID: user.value.uid,
  firstName: '',
  lastName: '',
  email: '',
  note: '',
  phone: '',
  tags: '',
});

const submitForm = async () => {
  formData.tags = formData.tags.split(',').map(tag => tag.trim());
    console.log(formData);

  try {
    const docRef = await addDoc(collection(db, "contacts"), formData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

</script>



<template>
    <div class="max-w-2xl mx-auto p-6">
      <!-- Heading -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Add Individual Contact</h1>
        <p class="mt-2 text-gray-600">Fill in the details below to add a new contact.</p>
      </div>
  
      <!-- Form Container -->
      <div class="bg-white shadow-md rounded-lg p-6 space-y-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- First and Last Name -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- First Name -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div class="mt-1 relative">
                <input
                  type="text"
                  id="firstName"
                  v-model="formData.firstName"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter first name"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <!-- User Icon -->
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 3a3 3 0 100 6 3 3 0 000-6zM4 14s0-2 6-2 6 2 6 2v2H4v-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <!-- Last Name -->
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div class="mt-1 relative">
                <input
                  type="text"
                  id="lastName"
                  v-model="formData.lastName"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter last name"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <!-- User Icon -->
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 3a3 3 0 100 6 3 3 0 000-6zM4 14s0-2 6-2 6 2 6 2v2H4v-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1 relative">
              <input
                type="email"
                id="email"
                v-model="formData.email"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter email address"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <!-- Email Icon -->
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2.94 6.94a1.5 1.5 0 012.12 0L10 11.88l4.94-4.94a1.5 1.5 0 012.12 2.12l-6 6a1.5 1.5 0 01-2.12 0l-6-6a1.5 1.5 0 010-2.12z"
                  />
                </svg>
              </div>
            </div>
          </div>
  
          <!-- Note and Phone -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Note -->
            <div>
              <label for="note" class="block text-sm font-medium text-gray-700">
                Note
              </label>
              <div class="mt-1 relative">
                <input
                  type="text"
                  id="note"
                  v-model="formData.note"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter a note"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <!-- Note Icon -->
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 2h12a1 1 0 011 1v12l-3-3H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
                  </svg>
                </div>
              </div>
            </div>
            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div class="mt-1 relative">
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter phone number"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <!-- Phone Icon -->
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2.003 5.884l2-3.464A1 1 0 015 2h10a1 1 0 01.863.5l2 3.464a1 1 0 01-.019 1.036l-8 14A1 1 0 0110 21a1 1 0 01-.844-.487l-8-14a1 1 0 01-.153-.63z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Tags -->
          <div>
            <label for="tags" class="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div class="mt-1 relative">
              <textarea
                id="tags"
                v-model="formData.tags"
                rows="3"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter tags (comma separated)"
              ></textarea>
              <div class="absolute top-2 left-3 flex items-center pointer-events-none">
                <!-- Tags Icon -->
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M5 3a2 2 0 00-2 2v3.586a1 1 0 00.293.707l7 7a1 1 0 001.414 0l3.586-3.586a1 1 0 000-1.414l-7-7A1 1 0 008.586 3H5z"
                  />
                </svg>
              </div>
            </div>
          </div>
  
          <!-- Submit Button -->
          <div class="text-right">
            <button
              type="submit"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <!-- Save Icon -->
              <svg
                class="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 13l4 4L19 7" />
              </svg>
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  