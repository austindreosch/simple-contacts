<script setup>
import { db } from '@/assets/firebase';
import listIcon from '@/assets/listicon.svg';
import AddTagButton from '@/components/dropdowns/AddTagButton.vue';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue'; // Import the modal component
import { deleteDoc, doc } from "firebase/firestore";
import { computed, defineEmits, defineProps, ref, watch } from 'vue';

const props = defineProps({ highlightedContact: Object});
const emit = defineEmits(['contactUpdated', 'contactDeleted']);

let localContact = ref({ ...props.highlightedContact });

watch(() => props.highlightedContact, (newVal, oldVal) => {
  // If switching contacts and there are unsaved changes, prompt the modal
  if (isEditing.value && hasUnsavedChanges.value) {
    showUnsavedChangesModal.value = true;
  } else {
    // Update the local contact and reset the editing state
    localContact.value = { ...newVal };
    isEditing.value = false; 
    hasUnsavedChanges.value = false;
  }
}, { deep: true });

let highlightedContact = computed(() => props.highlightedContact || {
  firstName: null,
  lastName: null,
  email: null,
  note: null,
  phone: null,
  tags: []
});

// Will be replaced with actual data from the database
const dummyLists = ref([
  { name: 'Friends' },
  { name: 'Coworkers' },
  { name: 'VIP Clients' }
]);


/* -----------------------------------------------------------
  Edit Contact Logic
----------------------------------------------------------- */
let isEditing = ref(false); 
let hasUnsavedChanges = ref(false); 
let showUnsavedChangesModal = ref(false);

const startEditing = () => {
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  localContact.value = { ...props.highlightedContact }; // Revert changes
  hasUnsavedChanges.value = false;
};

const deleteContact = async () => {
    const contactRef = doc(db, 'contacts', highlightedContact.value.id);
    await deleteDoc(contactRef);
    emit('contactDeleted');
};

const saveChanges = () => {
  emit('contactUpdated', localContact.value);
  isEditing.value = false;
  hasUnsavedChanges.value = false;
};

watch(localContact, (newVal, oldVal) => {
  hasUnsavedChanges.value = JSON.stringify(newVal) !== JSON.stringify(props.highlightedContact);
}, { deep: true });

/* -----------------------------------------------------------
    Modal Logic
----------------------------------------------------------- */
let showModal = ref(false);

const confirmDelete = () => {
  showModal.value = true;
};

const handleConfirm = () => {
  showModal.value = false;
  deleteContact();
};

const handleCancel = () => {
  showModal.value = false;
};

const handleConfirmDelete = () => {
  showModal.value = false;
  deleteContact();
};

const handleCancelDelete = () => {
  showModal.value = false;
};

const confirmUnsavedChanges = () => {
  showUnsavedChangesModal.value = true;
};

const handleConfirmUnsavedChanges = () => {
  saveChanges(); 
  showUnsavedChangesModal.value = false;
  isEditing.value = false;
};

const handleDiscardChanges = () => {
  cancelEditing(); 
  showUnsavedChangesModal.value = false;
};

/* -----------------------------------------------------------
  Popup Logic
----------------------------------------------------------- */
const showListsPopup = ref(false);

const showPopup = () => {
  showListsPopup.value = true;
};

const hidePopup = () => {
  showListsPopup.value = false;
};


</script>

