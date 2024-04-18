<script setup>
import dummyData from '@/assets/dummydata.json';
import { db } from '@/assets/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue';

const props = defineProps({
  filterTag: String
});

const contacts = ref([]);
const loading = ref(true);
const selectedContactId = ref(null);

onMounted(async () => {
    loading.value = true;
    const q = query(collection(db, 'contacts'));
    const querySnapshot = await getDocs(q);
    contacts.value = querySnapshot.docs.map(doc => {
        return {
            id: doc.id, 
            ...doc.data()
        };
    });
    loading.value = false;
});

const filteredContacts = computed(() => {
  // If a filter tag is passed, filter the contacts, otherwise show all
  return props.filterTag ? contacts.value.filter(contact => contact.tags.includes(props.filterTag)) : contacts.value;
});


const emit = defineEmits(['contactSelected']);

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
    <div class="flex justify-between items-end" v-if="!loading">
        <h1 class="text-left text-2xl">Contacts</h1>
        <p class="text-xs mb-1">Currently showing {{ filteredContacts.length || 'N/A' }} of {{ contacts.length }} total contacts.</p>
        <p class="text-xs mb-1 font-bold">FILTER BY TAG</p>
    </div>
    <div class="bg-gray-100 w-full px-6 py-4">
        <table class="w-full table-fixed">
            <thead>
                <tr class="grid grid-cols-20 border border-gray-300">
                    <th class="col-span-2 text-left border-r pl-1 border-gray-300">First</th>
                    <th class="col-span-2 text-left border-r pl-1 border-gray-300">Last</th>
                    <th class="col-span-6 text-left border-r pl-1 border-gray-300">Email</th>
                    <th class="col-span-4 text-left border-r pl-1 border-gray-300">Note</th>
                    <th class="col-span-6 text-left pl-1">Tags</th>
                </tr>
            </thead>
            <tbody class="text-sm">
                <tr v-for="contact in filteredContacts" :key="contact.id"
                    @click="selectContact(contact)"
                    :class="{ 'bg-blue-100': contact.id === selectedContactId }" class="grid grid-cols-20 border-b border-gray-300 cursor-pointer">
                    <td class="col-span-2 text-left border-r px-1 border-gray-300">{{ contact.firstName }}</td>
                    <td class="col-span-2 text-left border-r px-1 border-gray-300">{{ contact.lastName }}</td>
                    <td class="col-span-6 text-left border-r px-1 border-gray-300">{{ contact.email }}</td>
                    <td class="col-span-4 text-left border-r px-1 border-gray-300">{{ contact.note }}</td>
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
</template>

