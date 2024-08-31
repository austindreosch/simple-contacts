<template>
    <div class="relative">
      <!-- Button with "+" icon -->
      <button type="button" v-if="localContact.id" class="pt-0.5" @click="toggleDropdown">
        <PlusBoxIcon class="text-my-teal" />
      </button>
  
      <!-- Dropdown -->
      <div 
        v-if="isOpen" 
        class="absolute right-0 z-[9999] mt-1 w-60 divide-y divide-gray-100 rounded-md border border-gray-300 bg-white shadow-lg p-2" 
        role="menu"
        style="overflow: visible;"
      >
        <!-- Search bar -->
        <div class="mb-2 flex items-center justify-between">
          <input 
            v-model="searchTerm" 
            type="text" 
            class="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300" 
            placeholder="Search tags..."
          >
        </div>
  
        <!-- Tags List -->
        <div class="max-h-40 overflow-y-auto">
          <ul>
            <li 
              v-for="tag in filteredTags" 
              :key="tag" 
              @click="toggleTagSelection(tag)" 
              class="flex items-center gap-2 cursor-pointer rounded-md px-1 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <input 
                type="checkbox" 
                v-model="selectedTags" 
                :value="tag" 
                class="form-checkbox text-my-teal border-my-teal"
              >
              <span>{{ tag }}</span>
            </li>
          </ul>
        </div>
  
        <!-- Add New Tag Section -->
        <div class="mt-2 pt-2 border-t border-gray-200">
          <input 
            v-model="newTagName" 
            type="text" 
            class="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300" 
            placeholder="Add new tag..."
          >
          <button 
            type="button" 
            @click="addNewTag" 
            class="mt-2 w-full flex justify-center items-center px-3 py-2 bg-my-teal text-white text-sm font-medium rounded-md hover:bg-teal-600"
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  </template>
  

    

<script setup>
import PlusBoxIcon from '@/assets/plusbox-icon.svg';
import { computed, onUnmounted, ref } from 'vue';

const tags = ref(['Marketing', 'Development', 'Design', 'Support', 'Management']); // Example tags
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
return tags.value.filter(tag => tag.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

// Toggles tag selection
const toggleTagSelection = (tag) => {
if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag);
} else {
    selectedTags.value.push(tag);
}
};

// Adds a new tag to the list
const addNewTag = () => {
const tag = newTagName.value.trim();
if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag);
    newTagName.value = '';
}
};

// Click outside to close the dropdown
const handleClickOutside = (event) => {
if (!event.target.closest('.relative')) {
    isOpen.value = false;
}
};

document.addEventListener('click', handleClickOutside);

onUnmounted(() => {
document.removeEventListener('click', handleClickOutside);
});
</script>
  