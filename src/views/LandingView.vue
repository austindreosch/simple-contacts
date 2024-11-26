<template>
  <div class="pb-24 overflow-y-auto ">
    <!-- Hero Section -->
    <div class="fixed top-16 left-0 w-full bg-gray-800">
      <div class="absolute inset-0">

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
    <div class=" py-12 pt-[450px] pb-32">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <!-- <h2 class="text-3xl font-extrabold text-gray-800">Features</h2> -->
          <!-- <p class="mt-4 text-lg text-gray-600">
            Everything you need to streamline your contact management.
          </p> -->
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-16 w-16 mx-auto rounded-md bg-teal-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="m12 18 4-5h-3V2h-2v11H8z"></path><path d="M19 9h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2z"></path></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M2 2h2v20H2z"></path><rect x="6" y="13" width="16" height="6" rx="1"></rect><rect x="6" y="5" width="12" height="6" rx="1"></rect></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"></path><path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"></path></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M20 13.01h-7V10h1c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h1v3.01H4V18H3v4h4v-4H6v-2.99h5V18h-1v4h4v-4h-1v-2.99h5V18h-1v4h4v-4h-1v-4.99zM10 8V4h4l.002 4H10z"></path></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M13 19v-4h3l-4-5-4 5h3v4z"></path><path d="M7 19h2v-2H7c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.756 2.673-3.015l.581-.102.192-.558C8.149 8.274 9.895 7 12 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-3v2h3c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5z"></path></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="m8 16 5.991-2L16 8l-6 2z"></path></svg>
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
