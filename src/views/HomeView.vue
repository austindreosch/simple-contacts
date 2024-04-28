<script setup>
import { db } from '@/assets/firebase';
import ContactBlock from '@/components/ContactBlock.vue';
import DetailBlock from '@/components/DetailBlock.vue';
import ListsBlock from '@/components/ListsBlock.vue';
import { collection, getDocs, query } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

const contacts = ref([]);
const selectedContact = ref(null);


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
    })
}

function handleContactSelected(contact) {
    selectedContact.value = contact;
}

function refreshContacts() {
    console.log('refreshing contacts', contacts);
    loadContacts();
}

onMounted(async () => {
    await loadContacts();
});

</script>


<template>
    <div class="flex space-x-4 w-full">
        <div class="">
            <ContactBlock :contacts="contacts" @contactSelected="handleContactSelected"/>
        </div>
        <div class="max-w-sm min-w-[320px]">
            <DetailBlock :selectedContact="selectedContact" @contactUpdated="refreshContacts"/>
            <ListsBlock />
        </div>
    </div>
</template>