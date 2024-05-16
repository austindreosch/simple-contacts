<script setup>
import { db } from '@/assets/firebase';
import FullCheckmark from '@/assets/full-checkmark.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
        <div class="rounded-lg  p-4  bg-gray-100">
            <form action="#" class="space-y-4">
                <!-- First / Last Name -->
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                        <label class="sr-only" for="firstName">First Name</label>
                        <input
                            class="w-full rounded-lg border-gray-300 p-3 text-xs"
                            v-model="selectedContact.firstName"
                            placeholder="First Name"
                            type="firstName"
                            id="firstName"
                        />
                    </div>
                    <div>
                        <label class="sr-only" for="lastName">Last Name</label>
                        <input
                            class="w-full rounded-lg border-gray-300 p-3 text-xs"
                            v-model="selectedContact.lastName"
                            placeholder="Last Name"
                            type="tel"
                            id="lastName"
                        />
                    </div>
                </div>
                
                <!-- EMail -->
                <div>
                    <label class="sr-only" for="email">Email</label>
                    <input
                    class="w-full rounded-lg border-gray-300 p-3 text-xs"
                    v-model="selectedContact.email"
                    placeholder="Email"
                    type="text"
                    id="email"
                    />
                </div>

                <!-- Note and Phone -->
                <div class="grid grid-cols-1 md:grid-cols-9 gap-4">
                    <div class="md:col-span-6">
                        <label class="sr-only" for="note">Note</label>
                        <input
                            class="w-full rounded-lg border-gray-300 p-3 text-xs"
                            v-model="selectedContact.note"
                            placeholder="Note"
                            type="text"
                            id="note"
                        />
                    </div>

                    <div class="md:col-span-3">
                        <label class="sr-only" for="phone">Phone</label>
                        <input
                            class="w-full rounded-lg border-gray-300 p-3 text-xs"
                            v-model="selectedContact.phone"
                            placeholder="Phone"
                            type="tel"
                            id="phone"
                        />
                    </div>
                </div>


                <!-- Tags -->
                <!-- <div>
                    <label class="sr-only" for="message">Tags</label>
                    <textarea
                    class="w-full rounded-lg border-gray-300 p-3 text-xs"
                    placeholder="Tags"
                    rows="8"
                    id="message"
                    ></textarea>
                </div> -->
                <div>
                    <div class="w-full rounded-lg border-gray-300 bg-white h-20 p-2">

                        <div class="col-span-3">
                            <div>
                                <div class="flex flex-wrap gap-2 items-center">
                                    <!-- Display existing tags -->
                                    <span v-for="tag in selectedContact.tags" :key="tag" class="bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                        {{ tag }}
                                    </span>

                                    <!-- Button to add a new tag -->
                                    <button class="text-orange-300">
                                        <font-awesome-icon :icon="['fas', 'square-plus']" class="text-orange-500" />
                                    </button>

                                </div>
                            </div>
                        </div>
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