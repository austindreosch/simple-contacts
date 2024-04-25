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
    <div class="">
        <div class="flex justify-between items-end" >
            <h1 class="text-left text-2xl">Contacts</h1>
            <p class="text-xs mb-1">Currently showing {{ filteredContacts.length || 'N/A' }} of {{ props.contacts.length }} total contacts.</p>
            <button class="text-xs mb-1 font-bold" >FILTER BY TAG</button>
        </div>
        <div class="bg-gray-100 px-6 py-4">
            <table class="">
                <thead>
                    <tr class="grid grid-cols-24 border border-gray-300">
                        <th class="col-span-2 text-left border-r pl-1 border-gray-300">First</th>
                        <th class="col-span-2 text-left border-r pl-1 border-gray-300">Last</th>
                        <th class="col-span-6 text-left border-r pl-1 border-gray-300">Email</th>
                        <th class="col-span-3 text-left border-r pl-1 border-gray-300">Phone</th>
                        <th class="col-span-5 text-left border-r pl-1 border-gray-300">Note</th>
                        <th class="col-span-6 text-left pl-1">Tags</th>
                    </tr>
                </thead>
                <tbody class="text-sm overflow-scroll">
                    <tr v-for="contact in filteredContacts" :key="contact.id"
                        @click="selectContact(contact)"
                        :class="{ 'bg-blue-100': contact.id === selectedContactId }" class="grid grid-cols-24 border-b border-gray-300 cursor-pointer">
                        <td class="col-span-2 text-left border-r px-1 border-gray-300">{{ contact.firstName }}</td>
                        <td class="col-span-2 text-left border-r px-1 border-gray-300">{{ contact.lastName }}</td>
                        <td class="col-span-6 text-left border-r px-1 border-gray-300">{{ contact.email }}</td>
                        <td class="col-span-3 text-left border-r px-1 border-gray-300">{{ contact.phone }}</td>
                        <td class="col-span-5 text-left border-r px-1 border-gray-300">{{ contact.note }}</td>
                        <td class="col-span-6 text-left pl-1">
                            <div class="flex flex-wrap py-0.5">
                                <template v-for="(tag, index) in contact.tags" :key="tag">
                                    <span v-if="index < 3" class="bg-orange-300 text-white px-1 py-0.5 rounded-md mr-1 mb-0.5">{{ tag }}</span>
                                    <span v-else-if="index === 3" class="bg-orange-300 text-white px-1 py-0.5 rounded-md mr-1">...</span>
                                </template>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

