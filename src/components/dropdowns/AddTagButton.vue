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

// const tags = ref(['Marketing', 'Development', 'Design', 'Support', 'Management']); // Example tags
const selectedTags = ref([]);
const searchTerm = ref('');
const isOpen = ref(false);
const newTagName = ref('');
const localContact = ref({ id: 1 }); // Example, replace with actual contact data

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

// // Toggles tag selection
// const toggleTagSelection = (tag) => {
// if (selectedTags.value.includes(tag)) {
//     selectedTags.value = selectedTags.value.filter(t => t !== tag);
// } else {
//     selectedTags.value.push(tag);
// }
// };


const addTagToContact = async (tag) => {
  try {
    // Reference to the tag document in the tags collection
    const tagRef = doc(db, 'tags', tag.id);

    // Update the contacts array in the tag document using arrayUnion to add the contact ID
    await updateDoc(tagRef, {
      contacts: arrayUnion(props.highlightedContact.id) // Add the contact's ID to the tag's contacts array
    });

    console.log(`Tag ${tag.tagName} added to contact ${props.highlightedContact.firstName} in tag document.`);
    
    // Optionally update the local state of tags in the contact (if contact document has a tags array)
    if (!props.highlightedContact.tags) {
      props.highlightedContact.tags = [];
    }
    props.highlightedContact.tags.push(tag.id);

  } catch (error) {
    console.error('Error adding tag to contact in tag document:', error);
  }
};


// Adds a new tag to the list and updates Firestore
const addNewTag = async () => {
  const tag = newTagName.value.trim();
  if (tag && !props.tags.find(t => t.tagName === tag)) {
    try {
      // Add the new tag to the Firestore database
      const tagRef = await addDoc(collection(db, 'tags'), {
        tagName: tag,
        contacts: [props.highlightedContact.id],
        dateAdded: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        userEmail: props.highlightedContact.email,
        userId: user.value.uid
      });
      
      props.tags.push({ id: tagRef.id, tagName: tag, contacts: [] });
      newTagName.value = '';
      searchTerm.value = '';
      isOpen.value = false;
      emit('addedTag');

    } catch (error) {
      console.error('Error adding tag to Firestore:', error);
    }
  }
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
            @click="addTagToContact(tag)" 
            class="cursor-pointer"
          >
            <button
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


    


  