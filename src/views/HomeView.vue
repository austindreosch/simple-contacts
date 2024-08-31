<script setup>
import { db } from '@/assets/firebase';
import ContactBlock from '@/components/ContactBlock.vue';
import DetailBlock from '@/components/DetailBlock.vue';
import ListsBlock from '@/components/ListsBlock.vue';
import { user } from '@/composables/getUser'; // Ensure the path to getUser.js is correct
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, watch } from 'vue';

const contacts = ref([]);
const highlightedContact = ref(null);
const userTagList = ref([]);

/* -----------------------------------------------------------
LOAD USER CONTACTS (SENT TO CHILDREN COMPONENTS)
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
    console.log('Cannot load contacts. User is not authenticated');
  }
}

function handleContactHighlighted(contact) {
    highlightedContact.value = contact;
}

function refreshContacts() {
    console.log('refreshing contacts', contacts);
    loadContacts();
    loadTags();
}


function clearHighlightedContact() {
    highlightedContact.value = null;
    refreshContacts();
}

watch(user, async (newUser) => {
  if (newUser) {
    await loadContacts();
    await loadTags();
  }
});


/* -----------------------------------------------------------
  LOAD USER TAGS (SENT TO CHILDREN COMPONENTS)
----------------------------------------------------------- */
async function loadTags() {
  if (user.value) {
    try {
      const q = query(collection(db, 'tags'), where('userId', '==', user.value.uid));
      const querySnapshot = await getDocs(q);
      userTagList.value = querySnapshot.docs.map(doc => doc.data().tagName);
      
      console.log('Tags loaded:', userTagList.value);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  } else {
    console.log('Cannot load tags. User is not authenticated');
  }
}



</script>


<template>
  <div class="flex w-full max-w-screen-2xl h-screen mt-3">
      <div class="flex-grow overflow-y-auto mr-2">
          <ContactBlock :contacts="contacts" @contactHighlighted="handleContactHighlighted"/>
      </div>
      <div class="max-w-sm ">
          <DetailBlock :highlightedContact="highlightedContact" @contactUpdated="refreshContacts" @contactDeleted="clearHighlightedContact"/>
          <ListsBlock />
      </div>
  </div>
</template>