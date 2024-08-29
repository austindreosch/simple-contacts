<script setup>
import { db } from '@/assets/firebase';
import FullCheckmark from '@/assets/full-checkmark.svg';
import { user } from '@/composables/getUser';
import { addDoc, collection } from 'firebase/firestore';
import { reactive, ref } from 'vue';

const formData = reactive({
  userID: user.value.uid,
  firstName: '',
  lastName: '',
  email: '',
  note: '',
  phone: '',
  tags: '',
});

const submitForm = async () => {
  formData.tags = formData.tags.split(',').map(tag => tag.trim());
    console.log(formData);

  try {
    const docRef = await addDoc(collection(db, "contacts"), formData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

</script>

<template>
    <div class="max-w-xl mx-auto justify-center">
        <div class="flex justify-between items-end pt-12">
            <!-- <h1 class="text-left text-2xl">Add Individual Contact</h1> -->
            <!-- <p class="text-xs mb-1 font-bold">DELETE CONTACT</p> -->
        </div>
        <div class="bg-gray-50 w-full px-6 py-8 h-86 space-y-6 rounded-md h-70">
            <form @submit.prevent="submitForm" class="space-y-6">
                <!-- NAMES -->
                <div class="grid grid-cols-2 space-x-4">
                    <div class="col-span-1">
                        <p class="text-left mb-1 ml-2 text-xs">FIRST NAME</p>
                        <input type="text" v-model="formData.firstName" class="w-full border rounded-sm border-gray-500">
                    </div>
                    <div class="col-span-1">
                        <p class="text-left mb-1 ml-2 text-xs">LAST NAME</p>
                        <input type="text" v-model="formData.lastName" class="w-full border rounded-sm border-gray-500">
                    </div>
                </div>
                <!-- EMAIL -->
                <div>
                    <p class="text-left mb-1 ml-2 text-xs">EMAIL</p>
                    <input type="text" v-model="formData.email" class="max-w-full w-full border rounded-sm border-gray-500">
                </div>
                <!-- NOTE & PHONE -->
                <div class="grid grid-cols-10 space-x-4">
                    <div class="col-span-6">
                        <p class="text-left mb-1 ml-2 text-xs">NOTE</p>
                        <input type="text" v-model="formData.note" class="max-w-full w-full border rounded-sm border-gray-500">
                    </div>
                    <div class="col-span-4">
                        <p class="text-left mb-1 ml-2 text-xs">PHONE</p>
                        <input type="text" v-model="formData.phone" class="max-w-full border rounded-sm border-gray-500">
                    </div>
                </div>
                <!-- TAGS & SAVE -->
                <div class="grid grid-cols-4 space-x-4">
                    <div class="col-span-4">
                        <p class="text-left mb-1 ml-2 text-xs">TAGS</p>
                        <input type="text" v-model="formData.tags" class="max-w-full w-full h-16 border rounded-sm border-gray-500">
                    </div>
                </div>
                <div class="col-span-1 flex items-end">
                    <button type="submit" class="bg-green-600 hover:bg-blue-300 font-bold px-4 py-2 rounded-md w-full">
                        <FullCheckmark class="mx-auto text-white"/>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
