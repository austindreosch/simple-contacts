<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded shadow-md relative">
      <h2 class="text-lg font-bold mb-4">{{ title }}</h2>
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-end space-x-2">
        <button @click="cancel" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button @click="confirm" :class="['px-4 py-2 text-white rounded', confirmButtonColor]">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
  confirmButtonColor: { type: String, default: 'bg-red-500 text-white' }, // Default color is red
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
  emit('confirm');
};

const cancel = () => {
  emit('cancel');
};
</script>

<style scoped>
/* Ensure the modal is centered within the parent container */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
}
.relative {
  position: relative;
}
</style>