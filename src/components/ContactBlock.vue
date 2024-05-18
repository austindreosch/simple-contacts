<script setup>
import dummyData from '@/assets/dummydata.json';
import { db } from '@/assets/firebase';
import { computed, defineEmits, defineProps, ref } from 'vue';

const props = defineProps({
    filterTag: String,
    contacts: Array
});
const emit = defineEmits(['contactSelected']);
const loading = ref(true);
const selectedContactId = ref(null);

const filteredContacts = computed(() => {
  // If a filter tag is passed, filter the contacts, otherwise show all
  return props.filterTag ? props.contacts.filter(contact => contact.tags.includes(props.filterTag)) : props.contacts;
});

function selectContact(contact) {
    // Unselect if the same contact is clicked again, otherwise select the contact
    if (selectedContactId.value === contact.id) {
        selectedContactId.value = null; 
        emit('contactSelected', null);
    } else {
        selectedContactId.value = contact.id; 
        emit('contactSelected', contact);
    }
}

</script>

<template>
    <div class="w-full max-w-8xl">
        <!-- Details -->
        <div class="flex justify-between items-end mb-2 px-2" >
            <h1 class="text-left text-2xl">Contacts</h1>
            <p class="text-xs">Currently showing {{ filteredContacts.length || 'N/A' }} of {{ props.contacts.length }} total contacts.</p>
            <button class="text-xs font-bold" >FILTER BY TAG</button>
        </div>

        <!-- TABLE-->
        <div class="overflow-x-auto rounded-lg border border-gray-300 shadow-md my-1 mr-1 mb-1">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mb-1">
                    <thead class="ltr:text-left rtl:text-right text-left bg-gray-200">
                        <tr>
                            <th class="px-4 py-2">
                                <label for="SelectAll" class="sr-only">Select All</label>
                                <input type="checkbox" id="SelectAll" class="size-4 rounded border-gray-300" />
                            </th>
                            <th class="whitespace-nowrap px-4 py-1 font-medium text-gray-900">Name</th>
                            <th class="whitespace-nowrap px-4 py-1 font-medium text-gray-900">Email</th>
                            <th class="whitespace-nowrap px-4 py-1 font-medium text-gray-900">Phone</th>
                            <th class="whitespace-nowrap px-4 py-1 font-medium text-gray-900">Note</th>
                            <th class="whitespace-nowrap px-4 py-1 font-medium text-gray-900">Tags</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="contact in filteredContacts" :key="contact.id" @click="selectContact(contact)" :class="{ 'bg-blue-100': contact.id === selectedContactId }" class="text-left">
                            <td class="px-4 py-2">
                                <label class="sr-only" :for="'Row' + contact.id">Row {{ contact.id }}</label>
                                <input class="size-4 rounded border-gray-300" type="checkbox" :id="'Row' + contact.id" />
                            </td>
                            <td class="whitespace-nowrap px-4 py-1 font-medium text-gray-900 truncate max-w-xs">{{ contact.firstName }} {{ contact.lastName }}</td>
                            <td class="whitespace-nowrap px-4 py-1 text-gray-700 truncate max-w-xs">{{ contact.email }}</td>
                            <td class="whitespace-nowrap px-4 py-1 text-gray-700 truncate max-w-xs">{{ contact.phone }}</td>
                            <td class="whitespace-nowrap px-4 py-1 text-gray-700 truncate max-w-xs">{{ contact.note }}</td>
                            <td class="whitespace-nowrap px-4 py-1 text-gray-700 max-w-xs">
                                <div class="flex flex-nowrap gap-0.5 items-center">
                                    <div v-for="(tag, index) in contact.tags" :key="tag" class="mx-0.5">
                                        <span v-if="index < 3" class="bg-orange-300 text-white px-2 py-1 rounded-md text-sm">{{ tag }}</span>
                                        <span v-else-if="index === 3" class="bg-orange-300 text-white px-2 py-1 rounded-md text-sm">...</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </div>
</template>

