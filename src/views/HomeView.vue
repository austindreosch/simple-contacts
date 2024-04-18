<template>
    <div class="grid grid-cols-12 space-x-4 w-full">
        <div class="col-span-8">
            <ContactBlock @contactSelected="handleContactSelected"/>
        </div>
        <div class="col-span-4">
            <DetailBlock :selectedContact="selectedContact"/>
            <ListsBlock />
        </div>
    </div>
</template>

<script setup>
import ContactBlock from '@/components/ContactBlock.vue';
import DetailBlock from '@/components/DetailBlock.vue';
import ListsBlock from '@/components/ListsBlock.vue';
import { ref } from 'vue';
const selectedContact = ref(null);

function handleContactSelected(contact) {
    selectedContact.value = contact;
    // console.log('Selected:', contact.email, contact);
}
</script>