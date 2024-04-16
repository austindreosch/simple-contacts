<script setup>
import dummyData from '@/assets/dummydata.json';
import { db } from '@/assets/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

const contacts = ref([])
const loading = ref(true);

onMounted(async () => {
  const q = query(collection(db, "contacts"), where("userID", "==", "user1"));
  const querySnapshot = await getDocs(q);
  contacts.value = querySnapshot.docs.map(doc => doc.data());
  console.log(contacts.value);
  console.log(contacts.value[0].email);
  loading.value = false;
});


</script>

<template>
    <div class="flex justify-between items-end" v-if="!loading">
        <h1 class="text-left text-2xl">Contacts</h1>
        <!-- NEED TO INPUT FILTERED LIST TOTAL IN FIRST VARIABLE -->
        <p class="text-xs mb-1">Currently showing {{contacts.value.length || 'N/A'}} of {{dummyData.length}} total contacts.</p>
        <p class="text-xs mb-1 font-bold">FILTER BY TAG</p>
    </div>
    <div class="bg-gray-100 w-full px-6 py-4">
        <table class="w-full table-fixed ">
            <thead>
                <tr class="grid grid-cols-20 border border-gray-300">
                    <th class="col-span-2 text-left border-r pl-1 border-gray-300">First</th>
                    <th class="col-span-2 text-left border-r pl-1 border-gray-300">Last</th>
                    <th class="col-span-6 text-left border-r pl-1 border-gray-300">Email</th>
                    <th class="col-span-4 text-left border-r pl-1 border-gray-300">Note</th>
                    <th class="col-span-6 text-left pl-1">Tags</th>
                    <!-- <th class="col-span-1 text-left border-r border-gray-300">Phone</th> -->
                </tr>
            </thead>
            <tbody class="text-sm">
                <!-- IMPORT CONTACT LIST FROM DATA BASE HERE -->
                <tr v-for="contact in dummyData" :key="contact.id" class="grid grid-cols-20 border-b border-gray-300">
                    <td class="col-span-2 text-left border-r px-1 border-gray-300">{{ contact.name.split(' ')[0] }}</td>
                    <td class="col-span-2 text-left border-r px-1 border-gray-300">{{ contact.name.split(' ')[1] }}</td>
                    <td class="col-span-6 text-left border-r px-1 border-gray-300">{{ contact.email }}</td>
                    <td class="col-span-4 text-left border-r px-1 border-gray-300">{{ contact.note }}</td>
                    <td class="col-span-6 text-left pl-1">
                        <div class="flex flex-wrap py-0.5 space-y-0.5">
                            <template v-for="(tag, index) in contact.tags.split(',')" :key="tag">
                                <span v-if="index < 3" class="bg-orange-400 text-white px-1 py-0.6 rounded-full mr-1">{{ tag }}</span>
                                <span v-else-if="index === 3" class="bg-orange-400 text-white px-1 py-0.6 rounded-full mr-1">...</span>
                            </template>
                        </div>
                    </td>
                    <!-- <td class="col-span-1 text-left border-r border-gray-300">{{ contact.phone }}</td> -->
                </tr>
            </tbody>                        
        </table>
    </div>
    <div v-else>Loading...</div>
    
</template>