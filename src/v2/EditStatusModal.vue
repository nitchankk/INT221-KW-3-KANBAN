<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="modal-container bg-white w-80 mx-auto rounded-lg shadow-lg">
      <div class="modal-header p-4 font-bold">
        <slot name="header">Edit Status</slot>
      </div>
      <div class="modal-body p-4" v-if="editedStatus">
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label
              for="statusName"
              class="block text-sm font-medium text-gray-700"
              >Name:</label
            >
            <input
              v-model="editedStatus.statusName"
              type="text"
              id="statusName"
              name="statusName"
              class="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="statusDescription"
              class="block text-sm font-medium text-gray-700"
              >Description:</label
            >
            <textarea
              v-model="editedStatus.statusDescription"
              id="statusDescription"
              name="statusDescription"
              rows="3"
              class="mt-1 p-2 w-full border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div class="text-right">
            <button
              type="button"
              @click="emit('closeModal')"
              class="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  statusData: Object
})

const emit = defineEmits(['closeModal'])

const editedStatus = ref({ statusName: '', statusDescription: '' })

watch(
  () => props.statusData,
  (newValue) => {
    if (newValue) {
      editedStatus.value = { ...newValue }
    } else {
      editedStatus.value = { statusName: '', statusDescription: '' }
    }
  }
)

function saveChanges() {
  console.log('Save changes function called')
  console.log('Event:', event)
  console.log('Edited status:', editedStatus.value)
}
</script>

<style scoped>
.modal-container {
  max-width: 80%;
}
</style>
