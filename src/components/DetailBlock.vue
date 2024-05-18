<script setup>
import { db } from '@/assets/firebase';
import PlusBoxIcon from '@/assets/plusbox-icon.svg';

import { deleteDoc, doc } from "firebase/firestore";
import { computed, defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ selectedContact: Object});
const emit = defineEmits(['contactUpdated']);

let selectedContact = computed(() => props.selectedContact || {
  firstName: null,
  lastName: null,
  email: null,
  note: null,
  phone: null,
  tags: []
});

const deleteContact = async () => {
    const contactRef = doc(db, 'contacts', selectedContact.value.id);
    await deleteDoc(contactRef);
    emit('contactUpdated');
};
</script>

<template>
    <!-- Details -->
    <div class="flex justify-between items-end mb-2">
        <h1 class="text-left text-2xl">Details</h1>
        <button class="text-xs mb-1 font-bold" @click="deleteContact">DELETE CONTACT</button>
    </div>


    <!-- NEW STUFF -->
    <div class="mx-auto max-w-screen-xl ">
        <div class="rounded-lg  p-4  bg-white border border-gray-300 shadow-md">
            <form action="#" class="space-y-4 mt-2">


                <!-- First / Last Name -->
                <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    <!-- <div>
                        <label class="sr-only" for="firstName">First Name</label>
                        <input
                            class="w-full rounded-lg border-gray-300 p-3 text-xs"
                            v-model="selectedContact.firstName"
                            placeholder="First Name"
                            type="firstName"
                            id="firstName"
                        />
                    </div> -->

                    <label
                        for="firstName"
                        class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                        type="text"
                        id="firstName"
                        class="w-full rounded-lg border-gray-300 p-2 my-0.5 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="First Name"
                        v-model="selectedContact.firstName"
                        />
                    
                        <span
                        class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                        First Name
                        </span>
                    </label>


                    <!--  -->

                    <!-- <div>
                        <label class="sr-only" for="lastName">Last Name</label>
                        <input
                            class="w-full rounded-lg border-gray-300 p-3 text-xs"
                            v-model="selectedContact.lastName"
                            placeholder="Last Name"
                            type="tel"
                            id="lastName"
                        />
                    </div> -->


                    <label
                            for="lastName"
                            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                            type="text"
                            id="lastName"
                            class="w-full rounded-lg border-gray-300 p-2 my-0.5 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                            placeholder="Last Name"
                            v-model="selectedContact.lastName"
                            />
                        
                            <span
                            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                            Last Name
                            </span>
                        </label>



                </div>
                

                <!-- EMail -->
                <div>
                    <!-- <label class="sr-only" for="email">Email</label>
                    <input
                    class="w-full rounded-lg border-gray-300 p-3 text-xs"
                    v-model="selectedContact.email"
                    placeholder="Email"
                    type="text"
                    id="email"
                    /> -->


                    <label
                            for="email"
                            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                            type="text"
                            id="email"
                            class="w-full rounded-lg border-gray-300 p-2 my-0.5 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                            placeholder="Email"
                            v-model="selectedContact.email"
                            />
                        
                            <span
                            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                            Email
                            </span>
                        </label>

                </div>


                <!-- Note and Phone -->
                <div class="grid grid-cols-1 md:grid-cols-10 gap-2">
                    <div class="md:col-span-6">
                        <!-- <label class="sr-only" for="note">Note</label>
                        <input
                            class="w-full rounded-lg border-gray-300 p-3 text-xs"
                            v-model="selectedContact.note"
                            placeholder="Note"
                            type="text"
                            id="note"
                        /> -->

                        <label
                            for="note"
                            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                            type="text"
                            id="note"
                            class="w-full rounded-lg border-gray-300 p-2 my-0.5 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                            placeholder="Note"
                            v-model="selectedContact.note"
                            />
                        
                            <span
                            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                            Note
                            </span>
                        </label>
                    </div>

                    <div class="md:col-span-4">
                        <!-- <label class="sr-only" for="phone">Phone</label>
                        <input
                            class="w-full rounded-lg border-gray-300 p-3 text-xs"
                            v-model="selectedContact.phone"
                            placeholder="Phone"
                            type="tel"
                            id="phone"
                        /> -->


                        <label
                        for="phone"
                        class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                        type="text"
                        id="phone"
                        class="w-full rounded-lg border-gray-300 p-2 my-0.5 text-sm peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Phone"
                        v-model="selectedContact.phone"
                        />
                    
                        <span
                        class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                        Phone
                        </span>
                    </label>

                    </div>
                </div>


                <!-- Tags -->
                
                <div class="relative block rounded-md border border-gray-200 shadow-sm p-2">
                    <!-- Edge-positioned label for tags -->
                    <label
                        class="absolute text-xs text-gray-700 bg-white px-1 -top-2.5 left-2.5 transform translate-y-0"
                    >
                        Tags
                    </label>
                    <!-- Container for displaying tags and adding new ones -->
                    <div class="flex flex-wrap items-start gap-2 pt-1">
                        <!-- Existing tags displayed as spans -->
                        <span v-for="tag in selectedContact.tags" :key="tag" class="bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                            {{ tag }}
                        </span>
                        <!-- Placeholder button to simulate adding new tags -->
                        <button class="text-orange-300 pt-0.5" @click="openTagInput">
                            <PlusBoxIcon class="text-orange-500" />
                        </button>
                    </div>
                </div>



                

                <!-- Button, Details -->
                <div class="flex items-center justify-between">
                    <div class="text-2xs text-left ml-2 text-gray-400">
                        <p class="">Last Updated:</p>
                        <p class="">{{ contact && contact.lastUpdated ? contact.lastUpdated : '9:36AM 9/23/2024' }}</p>
                    </div>
                    <button
                    type="submit"
                    class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                    >
                    Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>

</template>