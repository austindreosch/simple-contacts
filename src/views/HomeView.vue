<template>
    <div class="grid grid-cols-12 space-x-4 w-full">
        <div class="col-span-8">
            <ContactBlock :contacts="contacts" @contactSelected="handleContactSelected"/>
        </div>
        <div class="col-span-4">
            <DetailBlock :selectedContact="selectedContact" @contactUpdated="refreshContacts"/>
            <ListsBlock />
        </div>
    </div>
</template>

<script setup>
import { db } from '@/assets/firebase';
import ContactBlock from '@/components/ContactBlock.vue';
import DetailBlock from '@/components/DetailBlock.vue';
import ListsBlock from '@/components/ListsBlock.vue';
import { collection, getDocs, query } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

const contacts = ref([]);
const selectedContact = ref(null);

function handleContactSelected(contact) {
    selectedContact.value = contact;
}



/* -----------------------------------------------------------
  USER CONTACTS MANAGED IN PARENT COMPONENT
----------------------------------------------------------- */
async function loadContacts() {
    const q = query(collection(db, 'contacts'));
    const querySnapshot = await getDocs(q);
    contacts.value = querySnapshot.docs.map(doc => {
        return {
            id: doc.id, 
            ...doc.data()
        };
    });
}

function refreshContacts() {
    console.log('refreshing contacts', contacts.value);
    loadContacts();
}

onMounted(async () => {
    await loadContacts();
});

</script>