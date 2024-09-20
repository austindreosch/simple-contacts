<!-- ADD TAG BUTTON WITH DROPDOWN MENU - FOR DETAIL BLOCK -->

<script setup>
import { db } from '@/assets/firebase';
import { doc, updateDoc } from "firebase/firestore";
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps({ selectedContact: Object });
const emit = defineEmits(['contactSelected']);

let selectedContact = computed(() => props.selectedContact);

const addTag = async (newTag) => {
    const contactRef = doc(db, 'contacts', selectedContact.value.id);
    await updateDoc(contactRef, {
        tags: [...selectedContact.value.tags, newTag]
    });
    emit('contactUpdated'); //or however you do this from grandchild to parent
};

// const loadUsedTags = () => {
//     const contactRef = doc(db, 'contacts', selectedContact.value.id);
//     const contactData = await getDoc(docRef);
//     return contactData.exists() ? contactData.data().tags : [];
// };


const loadUsedTags = async () => {
    try {
        const q = query(collection(db, 'contacts'));
        const querySnapshot = await getDocs(q);
        let allTags = [];

        querySnapshot.forEach((doc) => {
            const tags = doc.data().tags;
            allTags = allTags.concat(tags);
        });
        const uniqueTags = [...new Set(allTags)];
        emit('contactUpdated');
        return uniqueTags;
    } catch (error) {
        console.error('Error loading used tags:', error);
        return [];
    }
};



</script>



<template>
    <div>
        <div>
            <button @click="addTag('inputTag')">Add Tag</button>
        </div>
    </div>
</template>