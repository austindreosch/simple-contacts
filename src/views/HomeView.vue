<script setup>
import { db } from '@/assets/firebase';
import ContactBlock from '@/components/ContactBlock.vue';
import DetailBlock from '@/components/DetailBlock.vue';
import ListsBlock from '@/components/ListsBlock.vue';
import { user } from '@/composables/getUser'; // Ensure the path to getUser.js is correct
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, watch } from 'vue';

const contacts = ref([]);
const selectedContact = ref(null);

/* -----------------------------------------------------------
USER CONTACTS MANAGED IN PARENT COMPONENT
----------------------------------------------------------- */
async function loadContacts() {
  if (user.value) {
    const q = query(collection(db, 'contacts'), where('userId', '==', user.value.uid));
    const querySnapshot = await getDocs(q);
    contacts.value = querySnapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
  } else {
    console.log('User is not authenticated');
  }
}

function handleContactSelected(contact) {
    selectedContact.value = contact;
}

function refreshContacts() {
    console.log('refreshing contacts', contacts);
    loadContacts();
}

watch(user, async (newUser) => {
  if (newUser) {
    await loadContacts();
  }
});

</script>


<template>
  <div class="flex w-full max-w-screen-2xl h-screen mt-3">
      <div class="flex-grow overflow-y-auto mr-2">
          <ContactBlock :contacts="contacts" @contactSelected="handleContactSelected"/>
      </div>
      <div class="max-w-sm overflow-y-auto">
          <DetailBlock :selectedContact="selectedContact" @contactUpdated="refreshContacts"/>
          <ListsBlock />
      </div>
  </div>
</template>