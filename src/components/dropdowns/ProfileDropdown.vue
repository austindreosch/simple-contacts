<script setup>
import { db } from '@/assets/firebase';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import { user } from '@/composables/getUser';
import { dropdownStore } from '@/stores/dropdownStore';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userEmail = computed(() => user.value ? user.value.email : null);


const isOpen = ref(false);
const showModal = ref(false);
const dropdownId = Symbol(); // Unique identifier for this dropdown


const handleClick = async (action) => {
  console.log(`${action} clicked`);

  if (action === 'Delete All Contacts') {
    showModal.value = true;
  } else if (action === 'Logout') {
    // Implement logout logic here
  } else if (action === 'Settings') {
    // Implement settings logic here
  }

  dropdownStore.clearOpenDropdown(); // Close the dropdown after an action is clicked
};

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


/* -----------------------------------------------------------
  Delete All Contacts 
----------------------------------------------------------- */

async function deleteAllContacts(userId) {
  try {
    // Query all contacts for the specific user
    const q = query(collection(db, 'contacts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    // Iterate over each document and delete it
    const deletePromises = querySnapshot.docs.map(docSnapshot => {
      const contactRef = doc(db, 'contacts', docSnapshot.id);
      return deleteDoc(contactRef);
    });

    // Wait for all deletions to complete
    await Promise.all(deletePromises);

    console.log(`All contacts for user ${userId} have been deleted.`);
  } catch (error) {
    console.error('Error deleting contacts:', error);
  }
}


const confirmDeleteAllContacts = async () => {
  await deleteAllContacts(user.value.uid);
  alert('All contacts have been deleted.');
  showModal.value = false;
  router.push('/');
};

const cancelDeleteAllContacts = () => {
  showModal.value = false;
};


/* -----------------------------------------------------------
  Remove All Tags
----------------------------------------------------------- */
async function deleteAllTags(userId) {
  try {
    // Query all tags for the specific user
    const q = query(collection(db, 'tags'), where('userId', '==', user.value.uid));
    const querySnapshot = await getDocs(q);

    // Iterate over each document and delete it
    const deletePromises = querySnapshot.docs.map(docSnapshot => {
      return deleteDoc(docSnapshot.ref);
    });

    // Wait for all deletions to complete
    await Promise.all(deletePromises);

    console.log(`All tags for user ${user.value.email} have been deleted.`);
  } catch (error) {
    console.error('Error deleting tags:', error);
  }
}

</script>


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
            class="block rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 hover:text-gray-400 text-left cursor-not-allowed"
            disabled
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
  
          <form method="POST" action="#">
            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              role="menuitem"
              @click.prevent="deleteAllTags"
            >
              <!-- SVG Icon -->
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
              Remove All Tags
            </button>
          </form>
  
  
  
  
        </div>
      </div>
  
  
  
  
      
      
      <ConfirmationModal
        :show="showModal"
        title="Confirm Deletion"
        message="Are you sure you want to delete all contacts? This action cannot be undone."
        @confirm="confirmDeleteAllContacts"
        @cancel="cancelDeleteAllContacts"
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
      />
    </div>
  
  
  </template>