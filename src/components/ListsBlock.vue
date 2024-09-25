<script setup>
import { db } from '@/assets/firebase';
import SortDropdown from '@/components/dropdowns/SortDropdown.vue';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import { user } from '@/composables/getUser';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { computed, defineEmits, onMounted, ref, watch } from 'vue';


const props = defineProps({
    contacts: Array,
    lists: Array,
});

const emit = defineEmits(['refreshContacts', 'contactSelected']);

// const lists = ref([]);
const newListName = ref('');
const showNewListForm = ref(false);
const searchTerm = ref('');
const highlightedContact = ref(null);

const contacts = computed(() => {
  return Array.isArray(props.contacts) ? props.contacts : [];
});


const lists = computed(() => {
  return Array.isArray(props.lists) ? props.lists : props.lists.value;
});

const filteredLists = computed(() => {
  // If a filter tag is passed, filter the contacts, otherwise show all
//   console.log('lists', lists.value);
  return lists.value
});

watch(contacts, (newContacts, oldContacts) => {
  console.log('Contacts computed property updated:', newContacts);
}, { immediate: true }); // Immediate true will log the value right away on component mount


// 
//this needs a revamp
// 
function refreshPage() {
  emit('refeshContacts');
}

async function addNewList() {
    if (newListName.value && user.value) {
        try {
            await addDoc(collection(db, 'lists'), {
                listName: newListName.value,
                userID: user.value.uid,
                contacts: [], 
                dateAdded: serverTimestamp(),
                lastUpdated: serverTimestamp()
            });
            // Clear form and reload
            newListName.value = '';  
            showNewListForm.value = false;  
            refreshPage();
        } catch (error) {
            console.error('Error adding new list:', error);
        }
    }
}

function getContactById(contactId) {
  return props.contacts.find(contact => contact.id === contactId) || null;
}

// needs setup
function removeContactFromList(contact) {
  console.log('removeContactFromList', contact);
}



/* -----------------------------------------------------------
  VIEW SWITCHING
----------------------------------------------------------- */
const showListDetails = ref(false); // Toggle between list view and detail view
const selectedList = ref(null); // Store the selected list for detail view

function selectList(list) {
  selectedList.value = {
    ...list,
    contacts: list.contacts.map(contactId => getContactById(contactId)).filter(contact => contact !== null)
  };
  showListDetails.value = true; // Switch to detail view
}



function backToListView() {
  showListDetails.value = false;
  selectedList.value = null;
}

/* -----------------------------------------------------------
    PAGINATION
----------------------------------------------------------- */

const currentListPage = ref(1);
const listsPerPage = 5;

const paginatedLists = computed(() => {
    const start = (currentListPage.value - 1) * listsPerPage;
    const end = start + listsPerPage;
    return filteredLists.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredLists.value.length / listsPerPage)); //replace this with real 

function nextPage() {
    if (currentListPage.value < totalPages.value) {
        currentListPage.value++;
    }
}

function prevPage() {
    if (currentListPage.value > 1) {
        currentListPage.value--;
    }
}
function goToPage(page) {
    currentListPage.value = page;
}

/* -----------------------------------------------------------
  CONTACT HIGHLIGHT/DELETION FROM LIST
----------------------------------------------------------- */
const showDeleteModal = ref(false);
const contactToDelete = ref(null);

function selectContact(contact) {
  if (highlightedContact.value && highlightedContact.value.id === contact.id) {
    highlightedContact.value = null; // Unhighlight if already selected
  } else {
    highlightedContact.value = contact; // Set the clicked contact as highlighted
  }
  emit('contactSelected', highlightedContact.value);
  // console.log('contact selected:', highlightedContact.value);
}


function confirmDeletion(contact) {
  contactToDelete.value = contact;
  showDeleteModal.value = true;
}

function handleDeleteConfirmed() {
  removeContactFromList(contactToDelete.value);
  showDeleteModal.value = false;
}

function cancelDeletion() {
  showDeleteModal.value = false;
}

const confirmationMessage = computed(() => {
  if (contactToDelete.value) {
    const firstName = contactToDelete.value.firstName || '';
    const lastName = contactToDelete.value.lastName || '';
    return `Are you sure you want to remove ${firstName} ${lastName} from the group?`;
  }
  return 'Are you sure you want to remove this contact from the group?';
});

function isContactHighlighted(contact) {
  return highlightedContact.value && highlightedContact.value.id === contact.id;
}


//debug
// watch(contactToDelete, (newVal) => {
//   if (newVal) {
//     console.log('contactToDelete updated:', newVal);
//   } else {
//     console.warn('contactToDelete is not defined!');
//   }
// });


/* -----------------------------------------------------------
  STYLING
----------------------------------------------------------- */
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().substr(-2);
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    return `${month}/${day}/${year}`;
};

</script>






<template>

<ConfirmationModal
  v-if="showDeleteModal"
  :show="showDeleteModal"
  @confirm="handleDeleteConfirmed"
  @cancel="cancelDeletion"
  title="Confirm Deletion"
  :message="confirmationMessage"
  confirmButtonColor="bg-red-500 text-white"
/>

<!-- Title/Buttons -->
<div class="flex justify-between items-end my-2">
    <h1 class="text-left text-2xl mt-2">Groups</h1>
    <div>
        <span class="inline-flex rounded-md border bg-white shadow-sm">
            <button
                class="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:relative border-r border-gray-200"
                :class="showNewListForm ? 'bg-my-teal text-white hover:bg-teal-600 border border-teal-600 rounded-l-md' : ''"
                title="View Orders"
                @click="showNewListForm = !showNewListForm"
                >
                New
                <svg class="mt-1" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" :fill="showNewListForm ? 'white' : '#666666'" ><path d="M144-396v-72h288v72H144Zm0-150v-72h432v72H144Zm0-150v-72h432v72H144Zm492 456v-156H480v-72h156v-156h72v156h156v72H708v156h-72Z"/></svg> 
            </button>
            <SortDropdown />
        </span>
    </div>
