<script setup>
import { db } from '@/assets/firebase';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import { user } from '@/composables/getUser';
import { dropdownStore } from '@/stores/dropdownStore';
import { addDoc, arrayUnion, collection, doc, getDoc, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';

const props = defineProps({
  selectedContacts: Array,
  filteredContacts: Array,
  contacts: Array,
  lists: Array,
});

const emit = defineEmits(['addedToGroup']);

const dropdownId = Symbol(); // Unique identifier for this dropdown
const searchQuery = ref('');
const selectedList = ref(null);
const selectedListName = ref('');

// This computed property checks if there are no selected contacts
const isSelectedContactsEmpty = computed(() => {
  return props.selectedContacts.length === 0;
});

const filteredLists = computed(() => {
  // console.log('Dropdown openedasdasd', lists.value);
  return props.lists.filter(list => list.listName.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

async function addToList() {
    if (selectedList.value && props.selectedContacts.length > 0) {
        try {
            // Get the document reference for the selected list
            const selectedListRef = doc(db, 'lists', selectedList.value); 
            const selectedListDoc = await getDoc(selectedListRef);
            
            if (selectedListDoc.exists()) {
                const newContactIds = props.selectedContacts.map(contact => contact.id);
                await updateDoc(selectedListRef, {
                    contacts: arrayUnion(...newContactIds), // Firestore ensures no duplicates in arrays with arrayUnion
                    lastUpdated: serverTimestamp() 
                });

                console.log(`Successfully added contacts to ${selectedListDoc.data().listName}`);
            } else {
                console.error('Selected list does not exist.');
            }

            // Close the modal
            isModalVisible.value = false;
            toggleDropdown();
            emit('addedToGroup');

        } catch (error) {
            console.error('Error updating the list:', error);
        }
    }
}

/* -----------------------------------------------------------
  Methods
----------------------------------------------------------- */
const isOpen = ref(false);

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
  // Prevent action if no contacts are selected
  if (action === 'selectedContacts' && isSelectedContactsEmpty.value) {
    return;  // Do nothing if no contacts are selected
  }
  
  if (action === 'selectedContacts') {
    // downloadContacts(props.selectedContacts);
  } else if (action === 'allContacts') {
    // downloadContacts(props.contacts);
  }
};

//Download Contacts Previously Here

/* -----------------------------------------------------------
  Modal Methods
----------------------------------------------------------- */
const isModalVisible = ref(false);
const modalMessage = ref('');

const openConfirmationModal = (listId, listName) => {
  modalMessage.value = `Would you like to add ${props.selectedContacts.length} contact(s) to the group "${listName}"?`;
  selectedList.value = listId;
  selectedListName.value = listName;
  isModalVisible.value = true;
};

const confirmAddToGroup = () => {
  // Logic to add contacts to the selected list
  addToList();
  isModalVisible.value = false;
};

const cancelAddToGroup = () => {
  isModalVisible.value = false;
};

/* -----------------------------------------------------------
  Event Listeners
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


<template>
  <div class="relative border-r border-gray-200">
    <!-- Dropdown Button -->
    <button @click="toggleDropdown" class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
      Group
      <svg class="pl-1" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#666666"><path d="M450-483q26-30 40-66.12 14-36.12 14-74.88 0-38.41-14-74.21Q476-734 450-765q8-2 15-2.5t15-.5q60 0 102 42t42 102q0 60-42 102t-102 42q-8 0-15.5-.5T450-483Zm198 291v-92q0-41-19-76.5T576-421q68 16 130 44t62 93v92H648Zm132-240v-84h-84v-72h84v-84h72v84h84v72h-84v84h-72Zm-492-48q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM0-192v-92q0-25.41 12.5-46.7Q25-352 47-366q54-34 115.54-50 61.54-16 125-16T412-415q61 17 117 49 21 14 34 35.3 13 21.29 13 46.7v92H0Zm287.5-360q29.5 0 51-21 21.5-21.01 21.5-50.5 0-29.5-21.5-51t-51-21.5q-29.49 0-50.5 21.5-21 21.5-21 51 0 29.49 21 50.5 21.01 21 50.5 21ZM72-264h432v-20q0-6.07-3-11.03-3-4.97-8-8.97-48-26-99.5-41t-106-15q-54.5 0-106 14.5T83-304q-5 4-8 8.97-3 4.96-3 11.03v20Zm216-360Zm0 360Z"/></svg>
    </button>

    <!-- Dropdown Menu -->
    <div v-if="isOpen" class="absolute right-0 z-50 mt-1 w-60 divide-y divide-gray-100 rounded-md border border-gray-300 bg-white shadow-md p-2" role="menu">
      <!-- Search Bar -->
      <div class="mb-2 flex items-center justify-between">
        <input v-model="searchQuery" type="text" class="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none" placeholder="Search groups...">
      </div>

      <!-- Display filtered lists -->
      <div class="max-h-40 overflow-y-auto">
        <div v-if="selectedContacts.length > 0" class="text-gray-600 text-sm pt-2 pb-0.5">Add ({{ selectedContacts.length }}) contacts to group: </div>
        <ul>
          <li 
            v-for="list in filteredLists" 
            :key="list.id" 
            :class="[
              'flex items-center gap-2 rounded-md px-1 py-2 text-sm', 
              isSelectedContactsEmpty ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-gray-700 hover:bg-gray-100'
            ]"
            :aria-disabled="isSelectedContactsEmpty"
            role="menuitem"
            class="mt-1"
          >
            <!-- + Icon -->
            <a
            @click.prevent="!isSelectedContactsEmpty && openConfirmationModal(list.id, list.listName)"
              :class="isSelectedContactsEmpty ? 'pointer-events-none' : ''"
              href="#"
              class="flex items-center flex-grow text-left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" :fill="selectedContacts.length > 0 ? '#5AC4B3' : '#B0B0B0'" viewBox="0 0 24 24" stroke-width="1.5" stroke="none" class="w-5 h-5 mr-2">
                <circle cx="12" cy="12" r="9" :fill="selectedContacts.length > 0 ? '#5AC4B3' : '#B0B0B0'" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke="white" stroke-width="1.5" d="M12 8v8m-4-4h8" />
              </svg>
              <span class="text-gray-600">{{ list.listName }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal 
      :show="isModalVisible" 
      title="Confirm Action" 
      :message="modalMessage" 
      @confirm="confirmAddToGroup"
      @cancel="cancelAddToGroup"
      confirmButtonColor="bg-my-teal text-white"
    />
  </div>
</template>