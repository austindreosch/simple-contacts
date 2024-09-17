<script setup>
import { db } from '@/assets/firebase';
import ContactBlock from '@/components/ContactBlock.vue';
import DetailBlock from '@/components/DetailBlock.vue';
import ListsBlock from '@/components/ListsBlock.vue';
import { user } from '@/composables/getUser'; // Ensure the path to getUser.js is correct
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onMounted, ref, watch } from 'vue';

const contacts = ref([]);
const highlightedContact = ref(null);
const userTagList = ref([]);
const lists = ref([]);
const selectedContacts = ref([]);

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
    loadLists();
}


function clearHighlightedContact() {
    highlightedContact.value = null;9
    refreshContacts();
}

watch(user, async (newUser) => {
  if (newUser) {
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
      userTagList.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Ensure that doc.data() includes 'tagName' and 'contacts' fields
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  } else {
    console.log('Cannot load tags. User is not authenticated');
  }
}

async function loadLists() {
    // console.log('CHECKING USER VALUE', user.value.uid);
    if (user.value) {
        const q = query(collection(db, 'lists'), where('userID', '==', user.value.uid));
        // console.log("USER ID LOADING LISTS" ,user.value.uid)
        try {
            const querySnapshot = await getDocs(q);
            // console.log(querySnapshot.size);
            const loadedLists = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                loadedLists.push({
                    id: doc.id,
                    listName: data.listName,
                    userID: data.userID,
                    contacts: data.contacts,
                    dateAdded: data.dateAdded.toDate().toLocaleString(),
                    lastUpdated: data.lastUpdated.toDate().toLocaleString()
                });
            });
            lists.value = loadedLists;
        } catch (error) {
            console.error('Failed to load lists:', error);
        }
    } 
}






onMounted(() => {
    refreshContacts();
});




</script>


<template>
  <div class="flex w-full max-w-screen-2xl mt-3">
      <div class="flex-grow overflow-y-auto mr-2">
          <ContactBlock :contacts="contacts" @contactHighlighted="handleContactHighlighted" :tags="userTagList" :lists="lists" @refreshContacts="refreshContacts"/>
      </div>
      <div class="max-w-sm ">
          <DetailBlock :highlightedContact="highlightedContact" @contactUpdated="refreshContacts" @contactDeleted="clearHighlightedContact" :tags="userTagList"/>
          <ListsBlock :lists="lists"  @refreshContacts="refreshContacts" />
      </div>
  </div>
</template>