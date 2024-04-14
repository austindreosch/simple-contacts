<template>
    <div class="grid grid-cols-12 space-x-4">
        <div class="col-span-8">
            <ContactBlock />
        </div>
        <div class="col-span-4">
            <DetailBlock />
            <ListsBlock />
        </div>
    </div>
</template>

<script setup>
import ContactBlock from '@/components/ContactBlock.vue';
import DetailBlock from '@/components/DetailBlock.vue';
import ListsBlock from '@/components/ListsBlock.vue';
</script>