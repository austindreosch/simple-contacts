<template>

<div class="relative">
    <div class="inline-flex items-center overflow-hidden rounded-md bg-my-dark text-white mt-[0.7px] shadow hover:bg-gray-600">
      <a
        href="#"
        @click="toggleDropdown"
        class="border-e px-4 py-[0.8rem] text-sm/none text-white items-center hover:bg-gray-600"
      >
        {{userEmail}}
      </a>

      <button @click="toggleDropdown" class="h-full p-3  text-white hover:bg-gray-500 ">
        <span class="sr-only text-white py-2">Menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            class="text-white"
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
      role="menu"
    >
      <div class="p-2">
        <a
          href="#"
          class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-left"
          role="menuitem"
          @click.prevent="handleClick('Settings')"
        >
          Settings
        </a>

        <a
          href="#"
          class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-left"
          role="menuitem"
          @click.prevent="handleClick('Logout')"
        >
          Logout
        </a>
      </div>

      <div class="p-2">
        <form method="POST" action="#">
          <button
            type="submit"
            class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            role="menuitem"
            @click.prevent="handleClick('Delete All Contacts')"
          >
            <svg
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>

            Delete All Contacts
          </button>
        </form>
      </div>
    </div>
  </div>


</template>

<script setup>
import { user } from '@/composables/getUser';
import { dropdownStore } from '@/stores/dropdownStore';
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';

import { computed } from 'vue';

const userEmail = computed(() => user.value ? user.value.email : null);


const isOpen = ref(false);
const dropdownId = Symbol(); // Unique identifier for this dropdown

const toggleDropdown = () => {
  if (dropdownStore.openDropdownId === dropdownId) {
    dropdownStore.clearOpenDropdown();
  } else {
    dropdownStore.setOpenDropdown(dropdownId);
  }
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    dropdownStore.clearOpenDropdown();
  }
};

const handleClick = (action) => {
  console.log(`${action} clicked`);
  dropdownStore.clearOpenDropdown();
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  console.log('Mounted, event listener added');
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  console.log('Unmounted, event listener removed');
});

watchEffect(() => {
  isOpen.value = dropdownStore.openDropdownId === dropdownId;
});
</script>


