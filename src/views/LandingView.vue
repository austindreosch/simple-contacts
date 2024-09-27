<template>
  <div class="pb-24 overflow-y-auto">
    <!-- Hero Section -->
    <div class="relative bg-gray-800">
      <div class="absolute inset-0">
        <img
          class="w-full h-full object-cover"
          src="https://source.unsplash.com/1600x900/?contacts,network"
          alt="Background Image"
        />
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>
      <div class="relative max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 class="text-5xl font-extrabold text-white md:text-6xl">
          Simplify Your Contact Management
        </h1>
        <p class="mt-4 text-xl text-gray-300">
          An intuitive solution without the unnecessary bulk of traditional CRMs.
        </p>
        <a
          href="/auth"
          class="mt-8 inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition"
        >
          Get Started
        </a>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-white py-12">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-800">Features</h2>
          <!-- <p class="mt-4 text-lg text-gray-600">
            Everything you need to streamline your contact management.
          </p> -->
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-16 w-16 mx-auto rounded-md bg-teal-500 text-white">
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
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-xl font-semibold text-gray-800">
              Easy Import & Export
            </h3>
            <p class="mt-2 text-gray-600">
              Seamlessly import and export your contacts in CSV format.
            </p>
          </div>
          <!-- Feature 2 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-16 w-16 mx-auto rounded-md bg-teal-500 text-white">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-xl font-semibold text-gray-800">
              Advanced Filtering
            </h3>
            <p class="mt-2 text-gray-600">
              Quickly find contacts with our powerful search and filter tools.
            </p>
          </div>
          <!-- Feature 3 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-16 w-16 mx-auto rounded-md bg-teal-500 text-white">
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
                  d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2h-2M7 8H5a2 2 0 00-2 2v10a2 2 0 002 2h2m10-12V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 4v6"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-xl font-semibold text-gray-800">
              Group Management
            </h3>
            <p class="mt-2 text-gray-600">
              Organize your contacts into groups for targeted communication.
            </p>
          </div>
          <!-- Feature 4 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-16 w-16 mx-auto rounded-md bg-teal-500 text-white">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-xl font-semibold text-gray-800">
              Mass Emailing
            </h3>
            <p class="mt-2 text-gray-600">
              Send emails to your contact groups directly from the app.
            </p>
          </div>
          <!-- Feature 5 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-16 w-16 mx-auto rounded-md bg-teal-500 text-white">
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
                  d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-xl font-semibold text-gray-800">
              Secure Cloud Storage
            </h3>
            <p class="mt-2 text-gray-600">
              Your contacts are safely stored and synchronized in the cloud.
            </p>
          </div>
          <!-- Feature 6 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-16 w-16 mx-auto rounded-md bg-teal-500 text-white">
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
                  d="M8 10h.01M12 14h.01M16 10h.01M9 16h6"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-xl font-semibold text-gray-800">
              Intuitive UI
            </h3>
            <p class="mt-2 text-gray-600">
              Experience a clean and straightforward user interface.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section (Optional) -->
    <!-- Uncomment this section if you want to include testimonials -->
    <!--
    <div class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-gray-800">What Our Users Say</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <p class="text-gray-600">
              "This app has transformed the way I manage my contacts. It's simple, efficient, and exactly what I needed."
            </p>
            <div class="mt-4 flex items-center">
              <img
                class="h-10 w-10 rounded-full object-cover"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User Photo"
              />
              <div class="ml-3">
                <p class="text-gray-800 font-semibold">John Doe</p>
                <p class="text-gray-500 text-sm">Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->

    <!-- Footer -->
    <footer class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Logo and Description -->
          <div>
            <h3 class="text-white text-xl font-bold">Contact Manager</h3>
            <p class="mt-4 text-gray-400">
              Simplify your contact management with our intuitive app.
            </p>
          </div>
          <!-- Links -->
          <div>
            <h4 class="text-white text-lg font-semibold">Quick Links</h4>
            <ul class="mt-4 space-y-2">
              <li>
                <a href="/about" class="text-gray-400 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" class="text-gray-400 hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="/terms" class="text-gray-400 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" class="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <!-- Social Media -->
          <div>
            <h4 class="text-white text-lg font-semibold">Follow Us</h4>
            <div class="mt-4 flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition">
                <span class="sr-only">Facebook</span>
                <!-- Facebook Icon -->
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M22.675 0h-21.35C.591 0 0 .592 0 1.325v21.351C0 23.408.591 24 1.325 24h11.494v-9.294H9.691V11.41h3.128V8.691c0-3.1 1.894-4.788 4.663-4.788 1.325 0 2.464.099 2.795.144v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.311h3.587l-.467 3.295h-3.12V24h6.116c.733 0 1.324-.592 1.324-1.324V1.325C24 .592 23.408 0 22.675 0z"
                  />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition">
                <span class="sr-only">Twitter</span>
                <!-- Twitter Icon -->
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M24 4.557a9.94 9.94 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.95.555-2.005.96-3.127 1.184a4.918 4.918 0 00-8.384 4.482A13.936 13.936 0 011.671 3.149a4.922 4.922 0 001.523 6.574 4.904 4.904 0 01-2.229-.616v.061a4.923 4.923 0 003.946 4.827 4.903 4.903 0 01-2.224.085 4.926 4.926 0 004.596 3.417 9.868 9.868 0 01-6.102 2.105c-.395 0-.787-.023-1.175-.069a13.945 13.945 0 007.548 2.212c9.055 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z"
                  />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition">
                <span class="sr-only">LinkedIn</span>
                <!-- LinkedIn Icon -->
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.77 24h20.46c.978 0 1.77-.774 1.77-1.729V1.729C24 .774 23.208 0 22.23 0zM7.063 20.452H3.577V9h3.486v11.452zM5.32 7.651a2.014 2.014 0 110-4.028 2.014 2.014 0 010 4.028zm15.132 12.801h-3.487v-5.63c0-1.342-.027-3.066-1.867-3.066-1.867 0-2.154 1.46-2.154 2.97v5.726h-3.485V9h3.348v1.561h.047c.466-.883 1.602-1.81 3.295-1.81 3.526 0 4.178 2.32 4.178 5.335v6.366z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-gray-700 pt-6 text-center">
          <p class="text-gray-400">&copy; 2023 Contact Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// No script is necessary for this static landing page.
// If you need to add interactivity, you can include it here.
</script>