<template>
    <!-- Unsaved Changes Confirmation Modal -->
    <ConfirmationModal
        v-if="showUnsavedChangesModal"
        :show="showUnsavedChangesModal"
        title="Unsaved Changes"
        :message="`You have unsaved changes for contact ${localContact.email}. Would you like to save them before switching?`"
        @confirm="handleConfirmUnsavedChanges"
        @cancel="handleDiscardChanges"
    />
    
    <!-- Delete Confirmation Modal -->
    <ConfirmationModal
        :show="showModal"
        title="Confirm Deletion"
        message="Are you sure you want to delete this contact?"
        @confirm="handleConfirmDelete"
        @cancel="handleCancelDelete"
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
    />

    <!-- Details -->
    <div class="flex justify-between items-end mb-2">
        <h1 class="text-left text-2xl">Details</h1>

        <div class="">
            <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                <button
                class="flex items-center gap-1 border-e px-3 py-2 text-sm font-medium focus:relative"
                :class="isEditing ? 'bg-my-teal text-white' : ''"
                @click="startEditing"
                >
                Edit
                <svg class="ml-1" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" :fill="isEditing ? '#ffffff' : '#666666'">
                    <path d="M144-144v-153l498-498q11-11 24-16t27-5q14 0 27 5t24 16l51 51q11 11 16 24t5 27q0 14-5 27t-16 24L297-144H144Zm549-498 51-51-51-51-51 51 51 51Z"/>
                </svg>
                </button>
            
                <button @click="confirmDelete" class="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:relative" title="Delete Contact">
                Delete
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#666666">
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm72-144h72v-336h-72v336Zm120 0h72v-336h-72v336Z"/>
                </svg>
                </button>
            </span>
        </div>
    </div>

    

    <!-- Form for editing contact details -->
    <div class="mx-auto max-w-screen-xl" >
        <div class="rounded-lg p-4 bg-white border border-gray-300 shadow-md overflow-visible">
            <form @submit.prevent="saveChanges" class="space-y-4 mt-2">

                <!-- First / Last Name -->
                <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    <label
                        for="firstName"
                        class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                        type="text"
                        id="firstName"
                        class="w-full rounded-lg border-gray-300 p-2 my-0.5 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="First Name"
                        v-model="localContact.firstName"
                        :disabled="!isEditing"
                        :class="{ 'opacity-50': !isEditing }"
                        />
                    
                        <span
                        class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 font-bold transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                        First Name
                        </span>
                    </label>

                    <label
                        for="lastName"
                        class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                        type="text"
                        id="lastName"
                        class="w-full rounded-lg border-gray-300 p-2 my-0.5 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Last Name"
                        v-model="localContact.lastName"
                        :disabled="!isEditing"
                        :class="{ 'opacity-50': !isEditing }"
                        />
                    
                        <span
                        class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 font-bold transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                        Last Name
                        </span>
                    </label>

                </div>
                
                <!-- Email -->
                <div>
                    <label
                        for="email"
                        class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                        type="text"
                        id="email"
                        class="w-full rounded-lg border-gray-300 p-2 my-0.5 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Email"
                        v-model="localContact.email"
                        :disabled="!isEditing"
                        :class="{ 'opacity-50': !isEditing }"
                        />
                    
                        <span
                        class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 font-bold transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                        Email
                        </span>
                    </label>

                </div>

                <!-- Note and Phone -->
                <div class="grid grid-cols-1 md:grid-cols-10 gap-2">
                    <div class="md:col-span-6">
                        <label
                            for="note"
                            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                            type="text"
                            id="note"
                            class="w-full rounded-lg border-gray-300 p-2 my-0.5 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                            placeholder="Note"
                            v-model="localContact.note"
                            :disabled="!isEditing"
                            :class="{ 'opacity-50': !isEditing }"
                            />
                        
                            <span
                            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 font-bold transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                            Note
                            </span>
                        </label>
                    </div>

                    <div class="md:col-span-4">
                        <label
                        for="phone"
                        class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                            type="text"
                            id="phone"
                            class="w-full rounded-lg border-gray-300 p-2 my-0.5 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                            placeholder="Phone"
                            v-model="localContact.phone"
                            :disabled="!isEditing"
                            :class="{ 'opacity-50': !isEditing }"
                            />
                        
                            <span
                            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 font-bold transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                            Phone
                            </span>
                        </label>

                    </div>
                </div>

                <!-- Tags -->
                <div class="relative block rounded-md border-2 border-gray-200 shadow-sm p-2 overflow-visible" :disabled="!isEditing"
                :class="{ 'opacity-50': !isEditing }">
                    <!-- Edge-positioned label for tags -->
                    <label
                        v-if="localContact.id"
                        class="absolute text-xs text-gray-700 font-bold bg-white px-1 -top-2.5 left-2.5 transform translate-y-0"
                    >
                        Tags
                    </label>
                    
                    <!-- Container for displaying tags and adding new ones -->
                    <div class="flex flex-wrap items-start gap-2 pt-1 min-h-8">
                        <!-- Existing tags displayed as spans -->
                         
                        <span
                            v-for="(tag, index) in [...new Set(localContact.tags)]"
                            :key="tag + index"
                            class="bg-my-teal text-white px-2 py-1 rounded-md text-sm"
                            >
                            {{ tag }}
                        </span>

                        <!-- Placeholder button to simulate adding new tags -->
                        <!-- <button v-if="localContact.id" class=" pt-0.5" @click="openTagInput">
                            <PlusBoxIcon class="text-my-teal" />
                        </button> -->
                        <AddTagButton v-if="isEditing"/>
                    </div>
                </div>

                <!-- Button, Details -->
                <div class="flex items-center justify-between">
                    <div class="text-2xs text-left ml-2 text-gray-400">
                        <p class="">Last Updated:</p>
                        <p class="">{{ localContact.lastUpdated ? localContact.lastUpdated : '9:36AM 9/23/2024' }}</p>

                    </div>
                    <div class="flex space-x-2">
                        <div class="relative inline-block">
                            <!-- Button with hover events to show/hide the list popup -->
                            <div
                            class="rounded-md bg-gray-200 text-my-dark px-2 py-2 text-sm font-medium shadow-md"
                            @mouseover="showPopup"
                            @mouseleave="hidePopup"
                            >
                            <listIcon class="w-6 h-6" />
                            </div>

                            <!-- Popup for list display -->
                            <div
                            v-if="showListsPopup"
                            class="absolute z-10 bg-white border border-gray-300 shadow-lg rounded-md p-2 w-48 "
                            style="left: -12.2rem; top: 0rem;" 
                            >
                            <p class="text-gray-700 font-bold text-sm">Assigned Lists</p>
                            <hr class="my-1 border-gray-300" />
                            <ul>
                                <li v-for="list in dummyLists" :key="list.name" class="text-gray-600 text-sm">
                                {{ list.name }}
                                </li>
                            </ul>
                            </div>
                        </div>

                        

                        <button
                            v-if="isEditing"
                            type="submit"
                            class="rounded-md bg-my-peach text-my-dark px-5 py-2 text-sm font-medium shadow-md"
                        >
                            Save Changes
                        </button>
                    </div>

                </div>

            </form>
        </div>
    </div>


</template>