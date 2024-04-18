<script setup>
import FullCheckmark from '@/assets/full-checkmark.svg';
import { computed, defineProps, ref } from 'vue';

const props = defineProps({
  selectedContact: Object
});

let selectedContact = computed(() => props.selectedContact || {
  firstName: null,
  lastName: null,
  email: null,
  note: null,
  phone: null,
  tags: []
});

</script>

<template>
    <div class="flex justify-between items-end">
        <h1 class="text-left text-2xl">Details</h1>
        <p class="text-xs mb-1 font-bold">DELETE CONTACT</p>
    </div>
    <div class="bg-gray-200 w-full px-6 py-4 h-86 justify-center space-y-2">
        <!-- NAMES -->
        <div class="grid grid-cols-2 space-x-4 ">
            <div class="col-span-1">
                <p class="text-left mb-1 ml-2 text-xs">FIRST NAME</p>
                <input type="text" class="w-full" v-model="selectedContact.firstName">
            </div>
            <div class="col-span-1">
                <p class="text-left mb-1 ml-2 text-xs">LAST NAME</p>
                <input type="text" class="w-full pl-0 pr-0" v-model="selectedContact.lastName">
            </div>
        </div>
        <!-- EMAIL -->
        <div>
            <p class="text-left mb-1 ml-2 text-xs">EMAIL</p>
            <input type="text" class="max-w-full w-full" v-model="selectedContact.email">
        </div>
        <!-- NOTE & PHONE -->
        <div class="grid grid-cols-10 space-x-4 ">
            <div class="col-span-6">
                <p class="text-left mb-1 ml-2 text-xs">NOTE</p>
                <input type="text" class="max-w-full w-full" v-model="selectedContact.note">
            </div>
            <div class="col-span-4">
                <p class="text-left mb-1 ml-2 text-xs">PHONE</p>
                <input type="phone" class="max-w-full  pl-0 pr-0" v-model="selectedContact.phone">
            </div>
        </div>
        <!-- TAGS & SAVE -->
        <div class="grid grid-cols-4 space-x-2">
            <div class="col-span-3">
                <p class="text-left mb-1 ml-2 text-xs">TAGS</p>
                <div>
                    <div class="flex flex-wrap gap-2 items-center">
                        <!-- Display existing tags -->
                        <span v-for="tag in selectedContact.tags" :key="tag" class="bg-gray-300 px-2 py-1 rounded-full text-sm">
                            {{ tag }}
                        </span>

                        <!-- Button to add a new tag -->
                        <!-- <button @click="showAddTag = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            +
                        </button> -->

                        <!-- Pop-up text box to add a new tag -->
                        <!-- <div v-if="showAddTag" class="absolute bg-white p-3 border rounded shadow-lg mt-2">
                            <input v-model="newTag" placeholder="Add tag" class="p-1 border rounded" @keyup.enter="addTag" />
                            <button @click="addTag" class="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                                Add
                            </button>
                            <button @click="showAddTag = false" class="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                Cancel
                            </button>
                        </div> -->

                    </div>
                </div>

            </div>
            <div class="col-span-1">
                <p class="text-left mb-1 ml-1.5 text-xs">SAVE</p>
                <button class="bg-blue-500 hover:bg-blue-300 font-bold px-4 rounded h-2/4 w-full">
                    <FullCheckmark class="mx-auto text-white" />
                </button>
            </div>
        </div>
    </div>
</template>