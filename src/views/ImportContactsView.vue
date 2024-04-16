<template>
    <div class="grid grid-cols-3 space-x-4 max-w-screen-md">
        <div class="col-span-2"><AddContactForm /></div>
        <div class="col-span-1"><ImportContactsForm /></div>
    </div>
</template>

<script setup>
import AddContactForm from '@/components/AddContactForm.vue';
import ImportContactsForm from '@/components/ImportContactsForm.vue';

</script>