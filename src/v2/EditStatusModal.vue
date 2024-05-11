<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="modal-container bg-white w-80 mx-auto rounded-lg shadow-lg">
      <div class="modal-header p-4 font-bold">
        <slot name="header">Edit Status</slot>
      </div>
      <div class="modal-body p-4">
        <slot name="content">Default Content</slot>
      </div>
      <div class="modal-footer p-4">
        <slot name="footer">
          <div class="text-right">
            <button
              @click.stop="emit('closeModal')"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </slot>
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
</script>

<style scoped>
.modal-container {
  max-width: 80%;
}
</style>
