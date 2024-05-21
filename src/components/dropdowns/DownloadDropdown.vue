<template>
  <div class="relative border-r border-gray-200">
    <button @click="toggleDropdown" class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
      Download
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#666666">
        <path d="M480-336 288-528l51-51 105 105v-342h72v342l105-105 51 51-192 192ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72h432v-72h72v72q0 29.7-21.16 50.85Q725.68-192 695.96-192H263.72Z"/>
      </svg>
    </button>

    <div v-if="isOpen" class="absolute right-0 z-50 mt-1 w-44 divide-y divide-gray-100 rounded-md border border-gray-300 bg-white shadow-md" role="menu">
      <div class="p-2">
        <a @click="handleClick('allContacts')" href="#" class="block rounded-md px-1 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 text-left" role="menuitem">
          All Contacts
        </a>
        <a @click="handleClick('selectedContacts')" href="#" class="block rounded-md px-1 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 text-left" role="menuitem">
          Selected Contacts
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dropdownStore } from '@/stores/dropdownStore';
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';

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


