<template>
  <div class="fixed inset-0 flex items-center justify-center" v-if="isOpen">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="bg-white rounded-lg p-6 max-w-md w-full relative z-10">
      <!-- Your modal content goes here -->
      <h1 class="text-3xl font-bold text-green-500">Add Your Status</h1>
      <slot></slot>
      <div class="mt-4 flex justify-end">
        <button
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          @click="closeModal"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}
</script>