</div>


<div class="bg-white border border-gray-300 rounded-lg shadow-md w-full px-3 pt-1 space-y-2 select-none">
  <!-- ///////////////// -->
  <!-- Top Section -->
  <div>
      <!-- Add New List Form if showNewListForm (this should be a search bar otherwise?) -->
      <div v-if="showNewListForm" class="pt-3">
          <div class="mb-2 flex items-center h-10">
              <input
              type="text"
              v-model="newListName"
              placeholder="Enter new group name..."
              class="flex-grow px-3 py-2 border rounded-md mr-1"
              />
              <button
              @click="addNewList"
              class="bg-my-teal text-white px-3 py-2 rounded-md border border-green-700 hover:bg-my-teal-dark"
              >
              Add Group
              </button>

              <div class="flex mb-1">
                  <hr class="my-2 border-gray-300" />
              </div>
          </div>
          <hr></hr>
      </div>

      <!-- Normal Search Bar -->
      <div v-if="!showNewListForm && !showListDetails" class="pt-3">
          <div class="mb-2 flex items-center h-10">
              <input
                  type="text"
                  v-model="searchTerm"
                  placeholder="Search groups..."
                  class="flex-grow px-3 py-2 border rounded-md"
              />
          </div>
          <hr></hr>
      </div>
      
  </div>

  <!-- ///////////////// -->
  <!-- Block - Lists View -->
  <div v-if="!showListDetails">
    <div v-for="list in paginatedLists" :key="list.id" @click="selectList(list)">
      <div class="relative block rounded-md border-2 border-teal-600 shadow-lg p-2 bg-my-teal cursor-pointer mb-1">
        <div class="grid grid-cols-20 justify-between items-center h-full px-1 pl-2">
          <div class="col-span-12 text-left">
            <h2 class="text-sm font-semibold truncate text-white">{{ list.listName }}</h2>
          </div>
          <div class="col-span-4 flex flex-col items-center justify-center ml-2">
            <p class="text-xs text-white">{{ list.contacts.length }}</p>
            <p class="text-xs text-white">contacts</p>
          </div>
          <div class="col-span-4 text-right">
            <p class="text-xs text-white">{{ formatDate(list.dateAdded) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ///////////////// -->
  <!-- Block - Detail View -->
  <div v-if="showListDetails">
    <div class="flex justify-between items-center mb-[0.35rem] border bg-my-teal p-2 py-[2.5] px-2.5 rounded-md border-teal-600">
        <h1 class="text-lg font-semibold text-white mr-[0.7rem] truncate " style="max-width: 200px;" title="{{ selectedList.listName }}">{{ selectedList.listName }}</h1>
        <div class="flex items-center">
          <div>
            <p class="text-white font-bold text-xs mr-3 whitespace-nowrap">{{ selectedList.contacts.length }} CONTACTS</p>
          </div>
          <button class="text-sm bg-white px-2 py-0.5 rounded-md" @click="backToListView">Back</button>
        </div>
    </div>
    <hr></hr>

    <div class="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 overflow-y-auto pr-1 pb-1 max-h-[210px]">
      <div 
        v-for="(contact, index) in selectedList.contacts" 
        :key="contact.id" 
        class="flex justify-between items-center p-1.5 border rounded-md shadow-sm cursor-pointer"
        :class="{
          'bg-gray-50': !isContactHighlighted(contact), // Default background for non-highlighted
          'bg-blue-100': isContactHighlighted(contact)  // Highlighted background
        }"
        @click="selectContact(contact)" 
      >
        <p class="text-xs truncate">{{ contact.firstName }} {{ contact.lastName }}</p>
        <button 
          class="ml-1 text-xs text-red-500 hover:text-red-700 focus:outline-none"
          @click.stop="confirmDeletion(contact)"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-3 h-3 text-my-teal"
          >
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="0" />
              <path d="M16 8 L8 16 M8 8 L16 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>



    <hr class="mt-1"></hr>
    <div class="h-10 text-2xs pt-3 text-gray-400 ">
      <p class="">Last updated: {{ formatDate(selectedList.lastUpdated) }}</p>
    </div>

  </div>

  <!-- ///////////////// -->
  <!-- Pagination Buttons - should this be in a div?-->
  <ol v-if="!showListDetails" class="flex justify-center gap-1 text-xs font-medium pt-2 pb-4">
      <li>
          <button
          @click="prevPage"
          :disabled="currentListPage === 1"
          class="inline-flex size-8 items-center justify-center rounded border border-gray-2 00 bg-gray-100 text-gray-900 rtl:rotate-180"
          >
              <span class="sr-only">Prev Page</span>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
              >
              <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
              />
              </svg>
          </button>
      </li>
  
      <li v-for="page in totalPages" :key="page">
              <button
              @click="goToPage(page)"
              :class="{'block size-8 rounded border border-gray-2 00 bg-gray-100 text-center leading-8 text-gray-900': page !== currentListPage, 'block size-8 rounded border-my-teal bg-my-teal text-center leading-8 text-white': page === currentListPage}"
              >
              {{ page }}
          </button>
      </li>
      <li>
          <button
          @click="nextPage"
          :disabled="currentListPage === totalPages"
          class="inline-flex size-8 items-center justify-center rounded border border-gray-200 bg-gray-100 text-gray-900 rtl:rotate-180"
          >
              <span class="sr-only">Next Page</span>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
              >
              <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
              />
              </svg>
          </button>
      </li>
  </ol>

</div>

</template>