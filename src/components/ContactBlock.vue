<script setup>
import dummyData from '@/assets/dummydata.json';
</script>

<template>
    <h1 class="text-left text-2xl">Contacts</h1>
    <div class="bg-gray-100 w-full px-6 py-4">
        <table class="w-full table-fixed">
            <thead>
                <tr class="grid grid-cols-20">
                    <th class="col-span-2 text-left">First</th>
                    <th class="col-span-2 text-left">Last</th>
                    <th class="col-span-6 text-left">Email</th>
                    <!-- <th class="col-span-1 text-left">Phone</th> -->
                    <th class="col-span-4 text-left">Note</th>
                    <th class="col-span-6 text-left">Tags</th>
                </tr>
            </thead>
            <tbody class="text-sm">
                <tr v-for="contact in dummyData" :key="contact.id" class="grid grid-cols-20">
                    <td class="col-span-2 text-left">{{ contact.name.split(' ')[0] }}</td>
                    <td class="col-span-2 text-left">{{ contact.name.split(' ')[1] }}</td>
                    <td class="col-span-6 text-left">{{ contact.email }}</td>
                    <!-- <td class="col-span-1 text-left">{{ contact.phone }}</td> -->
                    <td class="col-span-4 text-left">{{ contact.note }}</td>
                    <td class="col-span-6 text-left">{{ contact.tags }}</td>
                </tr>
            </tbody>                        
        </table>
    </div>
</template>