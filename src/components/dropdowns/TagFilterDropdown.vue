<template>
  <div class="relative border-r border-gray-200">
    <button @click="toggleDropdown" :class="{'bg-my-teal text-white rounded-r shadow-lg': selectedTags.length > 0, 'text-gray-700 hover:bg-gray-100 rounded': selectedTags.length === 0}" class="flex items-center gap-1 px-3 py-2 text-sm font-medium">
      Filter
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" :class="{'text-white': selectedTags.length > 0, 'text-gray-500': selectedTags.length === 0}" fill="currentColor">
        <path d="M456.18-192Q446-192 439-198.9t-7-17.1v-227L197-729q-9-12-2.74-25.5Q200.51-768 216-768h528q15.49 0 21.74 13.5Q772-741 763-729L528-443v227q0 10.2-6.88 17.1-6.89 6.9-17.06 6.9h-47.88Z"/>
      </svg>
    </button>



    <div v-if="isOpen" class="absolute right-0 z-50 mt-1 w-60 divide-y divide-gray-100 rounded-md border border-gray-300 bg-white shadow-md p-2" role="menu">
      <!-- Search bar -->
      <div class="mb-2 flex items-center justify-between">
        <input v-model="searchTerm" type="text" class="w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Search tags...">
        <button v-if="selectedTags.length > 0" @click.stop="clearAllFilters" class="ml-1.5 px-2 text-gray-500 hover:text-red-500 bg-gray-200 hover:bg-red-200 rounded focus:outline-none">
  <span class="text-xl font-bold">&times;</span>
</button>



      </div>
      
      <!-- Tags List -->
      <div class="max-h-40 overflow-y-auto">
        <ul>
          <li v-for="tag in filteredTags" :key="tag" @click="toggleTagSelection(tag)" class="flex items-center gap-2 cursor-pointer rounded-md px-1 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <input type="checkbox" v-model="selectedTags" :value="tag" class="form-checkbox text-my-teal border-my-teal">

            <span>{{ tag }}</span>
          </li>
        </ul>
      </div>

      <!-- Selected Tags (only visible when dropdown is open) -->
      <div v-if="selectedTags.length > 0" class="mt-2 pt-2 border-t border-gray-200">
        <span class="text-sm text-gray-700">Filtering by:</span>
        <div class="flex flex-wrap gap-1 mt-1">
          <span v-for="tag in selectedTags" :key="tag" class="inline-flex items-center gap-1 rounded-md bg-my-teal px-2 py-1 text-xs text-white">
            {{ tag }}
            <button @click.stop="removeTag(tag)" class="text-white hover:text-teal-800 ml-0.5">
              &times;
            </button>

          </span>
        </div>
      </div>
    </div>





  </div>
</template>

<script setup>
import { dropdownStore } from '@/stores/dropdownStore';
import { computed, defineProps, onMounted, onUnmounted, ref, watchEffect } from 'vue';

const props = defineProps({
  tags: Array,
});

// const tags = ref(['Marketing', 'Development', 'Design', 'Support', 'Management']); // Example tags
// const tags = ref(props.tags);
const selectedTags = ref([]);
const searchTerm = ref('');
const isOpen = ref(false);
const dropdownId = Symbol();

const toggleDropdown = () => {
  if (dropdownStore.openDropdownId === dropdownId) {
    dropdownStore.clearOpenDropdown();
  } else {
    
    dropdownStore.setOpenDropdown(dropdownId);
  }
};
const filteredTags = computed(() => {
  // Access the tagName property directly for filtering
  return props.tags
    .map(tag => tag.tagName) // Extract tagName from each tag object
    .filter(tagName => tagName.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const toggleTagSelection = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
};

const removeTag = (tag) => {
  selectedTags.value = selectedTags.value.filter(t => t !== tag);
};

const clearAllFilters = () => {
  selectedTags.value = [];
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    dropdownStore.clearOpenDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

watchEffect(() => {
  isOpen.value = dropdownStore.openDropdownId === dropdownId;
});
</script>
