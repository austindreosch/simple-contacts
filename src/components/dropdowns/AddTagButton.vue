<script setup>
import { db } from '@/assets/firebase';
import PlusBoxIcon from '@/assets/plusbox-icon.svg';
import { user } from '@/composables/getUser';
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { computed, defineEmits, defineProps, onUnmounted, ref } from 'vue';

const props = defineProps({
  tags: Array,
  highlightedContact: Object
});

const emit = defineEmits(['addedTag']);

const searchTerm = ref('');
const isOpen = ref(false);
const newTagName = ref('');
const localContact = ref({ ...props.highlightedContact });

// Toggles the dropdown visibility
const toggleDropdown = () => {
isOpen.value = !isOpen.value;
};

// Filters tags based on search term
const filteredTags = computed(() => {
  if (!searchTerm.value.trim()) {
    return props.tags;
  }
  return props.tags.filter(tag => tag.tagName.toLowerCase().includes(searchTerm.value.toLowerCase()));
});



const addExistingTagToContact = async (tag) => {
  try {
    if (!tag || !tag.id) {
      console.error('Invalid tag:', tag);
      return;
    }
    const tagRef = doc(db, 'tags', tag.id);

    await updateDoc(tagRef, {
      contacts: arrayUnion(props.highlightedContact.id)
    });

    const updatedTag = {
      id: tag.id,
      tagName: tag.tagName,
      contacts: tag.contacts ? [...tag.contacts, props.highlightedContact.id] : [props.highlightedContact.id],
      dateAdded: tag.dateAdded || null, // If dateAdded isn't present, use null
      lastUpdated: new Date(), // Placeholder for Firestore timestamp
      userEmail: tag.userEmail || user.value.email,
      userId: tag.userId || user.value.uid
    };

    addTagToLocalContact(updatedTag);
    emit('addedTag', updatedTag);
    toggleDropdown();

  } catch (error) {
    console.error('Error adding tag to contact in tag document:', error);
  }
};











// Adds a new tag to the list and updates Firestore
const addNewTag = async () => {
  const tag = newTagName.value.trim();
  console.log('Adding new tag:', tag); // Check if the function is called and the tag is not empty
  console.log(user.value.email);
  
  if (tag && !props.tags.find(t => t.tagName === tag)) {
    try {
      // Add the new tag to Firestore
      const tagRef = await addDoc(collection(db, 'tags'), {
        tagName: tag,
        contacts: [props.highlightedContact.id], // Include the current contact's ID
        dateAdded: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        userEmail: user.value.email,
        userId: user.value.uid
      });

      // Create the new tag object
      const newTag = {
        id: tagRef.id,
        tagName: tag,
        contacts: [props.highlightedContact.id],
        dateAdded: new Date(), // Placeholder for the Firestore timestamp
        lastUpdated: new Date(), // Placeholder for the Firestore timestamp
        userEmail: user.value.email,
        userId: user.value.uid
      };

      // console.log('emitting addedTag event with:', newTag);
      emit('addedTag', newTag);


      // Clear the input and close the dropdown
      newTagName.value = '';
      searchTerm.value = '';
      isOpen.value = false;

    } catch (error) {
      console.error('Error adding tag to Firestore:', error);
    }
  } else {
    console.log('Tag already exists or is empty.'); // If tag already exists or is empty
  }
};


const addTagToLocalContact = (tag) => {
  if (!localContact.tags) {
    localContact.tags = [];
  }
  if (!localContact.tags.includes(tag.id)) {
    localContact.tags.push(tag.id);
  }
  // console.log('Updated localContact tags:', localContact.tags);
};


// Click outside to close the dropdown
const handleClickOutside = (event) => {
if (!event.target.closest('.relative')) {
    isOpen.value = false;
    searchTerm.value = '';
}
};

document.addEventListener('click', handleClickOutside);

onUnmounted(() => {
document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="relative">
    <!-- Button with "+" icon to toggle dropdown -->
    <button type="button" v-if="localContact.id" class="pt-0.5" @click="toggleDropdown">
      <PlusBoxIcon class="text-my-teal" />
    </button>

    <!-- Dropdown with filtered tags -->
    <div 
      v-if="isOpen" 
      class="absolute right-0 z-[9999] mt-1 w-[17rem] divide-y divide-gray-100 rounded-md border border-gray-300 bg-white shadow-lg p-2" 
      role="menu"
      style="overflow: visible;"
    >
      <!-- Search bar to filter tags -->
      <div class="mb-2 flex items-center justify-between">
        <input 
          v-model="searchTerm" 
          type="text" 
          class="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300" 
          placeholder="Search tags..."
        >
      </div>

      <!-- Tags List as buttons -->
      <div class="max-h-40 overflow-y-auto">
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="tag in filteredTags" 
            :key="tag.id" 
            @click="addExistingTagToContact(tag)" 
            class="cursor-pointer"
          >
            <button type="button"
              class="flex items-center space-x-1 px-2 py-1 rounded bg-my-teal text-white text-sm hover:bg-teal-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4">
                <!-- White circle background -->
                <circle cx="12" cy="12" r="9" fill="white" />
                <!-- Plus sign with my-teal color -->
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m-4-4h8" stroke="currentColor" stroke-width="1.5" class="text-my-teal" />
              </svg>

              <span>{{ tag.tagName }}</span>
            </button>
          </div>
        </div>
      </div>


      <!-- Add New Tag Section -->
      <div class="mt-2 pt-2 border-t border-gray-200">
  <div class="flex items-center space-x-2">
    <input 
      v-model="newTagName" 
      type="text" 
      class="w-3/4 rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300" 
      placeholder="Add new tag..."
    >
    <button 
      type="button" 
      @click="addNewTag" 
      class="w-1/4 px-3 py-1.5 bg-my-teal text-white text-sm font-medium rounded-md hover:bg-teal-600"
    >
      Add
    </button>
  </div>
</div>






    </div>
  </div>
</template>


    


  