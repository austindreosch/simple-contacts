<template>
  <div class="relative border-r border-gray-200">
    <button @click="toggleDropdown" class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
      List
      <svg class="pl-1" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#666666"><path d="M450-483q26-30 40-66.12 14-36.12 14-74.88 0-38.41-14-74.21Q476-734 450-765q8-2 15-2.5t15-.5q60 0 102 42t42 102q0 60-42 102t-102 42q-8 0-15.5-.5T450-483Zm198 291v-92q0-41-19-76.5T576-421q68 16 130 44t62 93v92H648Zm132-240v-84h-84v-72h84v-84h72v84h84v72h-84v84h-72Zm-492-48q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM0-192v-92q0-25.41 12.5-46.7Q25-352 47-366q54-34 115.54-50 61.54-16 125-16T412-415q61 17 117 49 21 14 34 35.3 13 21.29 13 46.7v92H0Zm287.5-360q29.5 0 51-21 21.5-21.01 21.5-50.5 0-29.5-21.5-51t-51-21.5q-29.49 0-50.5 21.5-21 21.5-21 51 0 29.49 21 50.5 21.01 21 50.5 21ZM72-264h432v-20q0-6.07-3-11.03-3-4.97-8-8.97-48-26-99.5-41t-106-15q-54.5 0-106 14.5T83-304q-5 4-8 8.97-3 4.96-3 11.03v20Zm216-360Zm0 360Z"/></svg>
    </button>

    <div v-if="isOpen" class="absolute right-0 z-50 mt-1 w-44 divide-y divide-gray-100 rounded-md border border-gray-300 bg-white shadow-md" role="menu">
      <div class="p-2">
        <a @click="handleClick('allContacts')" href="#" class="block rounded-md px-1 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 text-left" role="menuitem">
          Selected Contacts
        </a>
        <a @click="handleClick('selectedContacts')" href="#" class="block rounded-md px-1 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 text-left" role="menuitem">
          Add by Tag
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


