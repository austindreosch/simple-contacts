<script setup>
import { db } from '@/assets/firebase';
import ContactBlock from '@/components/ContactBlock.vue';
import DetailBlock from '@/components/DetailBlock.vue';
import ListsBlock from '@/components/ListsBlock.vue';
import { user } from '@/composables/getUser'; // Ensure the path to getUser.js is correct
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const contacts = ref([]);
const highlightedContact = ref(null);
const userTagList = ref([]);
const lists = ref([]);
const selectedContacts = ref([]);

/* -----------------------------------------------------------
LOAD USER CONTACTS (SENT TO CHILDREN COMPONENTS)
----------------------------------------------------------- */
let contactsUnsubscribe;
let refreshTimeout;

async function loadContacts() {
  // Unsubscribe from existing listener if it exists
  if (contactsUnsubscribe) {
    contactsUnsubscribe();
    contactsUnsubscribe = null; // Reset the unsubscribe function
  }

  if (user.value) {
    const q = query(collection(db, 'contacts'), where('userId', '==', user.value.uid));
    contactsUnsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('DB Read: Contacts data received. Number of documents:', querySnapshot.size);
      contacts.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  }
}

//executes when contact clicked in listblock
function handleContactHighlightedInListView(contact) {
  highlightedContact.value = contact;
}

//executes when contact clicked in detailblock
function handleContactHighlighted(contact) {
    highlightedContact.value = contact;
}

function refreshContacts() {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    loadContacts();
    loadTags();
    loadLists();
  }, 300); // Adjust the delay as needed
}

const addTagToContact = (newTag) => {
  // Check if the tag exists in the tags array
  const tagIndex = tags.value.findIndex((tag) => tag.id === newTag.id);
  
  if (tagIndex !== -1) {
    // If the contact ID is not already in the contacts array, add it
    if (!tags.value[tagIndex].contacts.includes(highlightedContact.value.id)) {
      tags.value[tagIndex].contacts.push(highlightedContact.value.id);
    }
  } else {
    // If the tag doesn't exist, add it to the tags array
    tags.value.push({
      ...newTag,
      contacts: [highlightedContact.value.id]
    });
  }
};

function clearHighlightedContact() {
    highlightedContact.value = null;
    console.log('resetting highlighted contact, refreshing contacts');
    
    refreshContacts();
}

watch(user, async (newUser) => {
  if (newUser) {
    console.log('User authenticated:', newUser);    
    await loadContacts();
    await loadTags();
    await loadLists();
  }
});




/* -----------------------------------------------------------
  LOAD USER TAGS & LISTS (SENT TO CHILDREN COMPONENTS)
----------------------------------------------------------- */
async function loadTags() {
  if (user.value) {
    try {
      const q = query(collection(db, 'tags'), where('userId', '==', user.value.uid));
      const querySnapshot = await getDocs(q);
      console.log('DB Read: Tags data fetched. Number of documents:', querySnapshot.size);
      userTagList.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  } else {
    console.log('Cannot load tags. User is not authenticated');
  }
}


async function loadLists() {
  if (user.value) {
    const q = query(collection(db, 'lists'), where('userID', '==', user.value.uid));
    try {
      const querySnapshot = await getDocs(q);
      console.log('DB Read: Lists data fetched. Number of documents:', querySnapshot.size);
      const loadedLists = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        dateAdded: doc.data().dateAdded.toDate().toLocaleString(),
        lastUpdated: doc.data().lastUpdated.toDate().toLocaleString()
      }));
      lists.value = loadedLists;
    } catch (error) {
      console.error('Failed to load lists:', error);
    }
  }
}



onUnmounted(() => {
  if (contactsUnsubscribe) {
    contactsUnsubscribe();
  }
});




</script>


<template>
  <div class="flex w-full max-w-screen-2xl mt-3 ">
      <div class="flex-grow overflow-y-auto mr-2">
          <ContactBlock :contacts="contacts" @contactHighlighted="handleContactHighlighted" :highlightedContact="highlightedContact" :tags="userTagList" :lists="lists" @refreshContacts="refreshContacts"/>
      </div>
      <div class="max-w-xs ">
          <DetailBlock :highlightedContact="highlightedContact" @contactUpdated="refreshContacts" @contactDeleted="clearHighlightedContact" @tagAddedToContact="addTagToContact" :lists="lists" :tags="userTagList"/>
          <ListsBlock :lists="lists" :contacts="contacts" @refreshContacts="refreshContacts" @contactSelected="handleContactHighlightedInListView" :highlightedContact="highlightedContact"/>
      </div>
  </div>
</template>