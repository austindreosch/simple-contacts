<template>
  <div class="h-[100vh] overflow-y-auto pb-30">
    <!-- Hero Section -->
    <div class="relative bg-gray-800">
      <div class="absolute inset-0">
        <img
          class="w-full h-full object-cover"
          src="https://source.unsplash.com/1600x900/?technology,abstract"
          alt="Background Image"
        />
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>
      <div class="relative max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 class="text-4xl font-extrabold text-white md:text-5xl">
          About Our Project
        </h1>
        <p class="mt-4 text-lg text-gray-300">
          Streamlining contact management with simplicity and efficiency.
        </p>
        <a
          href="/"
          class="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition"
        >
          Explore the Project
        </a>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <!-- Project Overview -->
      <div class="flex flex-col md:flex-row items-start md:space-x-6">
        <div class="flex-shrink-0">
          <!-- Icon -->
          <div class="flex items-center justify-center h-16 w-16 rounded-md bg-teal-500 text-white">
            <svg
              class="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7m-2 10H5a2 2 0 01-2-2v-5a1 1 0 011-1h3m10 0h3a1 1 0 011 1v5a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            Project Overview
          </h2>
          <p class="text-gray-700 leading-relaxed">
            Our app provides an efficient, user-friendly platform for managing contacts without the unnecessary complexities of traditional CRM/PM tools. Easily import and export contacts, search and sort them with shared tags, create mailing list groups, and initiate mass emails.
          </p>
        </div>
      </div>

      <!-- Technologies Used -->
      <div class="flex flex-col md:flex-row items-start md:space-x-6">
        <div class="flex-shrink-0">
          <!-- Icon -->
          <div class="flex items-center justify-center h-16 w-16 rounded-md bg-teal-500 text-white">
            <svg
              class="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m2 0h-1v-2h1v2zM7 8h10M7 12h4m1 0h4m-5 4h5m-5 4h4"
              />
            </svg>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            Technologies Used
          </h2>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <li class="flex items-center">
              <svg
                class="h-6 w-6 text-teal-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 5.065 3.773 9.276 8.65 9.878v-6.99h-2.6v-2.888h2.6V9.042c0-2.576 1.523-4.001 3.85-4.001 1.114 0 2.278.196 2.278.196v2.5h-1.285c-1.268 0-1.663.789-1.663 1.598v1.913h2.828l-.453 2.888h-2.375v6.99C18.227 21.276 22 17.065 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              <strong>Vue.js:</strong> Progressive JavaScript framework for building user interfaces.
            </li>
            <li class="flex items-center">
              <svg
                class="h-6 w-6 text-teal-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2L1.7 6.9V17l10.3 4.9L22 17V6.9L12 2zM12 4.5l8 4v7l-8 4-8-4v-7l8-4z"
                />
              </svg>
              <strong>Vite:</strong> Next Generation Frontend Tooling for fast builds.
            </li>
            <li class="flex items-center">
              <svg
                class="h-6 w-6 text-teal-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.04c-5.5 0-9.94 4.44-9.94 9.94 0 5.5 4.44 9.94 9.94 9.94 5.5 0 9.94-4.44 9.94-9.94 0-5.5-4.44-9.94-9.94-9.94zm.36 17.6V12.7H9.75v-2.4h2.61V8.19c0-2.59 1.56-4 3.86-4 1.1 0 2.05.08 2.33.12v2.7h-1.6c-1.25 0-1.5.6-1.5 1.47v1.92h3l-.39 2.4h-2.61v6.95c-1.2.24-2.45.36-3.69.36-.79 0-1.56-.07-2.31-.21z"
                />
              </svg>
              <strong>Firebase:</strong> Cloud-based platform for real-time database and authentication.
            </li>
            <li class="flex items-center">
              <svg
                class="h-6 w-6 text-teal-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12c0 4.364 2.34 8.17 5.818 10.182a.75.75 0 00.96-.292l1.21-2.165a.75.75 0 00-.309-1.048A8.998 8.998 0 013 12a9 9 0 0118 0c0 2.18-.748 4.18-2.004 5.747a.75.75 0 00.247 1.146l2.266 1.305a.75.75 0 001.088-.463A11.962 11.962 0 0024 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
              <strong>Tailwind CSS:</strong> Utility-first CSS framework for rapid UI development.
            </li>
          </ul>
        </div>
      </div>

      <!-- Key Features -->
      <div class="flex flex-col md:flex-row items-start md:space-x-6">
        <div class="flex-shrink-0">
          <!-- Icon -->
          <div class="flex items-center justify-center h-16 w-16 rounded-md bg-teal-500 text-white">
            <svg
              class="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            Key Features
          </h2>
          <ul class="space-y-4 text-gray-700">
            <li class="flex">
              <span class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-teal-500 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 2a2 2 0 00-2 2v2H7v2h1v6H7v2h6v-2h-1v-6h1V6h-1V4a2 2 0 00-2-2z"
                  />
                </svg>
              </span>
              <span class="ml-3">
                Effortless contact management with advanced filtering and search capabilities.
              </span>
            </li>
            <li class="flex">
              <span class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-teal-500 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2 5a2 2 0 012-2h1.172a2 2 0 011.414.586l1.828 1.828A2 2 0 009.172 6H14a2 2 0 012 2v2.586l2 2V8a4 4 0 00-4-4H9.172a2 2 0 01-1.414-.586L5.93 1.172A2 2 0 004.516.586L2.707 2.293A1 1 0 002 3.414V5z"
                  />
                  <path
                    d="M12 14h4.586l1 1H12v-1zM12 16h5.586l1 1H12v-1zM2 8v8a2 2 0 002 2h6v-2H4V8H2z"
                  />
                </svg>
              </span>
              <span class="ml-3">
                Real-time database integration using Firebase for seamless data synchronization.
              </span>
            </li>
            <li class="flex">
              <span class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-teal-500 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M4 3a1 1 0 011-1h3.382a1 1 0 01.894.553L10 4h4a1 1 0 011 1v3h-2V6H4v8h5v2H5a1 1 0 01-1-1V3z"
                  />
                  <path
                    d="M15 11h2v2a1 1 0 01-1 1h-1v2h-2v-2h-1a1 1 0 01-1-1v-2h2v1h2v-1z"
                  />
                </svg>
              </span>
              <span class="ml-3">
                User-friendly UI built with Vue.js and Tailwind CSS for responsive design.
              </span>
            </li>
            <li class="flex">
              <span class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-teal-500 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2.003 5.884l2-3.464A1 1 0 015 2h10a1 1 0 01.863.5l2 3.464a1 1 0 01-.019 1.036l-8 14A1 1 0 0110 21a1 1 0 01-.844-.487l-8-14a1 1 0 01-.153-.63z"
                  />
                </svg>
              </span>
              <span class="ml-3">
                Phone number validation and formatting powered by Google-libphonenumber.
              </span>
            </li>
            <li class="flex">
              <span class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-teal-500 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M5 3a2 2 0 00-2 2v12h14V5a2 2 0 00-2-2H5zm2 2h6v2H7V5zm0 4h6v2H7V9zm0 4h6v2H7v-2z"
                  />
                </svg>
              </span>
              <span class="ml-3">
                Seamless integration of user lists and contact groups for efficient communication.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script setup>

  </script>
  
  