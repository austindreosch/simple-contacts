<template>
  <div class="relative border-r border-gray-200">
    <button @click="toggleDropdown" class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
      Filter
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#666666"><path d="M456.18-192Q446-192 439-198.9t-7-17.1v-227L197-729q-9-12-2.74-25.5Q200.51-768 216-768h528q15.49 0 21.74 13.5Q772-741 763-729L528-443v227q0 10.2-6.88 17.1-6.89 6.9-17.06 6.9h-47.88Z"/></svg>
    </button>

    <div v-if="isOpen" class="absolute right-0 z-50 mt-1 w-44 divide-y divide-gray-100 rounded-md border border-gray-300 bg-white shadow-md" role="menu">
      <div class="p-2">
        <a @click="handleClick('filterByTags')" href="#" class="block rounded-md px-1 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 text-left" role="menuitem">
          Filter by Tags
        </a>
        <a @click="handleClick('selectedContacts')" href="#" class="block rounded-md px-1 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 text-left" role="menuitem">
          Filter by Location
        </a>
        <a @click="handleClick('filterByLists')" href="#" class="block rounded-md px-1 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 text-left" role="menuitem">
          Filter by Lists
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


