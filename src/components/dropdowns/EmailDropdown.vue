<template>
  <div class="relative border-r border-gray-200 rounded-l-md">
    <button @click="toggleDropdown" class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
      Email
      <svg class="ml-[1.5px]"xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#666666"><path d="M168-192q-29 0-50.5-21.5T96-264v-432q0-29 21.5-50.5T168-768h624q30 0 51 21.5t21 50.5v432q0 29-21 50.5T792-192H168Zm312-240 312-179v-85L480-517 168-696v85l312 179Z"/></svg>
    </button>

    <div v-if="isOpen" class="absolute right-0 z-50 mt-1 w-44 divide-y divide-gray-100 rounded-md border border-gray-300 bg-white shadow-md" role="menu">
      <div class="p-2">
        <a
          @click.prevent="handleClick('selectedContacts')"
          href="#"
          class="block rounded-md px-1 py-2 text-sm text-left "
          :class="isSelectedContactsEmpty ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'"
          :aria-disabled="isSelectedContactsEmpty"
          :tabindex="isSelectedContactsEmpty ? -1 : 0"
          :disabled="isSelectedContactsEmpty"
          role="menuitem"
        >
          Selected Contacts <span v-if="props.selectedContacts && props.selectedContacts.length > 0" class="text-[.71rem] text-gray-400">({{ props.selectedContacts.length }})</span>
        </a>
        <a @click="handleClick('allContacts')" href="#" class="block rounded-md px-1 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 text-left" role="menuitem">
          All Contacts
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dropdownStore } from '@/stores/dropdownStore';
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';

const props = defineProps({
  selectedContacts: Array,
  filteredContacts: Array,
  contacts: Array
});

const isOpen = ref(false);
const dropdownId = Symbol(); // Unique identifier for this dropdown


const isSelectedContactsEmpty = computed(() => {
  return props.selectedContacts.length === 0;
});

/* -----------------------------------------------------------
  Methods
----------------------------------------------------------- */


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
  let emails = [];
  
  if (action === 'selectedContacts') {
    emails = props.selectedContacts.map(contact => contact.email);
  } else if (action === 'allContacts') {
    emails = props.contacts.map(contact => contact.email);
  }

  // Check if emails are available before proceeding
  if (emails.length === 0) {
    console.warn("No email addresses available");
    return;
  }

  // Create mailto link
  const mailtoLink = `mailto:?bcc=${emails.join(',')}`;
  
  console.log(mailtoLink);
  
  // Open the email client
  window.location.href = mailtoLink;
  
  // Clear dropdown
  dropdownStore.clearOpenDropdown();
};



/* -----------------------------------------------------------
  Lifecycle Hooks
----------------------------------------------------------- */

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  // console.log('Mounted, event listener added');
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  // console.log('Unmounted, event listener removed');
});

watchEffect(() => {
  isOpen.value = dropdownStore.openDropdownId === dropdownId;
});
</script>


