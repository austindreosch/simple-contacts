<script setup>
import dummyData from '@/assets/dummydata.json';
import { db } from '@/assets/firebase';
import DownloadDropdown from '@/components/dropdowns/DownloadDropdown.vue';
import EmailDropdown from '@/components/dropdowns/EmailDropdown.vue';
import FilterDropdown from '@/components/dropdowns/FilterDropdown.vue';
import { computed, defineEmits, defineProps, ref } from 'vue';

const props = defineProps({
    filterTag: String,
    contacts: Array
});
const emit = defineEmits(['contactHighlighted']);
const loading = ref(true);
const highlightedContactId = ref(null);

/* -----------------------------------------------------------
    CONTACT SELECTION & FILTERING
----------------------------------------------------------- */

function highlightContact(contact) {
    // Unselect if the same contact is clicked again, otherwise select the contact
    if (highlightedContactId.value === contact.id) {
        highlightedContactId.value = null; 
        emit('contactHighlighted', null);
    } else {
        highlightedContactId.value = contact.id; 
        emit('contactHighlighted', contact);
    }
}

const filteredContacts = computed(() => {
  // If a filter tag is passed, filter the contacts, otherwise show all
  return props.filterTag ? props.contacts.filter(contact => contact.tags.includes(props.filterTag)) : props.contacts;
});

/* -----------------------------------------------------------
    PAGINATION
----------------------------------------------------------- */
const currentPage = ref(1);
const contactsPerPage = 20;

const paginatedContacts = computed(() => {
    const start = (currentPage.value - 1) * contactsPerPage;
    const end = start + contactsPerPage;
    return filteredContacts.value.slice(start, end);
});
const totalPages = computed(() => Math.ceil(filteredContacts.value.length / contactsPerPage));

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}
function goToPage(page) {
    currentPage.value = page;
}

</script>



<template>
    <div class="flex flex-col max-h-screen">
        <!-- Details -->
        <div class="flex justify-between items-end mb-2 px-1">
            <!-- <h1 class="text-left text-2xl">Contacts</h1> -->
            <p class="text-xs">Currently showing {{ filteredContacts.length || 'N/A' }} of {{ props.contacts.length }} total contacts. <b> {{  '0' }} contacts selected.</b></p>            

            <div class="flex items-center gap-2">
                <!-- Search -->
                <div class="relative">
                    <label for="Search" class="sr-only"> Search for... </label>

                    <input
                        type="text"
                        id="Search"
                        placeholder="Search for..."
                        class="w-full rounded-md border border-gray-200 py-2 px-2 pe-10 shadow-md sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />

                    <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button
                        type="button"
                        class="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                        <span class="sr-only">Search</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-4 w-4"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                        </button>
                    </span>
                </div>


                <!-- Download, Email & Filter -->
                <span class="inline-flex rounded-md border border-gray-200 bg-white shadow-sm">
                    <EmailDropdown />
                    <DownloadDropdown />
                    <FilterDropdown />
                </span>

            </div>
        </div>







        <!-- TABLE -->
        <div class="flex-grow overflow-hidden rounded-lg border border-gray-300 shadow-md my-0 mr-1 mb-1 flex flex-col">
            <div class="overflow-x-auto">
                <table class="min-w-full table-fixed divide-y divide-gray-200 bg-white text-sm">
                    <thead class="bg-my-dark sticky text-white top-0">
                        <tr>
                            <th class="px-4 py-2 text-left">
                                <label for="SelectAll" class="sr-only">Select All</label>
                                <input type="checkbox" id="SelectAll" class="size-4 rounded border-gray-300" />
                            </th>
                            <th class="px-4 py-2 text-left font-medium ">Name</th>
                            <th class="px-4 py-2 text-left font-medium ">Email</th>
                            <th class="px-4 py-2 text-left font-medium pl-4 ">Phone</th>
                            <th class="px-4 py-2 text-left font-medium ">Note</th>
                            <th class="px-4 py-2 text-left font-medium pl-5 ">Tags</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="contact in paginatedContacts" :key="contact.id" @click="highlightContact(contact)" :class="{ 'bg-blue-100': contact.id === highlightedContactId }" class="cursor-pointer">
                            <td class="px-4 py-2 text-left">
                                <label class="sr-only" :for="'Row' + contact.id">Row {{ contact.id }}</label>
                                <input class="size-4 rounded border-gray-300" type="checkbox" :id="'Row' + contact.id" />
                            </td>
                            <td class="px-4 py-2 text-left font-medium text-gray-900 truncate max-w-xs">{{ contact.firstName }} {{ contact.lastName }}</td>
                            <td class="px-4 py-2 text-left text-gray-700 truncate max-w-xs">{{ contact.email }}</td>
                            <td class="px-4 py-2 text-left text-gray-700 truncate max-w-xs">{{ contact.phone }}</td>
                            <td class="px-4 py-2 text-left text-gray-700 truncate max-w-xs">{{ contact.note }}</td>
                            <td class="px-4 py-2 text-left text-gray-700 truncate max-w-xs">
                                <div class="flex flex-nowrap gap-0.5 items-center">
                                    <div v-for="(tag, index) in contact.tags" :key="tag" class="mx-0.5">
                                        <span v-if="index < 3" class="bg-my-teal text-white px-2 py-1 rounded-md text-sm">{{ tag }}</span>
                                        <span v-else-if="index === 3" class="bg-my-teal text-white px-2 py-1 rounded-md text-sm">...</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <div>
                                
                            </div>
                        </tr>
                    </tbody>
                </table>
                    <div class="bg-white py-2">

                        <!-- PAGINATION -->
                        <ol class="flex justify-center gap-1 text-xs font-medium mt-3">
                            <li>
                                <button
                                    @click="prevPage"
                                    :disabled="currentPage === 1"
                                    class="inline-flex size-8 items-center justify-center rounded border border-gray-200 bg-gray-100 text-gray-900 rtl:rotate-180"
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
                                    :class="{'block size-8 rounded border border-gray-200 bg-gray-100 text-center leading-8 text-gray-900': page !== currentPage, 'block size-8 rounded border-my-teal bg-my-teal text-center leading-8 text-white': page === currentPage}"
                                >
                                    {{ page }}
                                </button>
                            </li>
                
                            <li>
                                <button
                                    @click="nextPage"
                                    :disabled="currentPage === totalPages"
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
            </div>
        </div>



    </div>
</template>